import * as Backbone from 'backbone';
// export for others scripts to use
import {dependenciaComun1} from "../dependenciasComunes/dependenciaComun1/index.js"

export const HomeView = Backbone.View.extend({
	initialize:function(){
		console.log('vista home');
		console.log(this);
		console.log('Test');
		console.log('Test');
		console.log('Test');

	dependenciaComun1();
	}
});
