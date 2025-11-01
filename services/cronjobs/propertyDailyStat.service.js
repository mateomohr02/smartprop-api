const { Property, PropertyDailyStat } = require("../../db/models");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires";

const createPropertyDailyStat = async () => {
  try {
    const yesterday = dayjs().tz(TZ).subtract(1, "day");
    const day = yesterday.date();
    const month = yesterday.month() + 1;
    const year = yesterday.year();

    console.log(
      `[PropertyDailyStat] Generando registros para ${yesterday.format(
        "YYYY-MM-DD"
      )}`
    );

    const properties = await Property.findAll({
      attributes: ["id", "heat", "visualizations", "interactions", "reach"],
    });

    if (!properties.length) {
      console.log("[PropertyDailyStat] No hay propiedades para procesar.");
      return;
    }

    const records = properties.map((p) => ({
      propertyId: p.id,
      day,
      month,
      year,
      visualizations: p.visualizations,
      interactions: p.interactions,
      reach: p.reach,
      heat: p.heat,
    }));

    await PropertyDailyStat.bulkCreate(records);
  } catch (error) {
    console.error("[PropertyDailyStat] Error al generar registros:", error);
  }
};

module.exports = {
  createPropertyDailyStat,
};
