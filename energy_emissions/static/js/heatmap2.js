var map = L.map('heatmap', {
  center: [40.7128, -74.0059],
  zoom: 8
});

// Adding tile layer
L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
  }
).addTo(map);

d3.json('static/js/facility_data.json').then(function(response) {
  console.log(response);

  var heatlayer = [];

  for (var i = 0; i < response.length; i++) {
    var location = [response[i].latitude,response[i].longitude,response[i].emissions_mt];
    if (response[i].year == 2018 & response[i].state == 'NY'){
      if (location){
        heatlayer.push(location);
      }
    }};
  console.log(heatlayer);
  var heat = L.heatLayer(heatlayer,{
    radius: 5,
    blur: 10
  }).addTo(map);
});