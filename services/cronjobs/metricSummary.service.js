const { sequelize } = require("../../db/models");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const { EventMetric, MetricSummary } = require("../../db/models");

// Extender dayjs con plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires"; // zona horaria local

const createMetricSummary = async () => {
  try {
    // Fecha del día anterior (local)
    const yesterdayStr = dayjs().tz(TZ).subtract(1, "day").format("YYYY-MM-DD");
    console.log(`[MetricSummary] Generando resumen para ${yesterdayStr}`);

    // Obtener eventos del día anterior (según fecha local)
    const events = await EventMetric.findAll({
      where: sequelize.where(
        sequelize.fn("DATE", sequelize.col("createdAt")),
        yesterdayStr
      ),
      attributes: ["tenantId", "eventType"],
    });

    if (!events.length) {
      throw new AppError("No events to process.");
    }

    // Agrupar por tenantId y eventType
    const summaryMap = {};
    for (const e of events) {
      const key = `${e.tenantId}::${e.eventType}`; // separador seguro
      summaryMap[key] = (summaryMap[key] || 0) + 1;
    }

    // Preparar registros para upsert
    const summaries = Object.entries(summaryMap).map(([key, count]) => {
      const [tenantId, metric] = key.split("::");
      return {
        tenantId,
        metric,
        date: yesterdayStr,
        count,
      };
    });

    // Guardar o actualizar cada resumen
    for (const s of summaries) {
      await MetricSummary.upsert(s);
    }

    console.log(
      `[MetricSummary] Summary generated for ${yesterdayStr}. Total: ${summaries.length}.`
    );
  } catch (error) {
    throw new AppError("Error generating metric summary.");
  }
};

module.exports = {
  createMetricSummary,
};
