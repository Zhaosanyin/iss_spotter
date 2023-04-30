const fetchISSFlyOverTimes = require('./iss');

fetchISSFlyOverTimes({latitude: 45.4215296, longitude: -75.6971931}, (error, data) => {
  if (error) {
    console.log('Error :', error);
    return error;
  } else {
    console.log(data);
   // console.log(`data: ${JSON.stringify(data)}`);
    return data;
  }

});