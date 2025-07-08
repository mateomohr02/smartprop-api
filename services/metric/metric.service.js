const { EventMetric, Property, Post } = require("../../db/models");

const catchMetricService = async (metric, tenantId) => {
  const { name, entity } = metric;

  switch (name) {
    case "visit":
    case "visit_blog":
    case "whatsapp":
    case "instagram":
      await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;

    case "detail_prop":
      if (!entity) throw new Error("No entity ID for detail_prop");
      await Promise.all([
        EventMetric.create({
          eventType: name,
          entityId: entity,
          tenantId,
        }),
        Property.increment({ visualizations: 1, heat: 1 }, { where: { id: entity } }),
      ]);
      break;

    case "contact":
      if (!entity) throw new Error("No entity ID for contact");
      await Promise.all([
        EventMetric.create({
          eventType: name,
          entityId: entity,
          tenantId,
        }),
        Property.increment({ heat: 5 }, { where: { id: entity } }),
      ]);
      break;

    case "form_send":
      if (!entity) throw new Error("No entity ID for form_send");
      await EventMetric.create({
        eventType: name,
        entityId: entity,
        tenantId,
      });
      break;

    case "blog_post_detail":
      if (!entity) throw new Error("No entity ID for blog_post_detail");
      await Promise.all([
        EventMetric.create({
          eventType: name,
          entityId: entity,
          tenantId,
        }),
        Post.increment({ visualizations: 1, heat: 1 }, { where: { id: entity } }),
      ]);
      break;

    case "post_share":
      if (!entity) throw new Error("No entity ID for post_share");
      await Promise.all([
        EventMetric.create({
          eventType: name,
          entityId: entity,
          tenantId,
        }),
        Post.increment({ heat: 5 }, { where: { id: entity } }),
      ]);
      break;

    case "prop_share":
      if (!entity) throw new Error("No entity ID for prop_share");
      await Promise.all([
        EventMetric.create({
          eventType: name,
          entityId: entity,
          tenantId,
        }),
        Property.increment({ heat: 5 }, { where: { id: entity } }),
      ]);
      break;

    default:
      console.log("Metric Not Found");
      return;
  }
};

module.exports = catchMetricService;