const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const {
  fetchLocations,
  getLatLngFromGoogleMapsUrl
} = require("../../services/admin/location/admin.location.service");


const parseMapLocation = catchAsync(async (req, res) => {
  const { url } = req.body;

  const location = await getLatLngFromGoogleMapsUrl(url);

  return res.status(200).json({
    status: "success",
    location,
  });
});


const fetchPlacesController = catchAsync(async (req, res) => {
  const upperLocation =
    req.body && Object.keys(req.body).length > 0 ? req.body : null;

  const locations = await fetchLocations(upperLocation);

  return res.status(200).json({
    status: "success",
    locations,
  });
});



module.exports = {
    fetchPlacesController,
    parseMapLocation
}