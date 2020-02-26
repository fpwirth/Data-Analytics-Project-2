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
var heatlayer17=[];
var facility17=[];
var heatlayer11=[];
var facility11=[];

d3.json('data/facility_data').then(function(facilities){
  console.log(facilities);
  for (var i=0;i<facilities.length;i++){
    var location=[facilities[i].latitude,facilities[i].longitude,facilities[i].emissions_mt];
    var marker=L.circle([facilities[i].latitude,facilities[i].longitude],{stroke:false,fillOpacity:.75,radius:facilities[i].emissions_mt/300}).bindPopup(`<h3>${facilities[i].facility_name}<hr>Greenhouse Emissions (mt): ${facilities[i].emissions_mt}</h3>`);
    if (facilities[i].year==2018){
      heatlayer18.push(location);
      facility18.push(marker);}
    if (facilities[i].year==2017){
      heatlayer17.push(location);
      facility17.push(marker);}
    if (facilities[i].year==2011){
      heatlayer11.push(location);
      facility11.push(marker);}};

  // console.log(heatlayer);
  // var heat = L.heatLayer(heatlayer,{
  //   radius: 5,
  //   blur: 10
  // }).addTo(map);

  console.log(facility17);
  var layer18=L.layerGroup(facility18);
  var layer17=L.layerGroup(facility17);
  var layer11=L.layerGroup(facility11);

  // Adding tile layer
  // var street=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
  //     attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom:18,
  //     id:'mapbox.streets',
  //     accessToken:API_KEY});

  // var dark=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
  //   attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //   maxZoom:18,
  //   id:'mapbox.dark',
  //   accessToken:API_KEY});

  // var basemaps={
  //   'Street Map':street,
  //   'Dark Map':dark};
  
  var overlaymaps={
    '2018 Facilities':layer18,
    '2017 Facilities':layer17,
    '2011 Facilities':layer11};

  // var map=L.map('heatmap',{
  //   center:[40.7128,-74.0059],
  //   zoom:8,
  //   layers:[street,layer11]});

  L.control.layers(basemaps,overlaymaps).addTo(map);
});