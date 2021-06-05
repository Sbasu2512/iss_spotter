
const { fetchCoordsByIP } = require('./iss');
const { fetchMyIP } = require('./iss');



fetchMyIP((error, ip) => {                //(error, ip) => anonymous calllback fn!
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log(ip);
});



fetchCoordsByIP('142.114.24.119' , (error, data) => {
  
if(error) {
  console.log("It didn't work!", error);
  return;
}
console.log("it Worked! Geolocation is:", data);
});

