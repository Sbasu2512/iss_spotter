const request = require("request");

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error,response,body)=>{
  console.log(body);
  });
}

module.exports = { fetchMyIP };