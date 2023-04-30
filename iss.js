const request = require('request');
//const ip = '174.92.117.232';
//function with two argument
const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request (url, (error, response, body)=>{
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body); 
    //console.log(latitude, longitude);
    callback(null, {latitude, longitude});

  });
  
};

module.exports = fetchCoordsByIP;