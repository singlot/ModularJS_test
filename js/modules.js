//Search Box
/////////////////////

CORE.create_module("search-box", function(sb) {
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
			sb.removeEvent(button, "click", this.quitSearch);
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
		destroy: function() {
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
				'reset-filter'  : this.reset,
				'perform-search': this.search,
				'quit-search'   : this.reset
			});
			eachProduct(function(product) {
				sb.addEvent(product, 'click', self.addToCart);
			});
		},
		destroy: function() {
			var self = this;
			eachProduct(function(product) {
				sb.removeEvent(product, 'click', self.addToCart);
			});
			sb.ignore(['change-filter', 'reset_filter', 'perform-search', 'quit-search']);
		},
		reset: reset,
		change_filter: function(filter) {
			reset();
			eachProduct(function(product) {
				if (product.getAttribute("data-8099-keyword").toLowerCase().indexOf(filter.toLowerCase()) < 0) {
					product.style.opacity = '0.2';
				}
			});
		},
		search: function(query) {
			reset();
			query = query.toLowerCase();
			eachProduct(function(product) {
				if (product.getElementsByTagName('p')[0].innerHTML.toLowerCase().indexOf(query < 0)) {
					product.style.opacity = '0.2';
				}
			});	
		},
		addToCart: function(e) {
			var li = e.currentTarget;
			sb.notify({
				type: 'add-item',
				data: {id: li.id, name: li.getElementsByTagName('p')[0].innerHTML, price: Number(li.id, 10) }
			});
		}
	};
});



// Shopping cart
/////////////////////

CORE.create_module("shopping-cart", function(sb) {
	var cart, cartItems;

	return {
		init: function() {
			cart = sb.find("ul")[0];
			cartItems = {};
			sb.listen({
				'add-item': this.addItem
			});
		},
		destroy: function() {
			cart = cartItems = null;
			sb.ignore(['add-item']);
		},
		addItem : function (product) {
			var entry = sb.find('#cart-' + product.id + ' .quantity')[0];
			if(entry) {
				entry.innerHTML = Number(entry.innerHTML, 10) + 1;
				cartItems[product.id]++;
			} else {
				entry = sb.create_element("li", {id: "cart-" + product.id, children: [
						sb.create_element("span", {'class' : 'product_name', text : product.name}),
						sb.create_element("span", {'class' : 'quantity', text : '1'}),
						sb.create_element("span", {'class' : 'price', text : '$' + Number(product.price).toFixed(2)})
					],
					'class' : 'cart_entry'});
				cart.appendChild(entry);
				cartItems[product.id] = 1;
			}
		}
	};
});

CORE.start_all();