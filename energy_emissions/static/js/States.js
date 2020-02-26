d3.json('static/js/state_records_test.json').then(function(states){
  var statesdata=states;
  console.log(statesdata);
  var filteredstate=statesdata.filter(statesdata=>statesdata.state=='TX');
  console.log(filteredstate);
  buildplot(filteredstate);
});
// function filterCities(city) {
//   return city.Increase_from_2016 > "15000";
// }

function buildplot(filteredstate){
  var years=filteredstate.map(year=>year.year);
  var ngvalues=filteredstate.map(year=>year.generation_mwh_ng);
  var coalvalues=filteredstate.map(year=>year.generation_mwh_coal);
  console.log(years);
    var traces=[
      {x:years,y:coalvalues,stackgroup:'one'},
      {x:years,y:ngvalues,stackgroup:'one'}
      // {x:filteredstate.year,y:filteredstate.generation_mwh_ng,stackgroup:'one'},
      // {x:filteredstate.year,y:filteredstate.generation_mwh_petro,stackgroup:'one'},
      // {x:filteredstate.year,y:filteredstate.generation_mwh_other,stackgroup:'one'}
    ];

    Plotly.newPlot('chart2', traces, {title: 'Normalized stacked and filled line chart'});

    // PLOT STUFF HERE
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