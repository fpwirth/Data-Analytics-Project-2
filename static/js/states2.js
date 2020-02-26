d3.json('static/data/state_data.json').then(function(states){
  var state='TX';
  var filteredstate=states.filter(states=>states.state=='TX');
  console.log(filteredstate);
  buildplot(state,filteredstate);
});

function buildplot(state,filteredstate){
  var years=filteredstate.map(year=>year.year);
  var greenhousevalues=filteredstate.map(year=>year.greenhouse_emissions);
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
  console.log(greenvalues);
  var traces=[
    {x:years,y:coalvalues,name:'Coal',stackgroup:'one',groupnorm:'percent'},
    {x:years,y:ngvalues,name:'Natural Gas',stackgroup:'one'},
    {x:years,y:petrovalues,name:'Petroleum',stackgroup:'one'},
    {x:years,y:othergasvalues,name:'Other Gases',stackgroup:'one'},
    {x:years,y:othervalues,name:'Other',stackgroup:'one'},
    {x:years,y:nuclearvalues,name:'Nuclear',stackgroup:'one'},
    {x:years,y:hydrovalues,name:'Hydro',stackgroup:'one'},
    {x:years,y:solarvalues,name:'Solar',stackgroup:'one'},
    {x:years,y:windvalues,name:'Wind',stackgroup:'one'},
    {x:years,y:geothermalvalues,name:'Geothermal',stackgroup:'one'},
    {x:years,y:woodvalues,name:'Wood',stackgroup:'one'},
    {x:years,y:otherbiomassvalues,name:'Other Biomass',stackgroup:'one'},
    {x:years,y:pumpedvalues,name:'Pumped Storage',stackgroup:'one'},
    {x:years,y:greenhousevalues,name:'Greenhouse Emissions',yaxis:'y2',type:'scatter'}];
  var layout={
    title: `${state} Power Generation by Type`,
    yaxis:{title: 'Generation (MWh)'},
    yaxis2:{title: 'Greenhouse Emissions (metric tons of carbon dioxide)',overlaying:'y',side:'right'},
    legend:{font:{size:4},orientation:'h'}};

    Plotly.newPlot('chart2',traces,layout);
  };

// function optionChanged(){
//     let state=d3.select('#year_selected').node().value;
//     statedata=statedata;
//     console.log(state);
    // buildplot(statedata,state);
//};

// function filterstates(states) {
//   return states.state==state;
// }