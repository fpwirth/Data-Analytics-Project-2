// stuff for the filter
var filter_year = d3.select('#year_selected');

// on change call function
filter_year.on('change', function(){

  plotMap();

});

function plotMap() {

  var year_input = filter_year.property('value');
  
  var street=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom:18,
      id:'mapbox.streets',
      accessToken:API_KEY});

  var dark=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:18,
    id:'mapbox.dark',
    accessToken:API_KEY});

  var basemaps={
    'Street Map':street,
    'Dark Map':dark};

  var map=L.map('heatmap',{
      center:[40.7128,-74.0059],
      zoom:8,
      layers:[street]});

  var heatlayer18=[];
  var facility18=[];
  var heatlayerfilter=[];
  var facilityfilter=[];
  var heatlayer11=[];
  var facility11=[];

  d3.json('data/facility_data').then(function(facilities){
    // console.log(facilities);
    for (var i=0;i<facilities.length;i++){
      var location=[facilities[i].latitude,facilities[i].longitude,facilities[i].emissions_mt];
      var marker=L.circle([facilities[i].latitude,facilities[i].longitude],{stroke:false,fillOpacity:.75,radius:facilities[i].emissions_mt/300}).bindPopup(`<h3>${facilities[i].facility_name}<hr>Greenhouse Emissions (mt): ${facilities[i].emissions_mt}</h3>`);
      if (facilities[i].year==2018){
        heatlayer18.push(location);
        facility18.push(marker);}
      if (facilities[i].year == year_input){
        heatlayerfilter.push(location);
        facilityfilter.push(marker);}
      if (facilities[i].year==2011){
        heatlayer11.push(location);
        facility11.push(marker);}};

    // console.log(facility17);

    var layer18=L.layerGroup(facility18);
    var layerfilter=L.layerGroup(facilityfilter);
    var layer11=L.layerGroup(facility11);
    
    var filterLabel = year_input + ' Facilities';

    var overlaymaps={
      '2018 Facilities':layer18,
      filterLabel : layerfilter,
      '2011 Facilities':layer11};

    L.control.layers(basemaps,overlaymaps).addTo(map);
  });
}

// initialize the map
plotMap();