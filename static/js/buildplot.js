//Function to build state plots
function buildplot(stateurl,stateplot){
    //Get data and filter by state
    d3.json(stateurl).then(function(states){
        var state=stateplot;
        var filteredstate=states.filter(states=>states.state==state);
    //Create state generation plot
        var years=filteredstate.map(year=>year.year);
        var greenhousevalues=filteredstate.map(year=>year.greenhouse_emissions);
        var co2values=filteredstate.map(year=>year.co2_mt_total);
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
        var gentraces=[
        {x:years,y:coalvalues,name:'Coal',stackgroup:'one',groupnorm:'percent',line:{width:.5}},
        {x:years,y:petrovalues,name:'Petroleum',stackgroup:'one',line:{width:.5}},
        {x:years,y:ngvalues,name:'Natural Gas',stackgroup:'one',line:{width:.5}},
        {x:years,y:othergasvalues,name:'Other Gases',stackgroup:'one',line:{width:.5}},
        {x:years,y:othervalues,name:'Other',stackgroup:'one',line:{width:.5}},
        {x:years,y:geothermalvalues,name:'Geothermal',stackgroup:'one',line:{width:.5}},
        {x:years,y:woodvalues,name:'Wood',stackgroup:'one',line:{width:.5}},
        {x:years,y:otherbiomassvalues,name:'Other Biomass',stackgroup:'one',line:{width:.5}},
        // {x:years,y:nuclearvalues,name:'Nuclear',stackgroup:'one'},
        // {x:years,y:hydrovalues,name:'Hydro',stackgroup:'one'},
        // {x:years,y:solarvalues,name:'Solar',stackgroup:'one'},
        // {x:years,y:windvalues,name:'Wind',stackgroup:'one'},
        // {x:years,y:pumpedvalues,name:'Pumped Storage',stackgroup:'one'},
        {x:years,y:greenvalues,name:'No Emission Sources',stackgroup:'one',line:{width:.5}},
        {x:years,y:co2values,name:'CO2 Emissions',yaxis:'y2',type:'scatter'},
        {x:years,y:greenhousevalues,name:'Greenhouse Emissions',yaxis:'y2',type:'scatter'}];
        var genlayout={
        title:`${state} Power Generation by Type`,
        plot_bgcolor:'rgb(215,215,215)',
        paper_bgcolor:'rgb(215,215,215)',
        yaxis:{title:'Generation (MWh)'},
        yaxis2:{title:'Emissions (metric tons of carbon dioxide)',overlaying:'y',side:'right'},
        legend:{orientation:'h'}};
        Plotly.newPlot('chart2',gentraces,genlayout);});}