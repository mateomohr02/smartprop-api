const { where } = require("sequelize");
const {
  EventMetric,
  Property,
  Post,
} = require("../../db/models");
const { calculateHeat } = require("../../utils/calculateHeat");

const updateProperties = async (ids, field, tenantId) => {
  if (!Array.isArray(ids) || ids.length === 0) return;

  await Promise.all(
    ids.map(async (id) => {
      const property = await Property.findOne({ where: { id, tenantId } });
      if (!property) return;
      property[field] = (property[field] || 0) + 1;
      await property.save();
    })
  );
};

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
      await updateProperties(propertyId, "visualizations", tenantId);

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

const updateHeatPropertiesService = async (tenantId = null) => {
  const where = tenantId ? { tenantId } : {};
  const properties = await Property.findAll({ where });

  if (!properties.length) return { updated: 0, errors: 0 };

  let updated = 0;
  let errors = 0;

  await Promise.all(
    properties.map(async (property) => {
      try {
        const newHeat = calculateHeat(property);

        property.heat = newHeat;
        await property.save();

        updated++;
      } catch (err) {
        errors++;
        console.error(`❌ Error actualizando propiedad ${property.id}:`, err.message);
      }
    })
  );

  return { updated, errors };
};


module.exports = {
  catchMetricService,
  updateHeatPropertiesService,
};
