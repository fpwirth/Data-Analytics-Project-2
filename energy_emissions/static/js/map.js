d3.json('../../../Clean Data Files/statedata.json').then((statedata)=>{
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time
    var parsetime = d3.timeParse('%Y');
  
    // Format the data
    statedata.forEach(function(statedata) {
      statedata.year=parsetime(statedata.year);})
    
    var states=statedata.state;
    var state=states[0];
    stateselect=d3.select('#seldataset');
    states.forEach(state=>{
        var row=sampleselect.append('option');
        row.text(state);});
  console.log('state')
  console.log(state);
    
    });