//javascript

const request = require('request');

const fetchISSFlyOverTimes = function({latitude, longitude}, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(url, (error, response, body)=>{
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching Coordinates for FlyOverTimes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const {response: data} = JSON.parse(body) ;
    callback(null, data);

  });
  
};

module.exports = fetchISSFlyOverTimes;