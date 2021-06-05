const request = require('request-promise-native');
const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json'); 
  }

const fetchCoordsByIP = (body) =>{
const ip = JSON.parse(body).ip;
return request(`https://freegeoip.app/json/${ip}`);
}
  
  module.exports = { fetchMyIP, fetchCoordsByIP} ;