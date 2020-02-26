d3.json('static/js/state_records_test.json').then(function(states){
  var statedata=states;
  var state='TX';
  buildplot(statedata,state);});

function buildplot(statedata,state){
    var filteredstate=statedata.filter(statedata=>statedata.state==state);
    console.log(filteredstate);

    // PLOT STUFF HERE
};

function optionChanged(){
    let state=d3.select('#year_slider').node().value;
    statedata=statedata;
    console.log(state);
    // buildplot(statedata,state);
};