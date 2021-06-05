/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  //console.log("Inside fetchmyip");
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error,response,body)=>{
    //console.log("Inside request");
  if(error){
    //console.log("Inside if statement error");
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
  //console.log(obj);
  let ip = obj.ip;
  callback(null, ip);
  //parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error
  //return ip ;
});
}

module.exports = { fetchMyIP };