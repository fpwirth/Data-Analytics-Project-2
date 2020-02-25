var n = 2;
var m = 51;
var stack = d3.stack();

var svgWidth = 960;
var svgHeight = 500;

var margin = {top: 40, right: 10, bottom: 20, left: 35},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");
var formatNumber = d3.format("");

var svg = d3
    .select("#chart1")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var formatPercent = d3.format(".0%");
var formatNumber = d3.format("");
        
var url = "static/js/state_records_test.json"


d3.json(url).then(function(data){
    var aqiData = data
    console.log(aqiData)

     // Filter the data to keep only records for the chosen year
    var filteredData = aqiData.filter(aqiData => aqiData.year === 1995);
    
    var summaryData = filteredData.map(function(d){
        return {
            year: d.year,
            good_days_percent: d.good_days_percent,
            bad_days_percent: d.bad_days_percent,
            state: d.state
        }
    })
    
   
    console.log(summaryData)

    var keys = summaryData.map(states => states.state)
    console.log(keys)

    // var layers = stack
    //     .keys(summaryData.state)
    //     .offset(d3.stackOffsetDiverging)
    //     (summaryData);

//     console.log(summaryData.state)
//     yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d[1]; }); }),
//     yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d[1] - d[0]; }); });

//     var x = d3.scaleBand()
//         .domain(d3.range(m))
//         .rangeRound([0, width])
//         .padding(0.1)
//         .align(0.1);

//     var y = d3.scaleLinear()
//         .domain([0, yStackMax])
//         .rangeRound([height, 0]);

//     var color = d3.scaleLinear()
//         .domain([0, n - 1])
//         .range(["#aad", "#556"]);

//     var xAxis = d3.axisBottom()
//         .scale(x)
//         .tickSize(0)
//         .tickPadding(6);

//     var yAxis = d3.axisLeft()
//         .scale(y)
//         .tickSize(2)
//         .tickPadding(6);
        

//     var layer = svg.selectAll(".layer")
//         .data(layers)
//         .enter().append("g")
//         .attr("class", "layer")
//         .attr("id", function(d) { return d.key; })
//         .style("fill", function(d, i) { return color(i); });
    
//     var rect = layer.selectAll("rect")
//         .data(function(d) { return d; })
//         .enter().append("rect")
//         .attr("x", function(d, i) { return x(i); })
//         .attr("y", height)
//         .attr("width", x.bandwidth())
//         .attr("height", 0);

//     rect.transition()
//         .delay(function(d, i) {return i * 10; })
//         .attr("y", function(d) { return y(d[1]); })
//         .attr("height", function(d) { return y(d[0]) - y(d[1]); });
    
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
    
//     svg.append("g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(" + 0 + ",0)")
//         .style("font-size", "10px")
//         .call(yAxis);
    
//     d3.selectAll("input").on("change", change);
    
//     var timeout = setTimeout(function() {
//         d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
//         setTimeout(function() {
//             d3.select("input[value=\"percent\"]").property("checked", true).each(change);
//         }, 2000);
//     }, 2000);
    
//     function change() {
//         clearTimeout(timeout);
//         if (this.value === "grouped") transitionGrouped();
//         else if (this.value === "stacked") transitionStacked();
//     }    

//     function transitionGrouped() {
//         y.domain([0, yGroupMax]);
        
//         rect.transition()
//             .duration(500)
//             .delay(function(d, i) { return i * 10; })
//             .attr("x", function(d, i, j) { return x(i) + x.bandwidth() / n * parseInt(this.parentNode.id); })
//             .attr("width", x.bandwidth() / n)
//         .transition()
//             .attr("y", function(d) { return height - (y(d[0]) - y(d[1])); })
//             .attr("height", function(d) { return y(d[0]) - y(d[1]); });
        
//         yAxis.tickFormat(formatNumber)
//         svg.selectAll(".y.axis").transition()
//             .delay(500)
//             .duration(500)
//             .call(yAxis)
//         }
        
//     function transitionStacked() {
//         y.domain([0, yStackMax]);
        
//         rect.transition()
//             .duration(500)
//             .delay(function(d, i) { return i * 10; })
//             .attr("y", function(d) { return y(d[1]); })
//             .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//         .transition()
//             .attr("x", function(d, i) { return x(i); })
//             .attr("width", x.bandwidth());
        
//         yAxis.tickFormat(formatNumber)
//         svg.selectAll(".y.axis").transition()
//             .delay(500)
//             .duration(500)
//             .call(yAxis)
        
//         }


});