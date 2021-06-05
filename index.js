

const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {                //(error, ip) => anonymous calllback fn!
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
//fetchMyIP();