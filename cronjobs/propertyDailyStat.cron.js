const cron = require("node-cron");
const {
  createPropertyDailyStat,
} = require("../services/cronjobs/propertyDailyStat.service");

cron.schedule(
  "20 20 * * *",
  async () => {
    console.log("[CRON] Ejecutando createPropertyDailyStat...");
    await createPropertyDailyStat();
  },
  {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires",
  }
);
