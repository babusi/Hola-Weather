// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

/* 
* Test Locations
* Austin lat/long: 30.2676,-97.74298
* Austin WOEID: 2357536
*/
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
	});
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = '<div class="col-sm-6"><h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2></div>';
      html += '<div class="col-sm-6"><p> Ku<span>'+weather.currently+'</span> jeki.</p></div>';
	  
	  var timestamp = moment(weather.updated);
      html += '<div class="footer col-sm-12">Updated '+moment(timestamp).fromNow()+'. <a href="index.html"><i class="fa fa-refresh"></i></a></div>';
	  
	  $("#weather").html(html);
	  
		},
		error: function(error) {
		  $("#weather").html('<p>'+error+'</p>');
		}
	
  });
}
