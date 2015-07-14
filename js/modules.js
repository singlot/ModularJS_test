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