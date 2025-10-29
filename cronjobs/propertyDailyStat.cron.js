const cron = require("node-cron");
const { createPropertyDailyStat } = require("../services/cronjobs/propertyDailyStat.service");

cron.schedule("01 10 * * *", async () => {
  console.log("[CRON] Ejecutando createPropertyDailyStat...");
  await createPropertyDailyStat();
});