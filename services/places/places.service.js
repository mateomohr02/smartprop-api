const { Country, Province, City, Neighborhood } = require("../../db/models");
const { slugFormatter, nameFormatter } = require("../../utils/stringFormatter");
const AppError = require("../../utils/appError");

const findOrCreatePlace = async (Model, where, defaults) => {
  let record = await Model.findOne({ where });
  if (!record) {
    record = await Model.create(defaults);
  }
  return record;
};

const fetchOrCreatePlace = async ({ countryInput, provinceInput, cityInput, neighborhoodInput }) => {
  //Place:
    //{
    // countryInput:'argentina', ->slug
    // provinceInput: 'cordoba', ->slug
    // cityInput: 'cordoba' ->slug
    // neighborhoodInput: 'URCA' ->name
    //}
  
    if (!countryInput || !provinceInput || !cityInput || !neighborhoodInput) {
    throw new AppError("Missing place data", 400);
  }
  
  //busca un country donde slug == argentina EXISTE
  const country = await findOrCreatePlace(
    Country,
    { slug: countryInput },
    { name: nameFormatter(countryInput), slug: slugFormatter(countryInput) }
  );
  //busca un province donde slug == cordoba EXISTE
  const province = await findOrCreatePlace(
    Province,
    { slug: provinceInput, countryId: country.id },
    { name: nameFormatter(provinceInput), slug: slugFormatter(provinceInput), countryId: country.id }
  );

  //busca una city donde slug == cordoba EXISTE
  const city = await findOrCreatePlace(
    City,
    { slug: cityInput, provinceId: province.id },
    { name: nameFormatter(cityInput), slug: slugFormatter(cityInput), provinceId: province.id }
  );

  //busca una city donde slug == URCA NO EXISTE: LO CREA
  const neighborhood = await findOrCreatePlace(
    Neighborhood,
    { slug: neighborhoodInput, cityId: city.id },
    { name: nameFormatter(neighborhoodInput), slug: slugFormatter(neighborhoodInput), cityId: city.id }
  );

  return {
    countryId: country.id,
    provinceId: province.id,
    city: city,
    neighborhood: neighborhood
  };
};

module.exports = { fetchOrCreatePlace };
