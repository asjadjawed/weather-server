const axios = require("axios").default;

const GEO_CODE_KEY = process.env.GEO_CODE_KEY;

const generateAddress = ({
  street,
  adminArea6,
  adminArea5,
  adminArea4,
  adminArea3,
  adminArea1,
  postalCode,
}) => {
  let addressArray = [
    street,
    adminArea6,
    adminArea6,
    adminArea5,
    adminArea4,
    adminArea3,
    adminArea1,
    postalCode,
  ];
  return addressArray.filter((section) => section !== "").join(", ");
};

const geoCodeAddress = async (address) => {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${GEO_CODE_KEY}&location=${encodeURIComponent(
    address
  )}`;

  try {
    const addressResponse = await axios.get(url);

    if (!addressResponse.data) {
      throw new Error("Invalid Address");
    }
    const resolvedAddress = addressResponse.data.results[0].locations[0];
    const { lat, lng } = resolvedAddress.latLng;
    return {
      Address: generateAddress(resolvedAddress),
      lat,
      lng,
    };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  geoCodeAddress,
};
