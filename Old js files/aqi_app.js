var n = 2;
var m = 51;
var stack = d3.stack();

var svgWidth = 960;
var svgHeight = 500;
var padding = 700;

var margin = {top: 40, right: 10, bottom: 20, left: 35},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");
var formatNumber = d3.format("");


var formatPercent = d3.format(".0%");
var formatNumber = d3.format("");
        
var url = "static/data/state_data.json"
var filterYear = d3.select('#year_selected');
// console.log(filterYear);
// console.log("LOURDES!");

// function testF(event){
//     console.log("HELLO")
// }


document.getElementById("year_selected")[0].addEventListener('change', aqiPlot);

function aqiPlot(){



d3.json(url).then(function(data){
    var aqiData = data
    console.log(aqiData)
    var inputYear = filterYear.property('value')
    console.log(inputYear)
     // Filter the data to keep only records for the chosen year
    var filteredData = aqiData.filter(aqiData => aqiData.year == inputYear);
    
    var summaryData = filteredData.map(function(d){
        return {
            year: d.year,
            good_days_percent: d.good_days_percent,
            bad_days_percent: d.bad_days_percent,
            state: d.state
        }
    })
    
    var states = summaryData.map(d => d.state)
   
    console.log(states)
    var svgArea = d3
    .select("#heatmap")
    .select("svg")


    if (!svgArea.empty()){
        svgArea.remove();
    }

    
    var svg = d3.select("#heatmap").append('svg')
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var keys = [0,1]
    var keys = ['good_days_percent', 'bad_days_percent']
    var keysLabel = ['Air Quality Index: Good', 'Air Quality Index: Bad']
    var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderDescending);
    
    var stackedSeries = stack(summaryData)

    // console.log(stackedSeries)

//     
    yStackMax = d3.max(stackedSeries, function(layer) { return d3.max(layer, function(d) { return d[1]; }); }),
    yGroupMax = d3.max(stackedSeries, function(layer) { return d3.max(layer, function(d) { return d[1] - d[0]; }); });

    var x = d3.scaleBand()
        .domain(d3.range(m))
        .rangeRound([0, width])
        .padding(0.1)
        .align(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .domain([0, yStackMax])
        .rangeRound([height, 0]);

    var color = d3.scaleLinear()
        .domain([0, n - 1])
        .range(["mediumaquamarine", "darkred"]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        
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
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 0 + ",0)")
        .style("font-size", "10px")
        .call(yAxis);
    
    d3.selectAll("input").on("change", change);


    var legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (padding + 50) + ', 0)');

            legend.selectAll('rect')
                .data(keysLabel)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', function(d, i){
                    return i * 18;
                })
                .attr('width', 12)
                .attr('height', 12)
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
        d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
        // setTimeout(function() {
        //     d3.select("input[value=\"percent\"]").property("checked", true).each(change);
        // }, 2000);
    }, 2000);


    function change() {
        clearTimeout(timeout);
        if (this.value === "grouped") transitionGrouped();
        else if (this.value === "stacked") transitionStacked();
    }    

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

}



// aqiPlot();