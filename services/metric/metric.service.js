const { where } = require("sequelize");
const { EventMetric, Property, Post } = require("../../db/models");

const catchMetricService = async (metric, tenantId) => {
  const { name, propertyId, postId, metadata } = metric;

  console.log(
    name,
    "name",
    propertyId,
    "propertyId",
    postId,
    "postId",
    metadata,
    "metadata"
  );

  switch (name) {
    case "visit_site":
      const visitSiteMetric = await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;

    case "visit_blog":
      const visitBlogMetric = await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;

    case "visit_contact":
      const visitContactMetric = await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;

    case "filter":
      const filtersAppliedMetric = await EventMetric.create({
        eventType: name,
        metadata,
        tenantId,
      });
      break;

    case "interaction_prop":
      const propertyInteraction = await Property.findOne({
        where: {
          id: propertyId,
          tenantId,
        },
      });

      if (!propertyInteraction) {
        throw new AppError("Property Not Found.", 404);
      }

      propertyInteraction.interactions = propertyInteraction.interactions + 1;

      await propertyInteraction.save();
      break;

    case "visualization_prop":
      const propertyVisaulization = await Property.findOne({
        where: {
          id: propertyId,
          tenantId,
        },
      });

      if (!propertyVisaulization) {
        throw new AppError("Property Not Found.", 404);
      }

      propertyVisaulization.visualizations =
        propertyVisaulization.visualizations + 1;

      await propertyVisaulization.save();

      break;

    case "post_detail_blog":
      const postInteraction = await Post.findOne({
        where: {
          id: propertyId,
          tenantId,
        },
      });

      if (!postInteraction) {
        throw new AppError("Post Not Found.", 404);
      }

      postInteraction.interactions = postInteraction.interactions + 1;
      await postInteraction.save();
      break;

    case "whatsapp":
      const whatsappMetric = await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;

    case "instagram":
      const instagramMetric = await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;

    case "form_send":
      const formSendMetric = await EventMetric.create({
        eventType: name,
        metadata,
        tenantId,
      });
      break;

    case "share_prop":
      const sharedProperty = await Property.findOne({
        where: {
          id: propertyId,
          tenantId,
        },
      });

      if (!sharedProperty) {
        throw new AppError("Property Not Found.", 404);
      }
      sharedProperty.reach = sharedProperty.reach + 1;
      await sharedProperty.save();
      break;

    case "post_share_blog":
      const sharedPost = await Post.findOne({
        where: {
          id: postId,
          tenantId,
        },
      });

      if (!sharedPost) {
        throw new AppError("Post Not Found.", 404);
      }
      sharedPost.reach = sharedPost.reach + 1;
      await sharedPost.save();
      break;

    default:
      console.warn(`⚠️ Métrica desconocida recibida: ${name}`);
      const unknownMetric = await EventMetric.create({
        eventType: name,
        tenantId,
      });
      break;
  }
};

module.exports = {
  catchMetricService,
};
