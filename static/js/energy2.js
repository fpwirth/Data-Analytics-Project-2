//Initial variables for plots
var stateurl='static/data/state_data.json';
var facilityurl='static/data/facility_data.json';
let year=2018;
let stateplot='US';

//Build initial plots on load
aqiPlot(stateurl,year);
buildheat(facilityurl,year);
buildplot(stateurl,stateplot);
buildmap(stateurl,year);

//Listener, on change to the DOM, call changestate function
d3.select('#state_selected').on('change',changestate);
d3.select('#year_slider').on('click',changeyear);

//Function to change state plots
function changestate(){
    let stateplot=d3.select('#state_selected').node().value;
    buildplot(stateurl,stateplot)};

//Function to change year plots
function changeyear(){
    let year=d3.select('#year_selected').property('value');
    buildmap(stateurl,year)
    d3.select('#heatmapdiv').html('');
    d3.select('#heatmapdiv').html('<div id="heatmap"></div>');
    buildheat(facilityurl,year)
    d3.select('#aqidiv').html('');
    d3.select('#aqidiv').html('<div id= "chart1"><form><label><input type="radio" name="mode" value="grouped"> Grouped</label><label><input type="radio" name="mode" value="stacked" checked> Stacked</label></form></div>');
    aqiPlot(stateurl,year)};