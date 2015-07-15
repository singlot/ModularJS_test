var CORE = (function() {
	var moduleData = {},
	to_s = function (anything) {return Object.prototype.toString.call(anything);};

	debug = true;

	return {
		debug: function(on) {
			debug = on ? true : false;
		},
		create_module: function (moduleID, creator) {
			var temp;
			if(typeof moduleID)
		}
	};

}());