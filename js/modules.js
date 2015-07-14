//Search Box
/////////////////////

CORE.create_module("search-box", function(sb)) {
	var input, button, reset;

	return {
		init: function() {
			input = sb.find("#search_input")[0],
			button = sb.find("#search_button")[0],
			reset = sb.find("#quit_search")[0];

			sb.addEvent(button, "click", this.handleSearch);
			sb.addEvent(reset, "click", this.quitSearch);
		},
		destroy: function() {
			sb.removeEvent(button, "click", this.handleSearch);
			sb.removeEvent(button, "click", this.handleSearch);
			input = button = reset = null;
		},
		handleSearch: function() {
			var query = input.value;
			if(query) {
				sb.notify({
					type: 'perform-search',
					data: query
				});
			}
		},
		quitSearch: function() {
			input.value = "";
			sb.notify({
				type: 'quit-search',
				data: null
			});
		}
	};
});



// Filters Bar
/////////////////////

CORE.create_module("filters-bar", function(sb){
	var filters;

	return {
		init: function() {
			filters = sb.find('a');
			sb.addEvent(filters, "click", this.filterProducts);
		},
		destroy: funtion() {
			sb.removeEvent(filters, "click", this.filterProducts);
			filter = null;
		},
		filterProducts: function(e) {
			sb.notify({
				type: 'change-filter',
				data: e.currentTarget.innerHTML
			});
		}
	};
});



// Product Panel
/////////////////////

CORE.create_module("product-panel", function(sb){
	var products;

	function eachProduct(fn) {
		var i = 0, product;
		for(; product = products[i++];) {
			fn(product);
		}
	}
	function reset() {
		eachProduct(function (product) {
			product.style.opacity = '1';
		});
	}

	return {
		init: function() {
			var self = this;
			products = sb.find("li");
			sb.listen({
				'change-filter' : this.change_filter,
				'reset-filter'  : this.reset_filter,
				'perfrom-search': this.search,
				'quit-search'   : this.reset
			});
			eachProduct(function(product) {
				sb.addEvent(product, 'click', self.addToCart);
			});
		},
		destroy: function() {

		}
	};
});

