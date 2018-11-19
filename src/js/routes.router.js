export const AppRouter = Backbone.Router.extend({
	routes: {
		'': 'initHome',
		'*path': 'default',
	},
	initialize: function () {
		this.mainView = null;
	},
	default:function(route){
console.log('default');
	},
	initHome:function(){
console.log('initHome');
		// import(/*webpackMode: "lazy" */
		// 	/*webpackChunkName: "home"*/
		// 		`./directorio/primerModulo.js`).then(module => {
		// 			console.log('module');
		// 			console.log(module);
		// 			let vista = new module.HomeView();
		// 			console.log(vista);
		// 		});
		this.loadRoute('primerModulo','./directorio/primerModulo.js');
	},
	loadRoute:function(name, path) {
			import(/*webpackMode: "lazy" */
				/*webpackChunkName: "[request]"*/
				`./directorio/${name}`).then(module => {
					console.log('module');
					console.log(module);
					let vista = new module.HomeView();
					console.log(vista);
				});
		}

	});
