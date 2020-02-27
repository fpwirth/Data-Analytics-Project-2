//Function to create initial heatmap for all powerplants using US data
function leafletinit(){
  var yearheat=2018;
  buildheat(yearheat)};

//Function to build annual heatmaps and show individual power plants
function buildheat(yearheat){
  var heatlayer=[];
  var facility=[];
  //Get data and filter by year
  d3.json('static/data/facility_data.json').then(function(facilities){
    var year=yearheat;
    var tempfilteredheat=facilities.filter(facilities=>facilities.year==year);
    var filteredheat=tempfilteredheat.filter(tempfilteredheat=>tempfilteredheat.state!='US');
  //Create annual facility and heat layer data
    for (var i=0;i<filteredheat.length;i++){
      var location=[filteredheat[i].latitude,filteredheat[i].longitude,filteredheat[i].emissions_mt];
      var marker=L.circle([filteredheat[i].latitude,filteredheat[i].longitude],{stroke:false,color:'red',fillOpacity:.5,radius:filteredheat[i].emissions_mt/300}).bindPopup(`<h3>${filteredheat[i].facility_name}<hr>Greenhouse Emissions (mt): ${filteredheat[i].emissions_mt}</h3>`);
      heatlayer.push(location);
      facility.push(marker);};
  //Create basemaps
    var street=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom:18,
      id:'mapbox.streets',
      accessToken:API_KEY});
    var comic=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom:18,
      id:'mapbox.comic',
      accessToken:API_KEY});
    var basemaps={
      'Street Map':street,
      'USA Map':comic};
    var map=L.map('heatmap',{
      center:[39.8333,-98.5833],
      zoom:4,
      layers:[street]});
  //Create heatlayer for year
    L.heatLayer(heatlayer,{
      radius: 5,
      blur: 10
    }).addTo(map);
  //Create layer control for map
    var overlaymaps={
      'Power Plants':L.layerGroup(facility)};
    L.control.layers(basemaps,overlaymaps,{collapsed:false}).addTo(map);
});};

//Listener, on change to the DOM, call changeheat function
d3.select('#year_slider').on('click',changeheat);

//Build initial map on load
leafletinit();

//Function to change year heatmaps
function changeheat(){
  let yearheat=d3.select('#year_selected').property('value');
  d3.select('#heatmapdiv').html('');
  d3.select('#heatmapdiv').html('<div id="heatmap"></div>');
  buildheat(yearheat)};