// iss.js

const request = require('request');

// ... other three functions included in solution ...

const fetchMyIP = function(callback) {
  const url = 'https://api64.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

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

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports =  nextISSTimesForMyLocation ;
