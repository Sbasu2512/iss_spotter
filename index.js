const { fetchISSFlyOverTimes } = require('./iss');
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

let location = { lon: -79.3644, latti: 43.7124 };


//this is just calling the function from iss.js
fetchISSFlyOverTimes(location,(error,data)=> {
  if(error){
    console.log("It didnt work", error);
    return;
  }
  console.log("it worked! flyOverTimes is:", data);
});