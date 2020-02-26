d3.json('static/js/state_records_test.json').then(function(states){
  var statesdata=states;
  var filteredstate=statesdata.filter(statesdata=>statesdata.state=='TX');
  console.log(filteredstate);
  buildplot(filteredstate);
});

function buildplot(filteredstate){
  var years=filteredstate.map(year=>year.year);
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
  console.log(years);
    var traces=[
      {x:years,y:coalvalues,stackgroup:'one',groupnorm:'percent'},
      {x:years,y:ngvalues,stackgroup:'one'},
      {x:years,y:petrovalues,stackgroup:'one'},
      {x:years,y:othergasvalues,stackgroup:'one'},
      {x:years,y:othervalues,stackgroup:'one'},
      {x:years,y:nuclearvalues,stackgroup:'one'},
      {x:years,y:hydrovalues,stackgroup:'one'},
      {x:years,y:solarvalues,stackgroup:'one'},
      {x:years,y:windvalues,stackgroup:'one'},
      {x:years,y:geothermalvalues,stackgroup:'one'},
      {x:years,y:woodvalues,stackgroup:'one'},
      {x:years,y:otherbiomassvalues,stackgroup:'one'},
      {x:years,y:pumpedvalues,stackgroup:'one'}];

    Plotly.newPlot('chart2', traces, {title: 'State Power Generation by Type'});
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