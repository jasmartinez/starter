
function modulo() {
  return {
    default : function(){
      //var compiled = require('!underscore-template-loader?engine=underscore./../templates/primeraPlantilla.html')
      var compiled = require('../templates/primeraPlantilla.html');
      console.log(compiled({foo: "Hello world"}));

      console.log("funcion del modulo default");

    },
    secondDefault : function(){
      console.log("Segunda funcion default");
    }
  };
};

export default modulo;
