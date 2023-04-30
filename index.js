const  fetchCoordsByIP  = require('./iss');

 fetchCoordsByIP('174.92.117.232', (error, {latitude, longitude}) => {
  if (error) {
    console.log('Error :', error);
  } else {
    console.log(`latitude: ${latitude}, longitude: ${longitude}`);
  }
});