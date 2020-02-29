function aqiPlot(stateurl,aqiyear){
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
    d3.json(stateurl).then(function(data){
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
            .range(["limegreen", "crimson"]);
    
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