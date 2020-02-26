d3.json('static/js/state_records_test.json').then(function(states){
  console.log(states);
  
//     // Format the data
//     statedata.forEach(function(statedata) {
//       statedata.year=parsetime(statedata.year);})
    
//     var states=statedata.state;
//     var state=states[0];
//     stateselect=d3.select('#seldataset');
//     states.forEach(state=>{
//         var row=sampleselect.append('option');
//         row.text(state);});
//   console.log('state')
//   console.log(state);
    
//     });

//     var plotDiv = document.getElementById('plot');
// var traces = [
// 	{x: [1,2,3], y: [2,1,4], stackgroup: 'one', groupnorm:'percent'},
// 	{x: [1,2,3], y: [1,1,2], stackgroup: 'one'},
// 	{x: [1,2,3], y: [3,0,2], stackgroup: 'one'}
// ];

// Plotly.newPlot('myDiv', traces, {title: 'Normalized stacked and filled line chart'});



// // 1. Use the filter method to create a custom filtering function
// //  that returns the movies with a rating greater than 8.9

// function filterMovieRatings(movie) {
//     return movie.imdbRating > 8.9;
//   }
  
//   // 2. Use filter() to pass the function as its argument
//   var filteredMovies = topMovies.filter(filterMovieRatings);
//   console.log(filteredMovies);
  
//   // 3. Use the map method with the arrow function to return all the filtered movie titles.
//   var titles = filteredMovies.map(movies =>  movies.title);
//   console.log(titles);
  
//   // 4. Use the map method with the arrow function to return all the filtered movie metascores.
//   var ratings = filteredMovies.map(movies => movies.metascore);
//   console.log(ratings);
  
//   // 5. Create your trace.
//   var trace = {
//     x: titles,
//     y: ratings,
//     type: "bar"
//   };
  
//   // 6. Create the data array for our plot
//   var data = [trace];
  
//   // 7. Define our plot layout
//   var layout = {
//     title: "The highest critically acclaimed movies",
//     xaxis: { title: "Title" },
//     yaxis: { title: "Metascore (Critic) Rating"}
//   };
  
//   // 8. Plot the chart to a div tag with id "bar-plot"
//   Plotly.newPlot("bar-plot", data, layout);