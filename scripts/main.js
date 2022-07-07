
//Set map API key
var mapApiKey ='pk.eyJ1IjoicGV0ZXJ3aXRhaXQiLCJhIjoiY2w1OHNiZnA5MjRuMDNjdDdpM25qMDk3YyJ9.OoyESK2QPbl_whYKuhQ91w';
mapboxgl.accessToken = mapApiKey;

//Initiate map
var map = new mapboxgl.Map(
	{container: 'map',
  	style: 'mapbox://styles/peterwitait/cl59g6lci003z14nuiawr5g31',
  	center: [4.5, 52],
  	zoom: 2.5}
);

//Space station details
var spaceStations = [
  {
    name: 'Kennedy Space Center, Cape Canaveral, Florida',
    location: {lat: 28.573367,lng:  -80.648970},
    traveltime: "30:10:20"
  },{
    name: 'Copenhagen Space Center, Denmark',
    location: {lat: 55.6,lng:  9.5},
    traveltime: "26:20:23"
  },{
    name: 'Amsterdam Space Center, the Netherlands',
    location: {lat: 52,lng: 4.7},
    traveltime: "15:53:21"
  }, {
    name: 'Paris Space Center, France',
    location: {lat: 49, lng:  2.5},
    traveltime: "16:32:52"
  }, {
    name: 'Berlin Space Center, Germany',
    location: {lat: 52.5, lng: 13.3},
    traveltime: "29:54:27"
  }, {
    name: 'London Space Center, United Kingdom',
    location: {lat: 51.5, lng: -0.5},
    traveltime: "13:11:50"
  }, {
    name: 'Italy Space Center, Italy',
    location: {lat: 44.5, lng: 11},
    traveltime: "35:34:22"
  }, {
    name: 'Edinburgh Space Center, Scotland',
    location: {lat: 55.9, lng: -3.22},
    traveltime: "06:13:07"
  }
];

//Generate icons
for(var i = 0; i < spaceStations.length; i++) {
	var stationMarker = document.createElement('div');

	stationMarker.className = 'stationMarker';

	var stationPopup = new mapboxgl.Popup().setHTML(spaceStations[i].name + "<br>" + "travel time: " + spaceStations[i].traveltime);
	var marker = new mapboxgl.Marker(stationMarker).setLngLat([spaceStations[i].location.lng, spaceStations[i].location.lat]).setPopup(stationPopup).addTo(map);
}

//User input 
document.getElementById("button").onclick = function () {
	console.log('Button clicked');

	//Get city
	var location = document.getElementById("location").value;
	console.log(location);

	//Form map URL
	var mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
	var mapRequest = mapURL + location + '.json' + '?' + 'access_token=' + mapApiKey; 

	//Get map data
	fetch(mapRequest)

	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onMapAPISuccess(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	}); 

	//Form weather URL
	var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
	var WeatherApiKey ='3ac755b00d7600e797cd0c78861389c3';
	var weatherRequest = weatherURL + '?' + 'appid=' + WeatherApiKey + '&' + 'q=' + location;

	//Get weather data
	fetch(weatherRequest)

	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onWeatherAPISuccess(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	});
};

function onMapAPISuccess(response) {
	console.log(response);

	//Get location coordinates
	var longitude = response.features[0].center[0];
	var latitude = response.features[0].center[1];
	console.log(longitude,latitude);

	map.flyTo({
		center: [longitude, latitude],
		essential: true,
		zoom: 10	
	});

	var alien = document.createElement('div');
	alien.className = 'alienMarker';
	var landingPopup = new mapboxgl.Popup().setHTML('<h2>Landing location</h2>' + response.features[0].place_name);
	var marker = new mapboxgl.Marker(alien).setLngLat([longitude, latitude]).setPopup(landingPopup).addTo(map);

}

function onWeatherAPISuccess(response) {
	console.log(response);

	var weatherBox = document.getElementById('weather');
	var weatherDesc = response.weather[0].description;
	var weatherIcon = response.weather[0].icon;
	var weatherIconURL = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
	var wind = response.wind.speed;
	
	var temp = Math.floor(response.main.temp - 273.25);

	weatherBox.innerHTML = '<h2>' + 'Landing location: ' + response.name + '</h2>';
	weatherBox.innerHTML += 'Temperature: ' + temp + '°C <br>';
	weatherBox.innerHTML += 'Wind Speed: ' + wind + 'm/s' + '<br>';
	weatherBox.innerHTML += 'Weather: ' + weatherDesc + '<br>' + '<img src="'+ weatherIconURL +'">';
}

function onAPIError(error) {
	console.error('Request failed', error);
	document.getElementById('weather').innerHTML = '<h1>Error!</h1> <br>' + '<h2>Something went wrong. <br> Please try again.</h2>'; 
}




















