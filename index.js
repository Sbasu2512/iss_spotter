
const { fetchCoordsByIP } = require('./iss');
const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {                //(error, ip) => anonymous calllback fn!
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP(ip, (data,error) => {
if(error) {
  console.log("It didn't work!", error);
  return;
}
console.log("it Worked! Geolocation is:", data);
});

