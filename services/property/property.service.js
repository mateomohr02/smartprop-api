const { Property, Features, PropertyType, City, Neighborhood } = require("../../db/models");
const AppError = require("../../utils/appError");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");
const { fetchandCreateCharacteristics } = require("./characteristic.service");
const { fetchOrCreatePropertyType } = require("./propertyType.service");
const { fetchOrCreatePlace } = require("../places/places.service");
const { createFeature } = require("./feature.service");

const addProperty = async (
  {
    title,
    price,
    priceFIAT,
    expenses,
    expensesFIAT,
    financing,
    operation,
    propertyType,
    address,
    mapLocation,
    description,
    multimedia,
    surface,
    condition,
    age,
    availabilityType,
    availabilityDate,
    place,
    characteristics,
    features,
  },
  tenantId
) => {
  if (
    !characteristics ||
    !features ||
    !propertyType ||
    !title ||
    !price ||
    !priceFIAT ||
    !operation ||
    !address ||
    !mapLocation ||
    !description ||
    !multimedia ||
    !surface ||
    !condition ||
    !age ||
    !availabilityType ||
    !place ||
    !tenantId
  ) {
    throw new AppError("Missing parameters to create a Property", 400);
  }

  //Example: Characteristics = [characteristic1Slug, characteristic2Slug, newCharacteristicName1, characteristic3Slug]
  const characteristicsIds = await fetchandCreateCharacteristics(
    characteristics,
    tenantId
  );
  //Example = CharacteristicsIds = ['1', '2', '4', '3']
  console.log(characteristicsIds, "CharacteristicsIds");

  //Example: PropertyType = "casa":slug
  //         PropertyType = "casa quinta":name : nuevoRegistro
  //         Se guarda como: "Casa Quinta" retorna id del nuevo registro
  const propertyTypeId = await fetchOrCreatePropertyType(
    propertyType,
    tenantId
  );
  //Example = PropertyTypeId = 1
  console.log(propertyTypeId, "PropertyTypeId");

  if (!characteristicsIds.length || !propertyTypeId) {
    throw new AppError(
      "Error while trying to add Characteristics or the Property Type",
      400
    );
  }

  //Place:
  //{
  // countryInput:'argentina', ->slug
  // provinceInput: 'cordoba', ->slug
  // cityInput: 'cordoba' ->slug
  // neighborhoodInput: 'URCA' ->name ingresado por el usuario
  //}
  const { countryId, provinceId, cityId, neighborhoodId } =
    await fetchOrCreatePlace(place);

  //Recibe IDs correpondientes

  const formattedProppertyTitle = nameFormatter(title);

  const financingProp = financing || null;

  const finalAvailabilityDate = availabilityDate || new Date();

  const newProp = await Property.create({
    title: formattedProppertyTitle,
    price,
    priceFIAT,
    expenses,
    slug: slugFormatter(title),
    expensesFIAT,
    financing: financingProp,
    operation,
    propertyTypeId,
    address,
    mapLocation,
    description,
    multimedia,
    surface,
    condition,
    age,
    availabilityType,
    finalAvailabilityDate,
    countryId,
    provinceId,
    cityId,
    neighborhoodId,
    tenantId,
  });

  if (!newProp) {
    throw new AppError("Error while creating the property", 404);
  }

  console.log(newProp, "NEW PROP");

  //CREAMOS EL DATO DE LOS AMBIENTES DE LA PROPIEDAD
  //FEATURE:
  //rooms N
  //bedrooms N
  //bathrooms N
  //toilettes N
  //garage N
  //balcony m2
  //meetingsRoom SUM EDIFICIOS T/F
  //pool T/F
  //laundryRoom T/F
  //roofTop TERRAZA T/F
  //kitchen T/F

  const featureProp = await createFeature(features, newProp.id, tenantId);

  console.log(featureProp, "Feature Prop");

  return { newProp, featureProp };
};

const fetchPropertiesTenantId = async (limit, page, offset, tenantId) => {
  console.log("DATA INCOMING SERVICE", limit, page, offset, tenantId);

  if (
    [limit, page, offset].some((val) => typeof val !== "number") ||
    !tenantId
  ) {
    throw new AppError(
      "Any of the required parameters to fetch properties is missing.",
      401
    );
  }

  console.log("DATA INCOMING SERVICE", limit, page, offset, tenantId);

  const props = await Property.findAndCountAll({
    where: {
      tenantId,
    },
    limit,
    offset,
    attributes: [
      "id",
      "title",
      "slug",
      "price",
      "priceFIAT",
      "expenses",
      "expensesFIAT",
      "surface",
      "multimedia",
      "operation",
      "visualizations",
    ],
    include: [
      {
        model: Features,
      },
      {
        model: PropertyType,
        attributes: ["name"],
      },
      {
        model: City,
        attributes: ["name"],
      },
      {
        model: Neighborhood,
        attributes: ["name"],
      },
    ],
  });

  return props;
};

module.exports = {
  addProperty,
  fetchPropertiesTenantId,
};
