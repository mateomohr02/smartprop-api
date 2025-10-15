const { Op } = require("sequelize");
const dayjs = require("dayjs");
const { EventMetric, MetricSummary } = require("../database/models");

const createMetricSummary = async () => {
  try {
    // Calcular el rango del día anterior
    const startOfYesterday = dayjs().subtract(1, "day").startOf("day").toDate();
    const endOfYesterday = dayjs().subtract(1, "day").endOf("day").toDate();

    console.log(`[MetricSummary] Generando resumen para ${startOfYesterday.toISOString().split("T")[0]}`);

    // Obtener los eventos del día anterior
    const events = await EventMetric.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfYesterday, endOfYesterday],
        },
      },
      attributes: ["tenantId", "eventType"],
    });

    if (!events.length) {
      console.log("[MetricSummary] No hay eventos para procesar.");
      return;
    }

    // Agrupar por tenantId y eventType
    const summaryMap = {};
    for (const e of events) {
      const key = `${e.tenantId}-${e.eventType}`;
      summaryMap[key] = (summaryMap[key] || 0) + 1;
    }

    // Guardar o actualizar los registros
    const summaries = Object.entries(summaryMap).map(([key, count]) => {
      const [tenantId, metric] = key.split("-");
      return {
        tenantId,
        metric,
        date: dayjs(startOfYesterday).format("YYYY-MM-DD"),
        count,
      };
    });

    for (const s of summaries) {
      await MetricSummary.upsert(s);
    }

    console.log(`[MetricSummary] Resumen generado: ${summaries.length} métricas procesadas.`);
  } catch (error) {
    console.error("[MetricSummary] Error al generar resumen:", error);
  }
};

module.exports = {
  createMetricSummary,
};
