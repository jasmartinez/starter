var firstRoute  = require('./routes/route1.json');
var secondRoute = require('./routes/route2.json');
var thirdRoute = require('./routes/route3.json');
var cuartaRuta = require('./routes/route4.json');
// and so on

module.exports = function() {
  return {
    //":resource/:id":":resource/:id",
    "posts"  : firstRoute,
    "comments" : secondRoute,
    "resources"  : thirdRoute,
    "todoList" : cuartaRuta// and so on
  }
}
