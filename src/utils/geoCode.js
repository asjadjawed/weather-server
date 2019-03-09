const request = require("request");

const generateAddress = ({
  street,
  adminArea6,
  adminArea5,
  adminArea4,
  adminArea3,
  adminArea1,
  postalCode
}) => {
  let addressArray = [
    street,
    adminArea6,
    adminArea6,
    adminArea5,
    adminArea4,
    adminArea3,
    adminArea1,
    postalCode
  ];
  return addressArray.filter(section => section !== "").join(", ");
};

const geoCodeAddress = (address, callback) => {
  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=MyMXoKpbZrD89VJG3YaieSGYX5KUAS0P&location=${encodeURIComponent(
        address
      )}`,
      json: true
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        callback("Unable to connect", undefined);
      } else if (body.info.statuscode !== 0) {
        callback("Invalid Address: Failed to Parse", undefined);
      } else {
        const responseAddress = body.results[0].locations[0];
        const { lat, lng } = responseAddress.latLng;

        callback(undefined, {
          Address: generateAddress(responseAddress),
          lat,
          lng
        });
      }
    }
  );
};

const geoCodeAddressPromise = address => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=MyMXoKpbZrD89VJG3YaieSGYX5KUAS0P&location=${encodeURIComponent(
          address
        )}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect");
        } else if (response.statusCode !== 200 || body.info.statuscode !== 0) {
          reject("Invalid address");
        } else {
          const responseAddress = body.results[0].locations[0];
          const { lat, lng } = responseAddress.latLng;
          resolve({
            Address: generateAddress(responseAddress),
            lat,
            lng
          });
        }
      }
    );
  });
};

module.exports = {
  geoCodeAddress,
  geoCodeAddressPromise
};
