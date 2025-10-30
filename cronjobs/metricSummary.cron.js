const cron = require("node-cron");
const {
  createMetricSummary,
} = require("../services/cronjobs/metricSummary.service");

// Ejecutar todos los días a las 00:01
cron.schedule(
  "01 00 * * *",
  async () => {
    console.log("[CRON] Ejecutando createMetricSummary...");
    await createMetricSummary();
  },
  {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires",
  }
);
