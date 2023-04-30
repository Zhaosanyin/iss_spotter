// index.js

const  fetchMyIP  = require('./iss');

fetchMyIP((error, IP) => {
  if (error) {
    console.log('Error :', error);
  } else {
    console.log("IP : ", IP);
  }
});