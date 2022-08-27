const opencage = require('opencage-api-client');
require('dotenv').config();

console.log(opencage);

const getPositionFromAddress = () => {
  const requestObj = {
    key: process.env.OPENCAGE_API_KEY,
    // q: address,
    q: "1380 Sherbrooke St W, Montreal, Quebec H3G 1J5",
  };
  return (opencage
  .geocode(requestObj)
  .then((data) => {
    return data.results[0].geometry
  })
 )};
getPositionFromAddress().then((response) => console.log("response", response));
