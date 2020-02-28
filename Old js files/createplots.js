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

//Function to create plot for initial graph using US data
function plotlyinit(){
    var stateplot='US';
    var yearmap=2018;
    buildplot(stateplot);
    buildmap(yearmap)};
  
//Function to build state plots
function buildplot(stateplot){
//Get data and filter by state
d3.json('static/data/state_data.json').then(function(states){
    var state=stateplot;
    var filteredstate=states.filter(states=>states.state==state);
//Create state generation plot
    var years=filteredstate.map(year=>year.year);
    var greenhousevalues=filteredstate.map(year=>year.greenhouse_emissions);
    var co2values=filteredstate.map(year=>year.co2_mt_total);
    var ngvalues=filteredstate.map(year=>year.generation_mwh_ng);
    var coalvalues=filteredstate.map(year=>year.generation_mwh_coal);
    var petrovalues=filteredstate.map(year=>year.generation_mwh_petro);
    var othergasvalues=filteredstate.map(year=>year.generation_mwh_other_gas);
    var othervalues=filteredstate.map(year=>year.generation_mwh_other);
    var nuclearvalues=filteredstate.map(year=>year.generation_mwh_nuclear);
    var hydrovalues=filteredstate.map(year=>year.generation_mwh_hydro);
    var solarvalues=filteredstate.map(year=>year.generation_mwh_solar);
    var windvalues=filteredstate.map(year=>year.generation_mwh_wind);
    var geothermalvalues=filteredstate.map(year=>year.generation_mwh_geothermal);
    var woodvalues=filteredstate.map(year=>year.generation_mwh_wood);
    var otherbiomassvalues=filteredstate.map(year=>year.generation_mwh_other_biomass);
    var pumpedvalues=filteredstate.map(year=>year.generation_mwh_pumped);
    var greenvalues=filteredstate.map(year=>year.generation_mwh_solar+year.generation_mwh_hydro+year.generation_mwh_wind+year.generation_mwh_nuclear+year.generation_mwh_pumped);
    var gentraces=[
    {x:years,y:coalvalues,name:'Coal',stackgroup:'one',groupnorm:'percent',line:{width:.5}},
    {x:years,y:petrovalues,name:'Petroleum',stackgroup:'one',line:{width:.5}},
    {x:years,y:ngvalues,name:'Natural Gas',stackgroup:'one',line:{width:.5}},
    {x:years,y:othergasvalues,name:'Other Gases',stackgroup:'one',line:{width:.5}},
    {x:years,y:othervalues,name:'Other',stackgroup:'one',line:{width:.5}},
    {x:years,y:geothermalvalues,name:'Geothermal',stackgroup:'one',line:{width:.5}},
    {x:years,y:woodvalues,name:'Wood',stackgroup:'one',line:{width:.5}},
    {x:years,y:otherbiomassvalues,name:'Other Biomass',stackgroup:'one',line:{width:.5}},
    // {x:years,y:nuclearvalues,name:'Nuclear',stackgroup:'one'},
    // {x:years,y:hydrovalues,name:'Hydro',stackgroup:'one'},
    // {x:years,y:solarvalues,name:'Solar',stackgroup:'one'},
    // {x:years,y:windvalues,name:'Wind',stackgroup:'one'},
    // {x:years,y:pumpedvalues,name:'Pumped Storage',stackgroup:'one'},
    {x:years,y:greenvalues,name:'No Emission Sources',stackgroup:'one',line:{width:.5}},
    {x:years,y:co2values,name:'CO2 Emissions',yaxis:'y2',type:'scatter'},
    {x:years,y:greenhousevalues,name:'Greenhouse Emissions',yaxis:'y2',type:'scatter'}];
    var genlayout={
    title:`${state} Power Generation by Type`,
    plot_bgcolor:'rgb(215,215,215)',
    paper_bgcolor:'rgb(215,215,215)',
    yaxis:{title:'Generation (MWh)'},
    yaxis2:{title:'Emissions (metric tons of carbon dioxide)',overlaying:'y',side:'right'},
    legend:{orientation:'h'}};
    Plotly.newPlot('chart2',gentraces,genlayout);});}

//Function to build state map plots
function buildmap(yearmap){
//Get data and filter by state
d3.json('static/data/state_data.json').then(function(states){
    var year=yearmap;
    var tempfilteredyear=states.filter(states=>states.year==year);
    var filteredyear=tempfilteredyear.filter(tempfilteredyear=>tempfilteredyear.state!='US');
    var states=filteredyear.map(state=>state.state);
    var statenames=filteredyear.map(state=>state.state_name);
    var greenhousevalues=filteredyear.map(state=>state.greenhouse_emissions);
    var generationvalues=filteredyear.map(state=>state.generation_mwh_total);
    var coolingvalues=filteredyear.map(state=>state.cooling_degree_days);
    //Create year greenhouse emissions map plot
    var mapdata=[{
    type:'choropleth',
    locationmode:'USA-states',
    locations:states,
    z:greenhousevalues,
    text:statenames,
    autocolorscale:true}];
    var maplayout={
    title:`${year} State Greenhouse Emissions (metric tons of carbon dioxide)`,
    plot_bgcolor:'rgb(215,215,215)',
    paper_bgcolor:'rgb(215,215,215)',
    geo:{
        bgcolor:'rgb(215,215,215)',
        scope:'usa',
        countrycolor:'rgb(255,255,255)',
        showland:true,
        landcolor:'rgb(255,255,255)',
        showlakes:true,
        lakecolor:'rgb(52,177,242)',
        subunitcolor:'rgb(255,255,255)',
        lonaxis:{},
        lataxis:{}}};
    Plotly.newPlot('chart3',mapdata,maplayout);
    //Create year generation map plot
    var mapdata=[{
    type:'choropleth',
    locationmode:'USA-states',
    locations:states,
    z:generationvalues,
    text:statenames,
    autocolorscale:true}];
    var maplayout={
    title:`${year} State Power Generation (MWh)`,
    plot_bgcolor:'rgb(215,215,215)',
    paper_bgcolor:'rgb(215,215,215)',
    geo:{
        bgcolor:'rgb(215,215,215)',
        scope:'usa',
        countrycolor:'rgb(255,255,255)',
        showland:true,
        landcolor:'rgb(255,255,255)',
        showlakes:true,
        lakecolor:'rgb(52,177,242)',
        subunitcolor:'rgb(255,255,255)',
        lonaxis:{},
        lataxis:{}}};
    Plotly.newPlot('chart4',mapdata,maplayout);
    //Create year cooling degree days map plot
    var mapdata=[{
    type:'choropleth',
    locationmode:'USA-states',
    locations:states,
    z:coolingvalues,
    text:statenames,
    autocolorscale:true}];
    var maplayout={
    title:`${year} State Cooling Degree Days`,
    plot_bgcolor:'rgb(215,215,215)',
    paper_bgcolor:'rgb(215,215,215)',
    geo:{
        bgcolor:'rgb(215,215,215)',
        scope:'usa',
        countrycolor:'rgb(255,255,255)',
        showland:true,
        landcolor:'rgb(255,255,255)',
        showlakes:true,
        lakecolor:'rgb(52,177,242)',
        subunitcolor:'rgb(255,255,255)',
        lonaxis:{},
        lataxis:{}}};
    Plotly.newPlot('chart5',mapdata,maplayout);
});};

function d3init(){
    var aqiyear=2018;
    aqiPlot(aqiyear)}

function aqiPlot(aqiyear){
// varibles to set the number of variables (n) and the number of states (m) and the d3.stack function to stack the bar chart
var n = 2;
var m = 52;
var stack = d3.stack();
// setup the svg canvas
var svgWidth = 800;
var svgHeight = 150;
var padding = 700;
// setup chart margin
var margin = {top: 5, right: 5, bottom: 20, left: 35},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
//format por the labels in the plot
var formatPercent = d3.format("%");
var formatNumber = d3.format("");
// console.log(filterYear);

// get the json file
d3.json('static/data/state_data.json').then(function(data){
    var aqiData = data
    console.log(aqiData)
    var inputYear = aqiyear
    console.log(inputYear)
    console.log(`LOURDES, it works!  This is data for ${inputYear}`);
         // Filter the data to keep only records for the chosen year
    var filteredData = aqiData.filter(aqiData => aqiData.year == inputYear);
    //
    var summaryData = filteredData.map(function(d){
        return {
            year: d.year,
            good_days_percent: d.good_days_percent,
            bad_days_percent: d.bad_days_percent,
            state: d.state
        }
    })
    // get the states as a variable to use in the tick label and more
    var states = summaryData.map(d => d.state)
   
    console.log(states)
    var svgArea = d3
    .select("#chart1")
    .select("svg")

    if (!svgArea.empty()){
        svgArea.remove();
    }

    //select where the plot will be located in the body of the html
    var svg = d3.select("#chart1").append('svg')
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var keys = [0,1]
    var keys = ['good_days_percent', 'bad_days_percent']
    var keysLabel = ['Good', 'Bad']
    var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderDescending);
    
    var stackedSeries = stack(summaryData)

    console.log(stackedSeries)

//  // plot range   
    yStackMax = d3.max(stackedSeries, function(layer) { return d3.max(layer, function(d) { return d[1]; }); }),
    yGroupMax = d3.max(stackedSeries, function(layer) { return d3.max(layer, function(d) { return d[1] - d[0]; }); });
// setting up the axis
    var x = d3.scaleBand()
        .domain(d3.range(m))
        .rangeRound([0, width])
        .padding(0.1)
        .align(0.1);

    // var x1 = d3.scaleBand()
    //     .padding(0.05);

    var y = d3.scaleLinear()
        .domain([0, yStackMax])
        .rangeRound([height, 0]);

    var color = d3.scaleLinear()
        .domain([0, n - 1])
        .range(["mediumaquamarine", "darkred"]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(2)
        .tickPadding(6)
        .ticks(m)
        .tickFormat(function (d){
            return states[d]
        });
        // .style("font", "14px")
        // .outerTickSize()

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(2)
        .tickPadding(6);

    var layer = svg.selectAll(".layer")
        .data(stackedSeries)
        .enter().append("g")
        .attr("class", "layer")
        .attr("id", function(d) { return d.key; })
        .style("fill", function(d, i) { return color(i); });
    
    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i) { return x(i); })
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0);

    rect.transition()
        .delay(function(d, i) {return i * 10; })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); });
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("font", "8px times")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 0 + ",0)")
        .style("font-size", "10px")
        .call(yAxis);

    function aqichange() {
        clearTimeout(timeout);
        if (this.value === "grouped") transitionGrouped();
        else if (this.value === "stacked") transitionStacked();
    }

    d3.selectAll("input").on("change", aqichange);

    var legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (padding + 20) + ', 0)')
                .style("font-size", "10px")
                .attr("height", 300)
                .attr("width", 300)

            legend.selectAll('rect')
                .data(keysLabel)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', function(d, i){
                    return i * 18;
                })
                .attr('width', 12)
                .attr('height',12)
                .attr('fill', function(d, i){
                    return color(i);
                });
            
            legend.selectAll('text')
                .data(keysLabel)
                .enter()
                .append('text')
                .text(function(d){
                    return d;
                })
                .attr('x', 18)
                .attr('y', function(d, i){
                    return i * 18;
                })
                .attr('text-anchor', 'start')
                .attr('alignment-baseline', 'hanging');

    var timeout = setTimeout(function() {
        d3.select("input[value=\"grouped\"]").property("checked", true).each(aqichange);
        // setTimeout(function() {
        //     d3.select("input[value=\"percent\"]").property("checked", true).each(change);
        // }, 2000);
    }, 200);

    function transitionGrouped() {
        y.domain([0, yGroupMax]);
        console.log(this);
        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("x", function(d, i, j) { return x(i) + x.bandwidth() / n * keys.indexOf(this.parentNode.id) })
            .attr("width", x.bandwidth() / n)
        .transition()
            .attr("y", function(d) { return height - (y(d[0]) - y(d[1])); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); });
        
        yAxis.tickFormat(formatNumber)
        svg.selectAll(".y.axis").transition()
            .delay(500)
            .duration(500)
            .call(yAxis)
        }
        
    function transitionStacked() {
        y.domain([0, yStackMax]);
        
        rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .transition()
            .attr("x", function(d, i) { return x(i); })
            .attr("width", x.bandwidth());
        
        yAxis.tickFormat(formatNumber)
        svg.selectAll(".y.axis").transition()
            .delay(500)
            .duration(500)
            .call(yAxis)
        
        }


});

};

//Listener, on change to the DOM, call changestate function
d3.select('#state_selected').on('change',changestate);
d3.select('#year_slider').on('click',changeyear);

//Build initial plots on load
d3init();
plotlyinit();
leafletinit();

//Function to change state plots
function changestate(){
    let stateplot=d3.select('#state_selected').node().value;
    buildplot(stateplot)};

//Function to change year plots
function changeyear(){
    let year=d3.select('#year_selected').property('value');
    buildmap(year)
    d3.select('#heatmapdiv').html('');
    d3.select('#heatmapdiv').html('<div id="heatmap"></div>');
    buildheat(year)
    d3.select('#aqidiv').html('');
    d3.select('#aqidiv').html('<div id= "chart1"><form><label><input type="radio" name="mode" value="grouped"> Grouped</label><label><input type="radio" name="mode" value="stacked" checked> Stacked</label></form></div>');
    aqiPlot(year)};