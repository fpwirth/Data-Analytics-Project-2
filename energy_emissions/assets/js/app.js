// drop down select
var year_select = d3.select('#year_select');

// loop through and append the year to the drop down
for (var i=1990; i < 2019; ++i) {

    // append an option to the drop down list for each year
    var option = year_select.append('option').text(i);

}