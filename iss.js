/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const request = require("request");
const fetchMyIP = function(callback) { 
  //console.log("Inside fetchmyip");
  request("https://api.ipify.org/?format=json", (error,response,body)=>{
    //console.log("Inside request");
  if(error){
    //console.log("Inside if statement error");
    //when call back is called, it will send either error/null depending upon which is true.
    callback(err,null);   
    return;
  }
  if(response.statusCode !== 200){
   // console.log("inside respose error")
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    //console.log("line 16")
    callback(Error(msg), null);
    return;
  }
  let obj = JSON.parse(body);
  let ip = obj.ip;
  callback(null, ip);
  //parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error
  //return ip ;
});
}

/*
Define the fetchCoordsByIP function in iss.js.

1. It should take in two arguments: ip (string) and callback
2. Add the function to the object properties being exported from iss.js
For now, it can have an empty body and do nothing
*/

function fetchCoordsByIP(ip,callback) {

  request('https://freegeoip.app/json/',(error,response,body) => {
    if(error){
      console.log(error,null);
    }
    if(response.statusCode !== 200){
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    //console.log("line 16")
    callback(Error(msg), null);
    }

    let lon = JSON.parse(body).longitude;
    let latti = JSON.parse(body).latitude;
    
    callback(null, {lon,latti});    //this is passing the value to the callback in index.js
  });
}


const fetchISSFlyOverTimes = function(loc, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${loc.latti}&lon=${loc.lon}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

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
  // calling fetchMyIP which takes a call back as its parameter and returns IP address!
  fetchMyIP((error,ip)=>{
    if(error){
      callback(error,null)                  //if error it calls the call back with error
    }
    //instead of returning the ip, we are just calling another function which takes IP and another call back function as its parameter returns the coordinates!
    fetchCoordsByIP(ip,(error,coordinates)=>{
      if(error){
        callback(error,null)
      }
      //instead of returning the coords we will call another function here which takes coords as its first parameter and a callback func as its second parameter. It returns passover times! 
      fetchISSFlyOverTimes(coordinates, (error, passtimes)=>{
        if(error){
          callback(error,null);
        }
        //instead of returning the coords we will call another function which takes 
        callback(null,passtimes);
      });

    });
  });

}

nextISSTimesForMyLocation()

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };