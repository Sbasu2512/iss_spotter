const {fetchMyIP} = require('./iss_promised');
const {fetchCoordsByIP} = require('./iss_promised');

fetchMyIP()
.then (fetchCoordsByIP)
.then(body => console.log(body));


