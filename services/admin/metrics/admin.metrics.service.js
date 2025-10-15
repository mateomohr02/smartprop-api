const { Op, fn, col, literal } = require("sequelize");
const { MetricSummary, Lead } = require("../../../db/models");

const fetchDashboardMetrics = async (tenantId) => {
  // Fecha de corte: hoy menos 5 meses
  const now = new Date();
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(now.getMonth() - 5);

  // Query: agrupar por mes y métrica
  const summaries = await MetricSummary.findAll({
    where: {
      tenantId,
      createdAt: {
        [Op.gte]: fiveMonthsAgo
      }
    },
    attributes: [
      [fn("DATE_TRUNC", "month", col("date")), "month"], // agrupamos por mes usando la columna "date"
      "metric",
      [fn("SUM", col("count")), "total"]
    ],
    group: [literal("month"), "metric"],
    order: [[literal("month"), "ASC"]],
    raw: true
  });

  // Organizar resultados en un objeto por métrica
  const metrics = {
    visit_site: [],
    visit_blog: [],
    visit_contact: [],
    filter: [],
    interaction_prop: [],
    visualization_prop: [],
    post_detail_blog: [],
    whatsapp: [],
    instagram: [],
    form_send: [],
    share_prop: [],
    post_share_blog: []
  }; 

  summaries.forEach((summary) => {
    if (metrics[summary.metric]) {
      metrics[summary.metric].push({
        month: summary.month,
        total: parseInt(summary.total, 10)
      });
    }
  });
  
  return metrics;
};

const fetchLeads = async (tenantId) => {
    const leads = await Lead.findAll({
      where: {
        tenantId
      },
      order: [
        ["createdAt", "DESC"]
      ]
});

    return leads;
}

module.exports = {
  fetchDashboardMetrics,
  fetchLeads
};
