'use strict';

var pfWeather = {
	url:  '/yahooWeather',
	init: function() {
		$.get( this.url, function( wJSON ) {
			var cJSON = wJSON.query.results.channel;

			var city     = cJSON.location.city;
			var state    = cJSON.location.region
			var currTemp = cJSON.item.condition.temp;
			var tempUnit = cJSON.units.temperature;
			// This is hacky, I'm grabbing the image tag from the
			// description.
			var conditionImg  = cJSON.item.description.match(/<img.+?>/)[0];
			var conditionText = cJSON.item.condition.text;

			var forecast = cJSON.item.forecast;
			forecast.length = 5; // Truncate arrray to 5 elements

			$('#cityState').html(city +', '+ state);
			$('#temperature').html(currTemp +'&deg;'+ tempUnit);
			$('#iconImage').html($(conditionImg));
			$('#iconCondition').html(conditionText);

			forecast.forEach(function(fcdata,idx) {
				var div = $('#forecast > div:eq('+ idx +')');
				$(div).find('strong:eq(0)').html(fcdata.day);
				$(div).find('.high').html(fcdata.high);
				$(div).find('.low').html(fcdata.low);
			});

		});
	}
};


pfWeather.init();
