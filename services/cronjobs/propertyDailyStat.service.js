const { Property, PropertyDailyStat } = require("../../db/models");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

// Extender dayjs con plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires"; // zona horaria local

const createPropertyDailyStat = async () => {
  try {
    // Fecha del día anterior (local)
    const yesterday = dayjs().tz(TZ).subtract(1, "day");
    const day = 29//yesterday.date();
    const month = 10//yesterday.month() + 1; // month() devuelve 0-11
    const year = 2025//yesterday.year();

    console.log(`[PropertyDailyStat] Generando registros para ${yesterday.format("YYYY-MM-DD")}`);

    // Obtener todas las propiedades
    const properties = await Property.findAll({
      attributes: ["id", "heat", "visualizations", "interactions", "reach"],
    });

    if (!properties.length) {
      console.log("[PropertyDailyStat] No hay propiedades para procesar.");
      return;
    }

    // Preparar registros
    const records = properties.map(p => ({
      propertyId: p.id,
      day,
      month,
      year,
      visualizations: p.visualizations,
      interactions: p.interactions,
      reach: p.reach,
      heat: p.heat,
    }));

    // Guardar todos de golpe
    await PropertyDailyStat.bulkCreate(records);

    console.log(`[PropertyDailyStat] Registros generados: ${records.length}`);
  } catch (error) {
    console.error("[PropertyDailyStat] Error al generar registros:", error);
  }
};

module.exports = {
  createPropertyDailyStat
};
