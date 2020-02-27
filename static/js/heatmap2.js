// stuff for the filter
var filter_year = d3.select('#year_selected');

// on change call function
d3.select('#year_selected').on('click', function(){

  console.log('hello')
  var yr = filter_year.property('value');
  console.log(yr)
  // reset the plot
  d3.select('#heatmap').html('')
  plotMap(yr);

});

function plotMap(yr){

  d3.select('#heatmap').html('')
  // console.log('testing');

  d3.json('static/data/facility_data.json').then(function(facilities){
    // console.log(facilities);
    // var year_input = filter_year.property('value');

    // console.log(filter_year.property('value'));

    var heatlayer18=[];
    var facility18=[];
    var heatlayerfilter=[];
    var facilityfilter=[];
    var heatlayer11=[];
    var facility11=[];
    for (var i=0;i<facilities.length;i++){
      var location=[facilities[i].latitude,facilities[i].longitude,facilities[i].emissions_mt];
      var marker=L.circle([facilities[i].latitude,facilities[i].longitude],{color:"red",stroke:false,fillOpacity:.75,radius:facilities[i].emissions_mt/300}).bindPopup(`<h4>${facilities[i].facility_name}</h4><h5><hr>Greenhouse Emissions (mt): ${facilities[i].emissions_mt}</h5>`);
      if (facilities[i].year==2018){
        heatlayer18.push(location);
        facility18.push(marker);
      }
      if (facilities[i].year== 2015) {
        heatlayerfilter.push(location);
        facilityfilter.push(marker);}
      if (facilities[i].year==2011){
        heatlayer11.push(location);
        facility11.push(marker);}};
    createmap(facility18,facilityfilter,facility11,yr)});


  function createmap(facility18,facilityfilter,facility11,yr){

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
    
    var layer18=L.layerGroup(facility18);
    var layerfilter=L.layerGroup(facilityfilter);
    var layer11=L.layerGroup(facility11);

    var overlaymaps={
      '2018 Facilities':layer18,
      '2015 Facilities' :layerfilter,
      '2011 Facilities':layer11
    }

    var map=L.map('heatmap',{
      center: [37.09, -95.71],
      zoom:5,
      layers:[street,layerfilter]});

      L.control.layers(basemaps,overlaymaps,{collapsed:false}).addTo(map);
    };

  }

  plotMap();