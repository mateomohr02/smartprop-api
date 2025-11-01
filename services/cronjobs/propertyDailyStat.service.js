const AppError = require("../../utils/appError");
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
      `[PropertyDailyStat] Generating stats for ${yesterday.format(
        "YYYY-MM-DD"
      )}`
    );

    const properties = await Property.findAll({
      attributes: ["id", "heat", "visualizations", "interactions", "reach"],
    });

    if (!properties.length) {
      throw new AppError("No properties to process.");
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
    throw new AppError("Error generating property daily stats.");
  }
};

module.exports = {
  createPropertyDailyStat,
};
