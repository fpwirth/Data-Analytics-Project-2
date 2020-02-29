//Function to build state map plots
function buildmap(stateurl,yearmap){
    //Get data and filter by state
    d3.json(stateurl).then(function(states){
        var year=yearmap;
        var tempfilteredyear=states.filter(states=>states.year==year);
        var filteredyear=tempfilteredyear.filter(tempfilteredyear=>tempfilteredyear.state!='US');
        var states=filteredyear.map(state=>state.state);
        var statenames=filteredyear.map(state=>state.state_name);
        var greenhousevalues=filteredyear.map(state=>state.greenhouse_emissions);
        var generationvalues=filteredyear.map(state=>state.generation_mwh_total);
        var coolingvalues=filteredyear.map(state=>state.cooling_degree_days);
        var coalvalues=filteredyear.map(state=>state.consumption_coal);
        var ngvalues=filteredyear.map(state=>state.consumption_ng);
        var greenvalues=filteredyear.map(state=>state.generation_mwh_solar+state.generation_mwh_hydro+state.generation_mwh_wind+state.generation_mwh_nuclear+state.generation_mwh_pumped);
        //Create year greenhouse emissions map plot
        var mapdata=[{
        type:'choropleth',
        locationmode:'USA-states',
        locations:states,
        z:greenhousevalues,
        text:statenames,
        autocolorscale:true}];
        var maplayout={
        title:`${year} State Greenhouse Emissions (metric tons of CO<sub>2</sub>)`,
        plot_bgcolor:'rgb(215,215,215)',
        paper_bgcolor:'rgb(215,215,215)',
        geo:{
            bgcolor:'rgb(215,215,215)',
            scope:'usa',
            countrycolor:'rgb(255,255,255)',
            showland:true,
            landcolor:'rgb(255,255,255)',
            showlakes:true,
            lakecolor:'rgb(52,177,242)',
            subunitcolor:'rgb(255,255,255)',
            lonaxis:{},
            lataxis:{}}};
        Plotly.newPlot('chart3',mapdata,maplayout);
        //Create year generation map plot
        var mapdata=[{
        type:'choropleth',
        locationmode:'USA-states',
        locations:states,
        z:generationvalues,
        text:statenames,
        autocolorscale:true}];
        var maplayout={
        title:`${year} State Power Generation (MWh)`,
        plot_bgcolor:'rgb(215,215,215)',
        paper_bgcolor:'rgb(215,215,215)',
        geo:{
            bgcolor:'rgb(215,215,215)',
            scope:'usa',
            countrycolor:'rgb(255,255,255)',
            showland:true,
            landcolor:'rgb(255,255,255)',
            showlakes:true,
            lakecolor:'rgb(52,177,242)',
            subunitcolor:'rgb(255,255,255)',
            lonaxis:{},
            lataxis:{}}};
        Plotly.newPlot('chart4',mapdata,maplayout);
        //Create year cooling degree days map plot
        var mapdata=[{
        type:'choropleth',
        locationmode:'USA-states',
        locations:states,
        z:coolingvalues,
        text:statenames,
        autocolorscale:true}];
        var maplayout={
        title:`${year} State Cooling Degree Days`,
        plot_bgcolor:'rgb(215,215,215)',
        paper_bgcolor:'rgb(215,215,215)',
        geo:{
            bgcolor:'rgb(215,215,215)',
            scope:'usa',
            countrycolor:'rgb(255,255,255)',
            showland:true,
            landcolor:'rgb(255,255,255)',
            showlakes:true,
            lakecolor:'rgb(52,177,242)',
            subunitcolor:'rgb(255,255,255)',
            lonaxis:{},
            lataxis:{}}};
        Plotly.newPlot('chart5',mapdata,maplayout);
        //Create year coal consumption map plot
        var mapdata=[{
            type:'choropleth',
            locationmode:'USA-states',
            locations:states,
            z:coalvalues,
            text:statenames,
            autocolorscale:true}];
            var maplayout={
            title:`${year} State Coal Consumption (Short Tons)`,
            plot_bgcolor:'rgb(215,215,215)',
            paper_bgcolor:'rgb(215,215,215)',
            geo:{
                bgcolor:'rgb(215,215,215)',
                scope:'usa',
                countrycolor:'rgb(255,255,255)',
                showland:true,
                landcolor:'rgb(255,255,255)',
                showlakes:true,
                lakecolor:'rgb(52,177,242)',
                subunitcolor:'rgb(255,255,255)',
                lonaxis:{},
                lataxis:{}}};
            Plotly.newPlot('chart6',mapdata,maplayout);
        //Create year natural gas consumption map plot
        var mapdata=[{
            type:'choropleth',
            locationmode:'USA-states',
            locations:states,
            z:ngvalues,
            text:statenames,
            autocolorscale:true}];
            var maplayout={
            title:`${year} State Natural Gas Consumption (Mcf)`,
            plot_bgcolor:'rgb(215,215,215)',
            paper_bgcolor:'rgb(215,215,215)',
            geo:{
                bgcolor:'rgb(215,215,215)',
                scope:'usa',
                countrycolor:'rgb(255,255,255)',
                showland:true,
                landcolor:'rgb(255,255,255)',
                showlakes:true,
                lakecolor:'rgb(52,177,242)',
                subunitcolor:'rgb(255,255,255)',
                lonaxis:{},
                lataxis:{}}};
            Plotly.newPlot('chart7',mapdata,maplayout);
        //Create year green generation map plot
        var mapdata=[{
            type:'choropleth',
            locationmode:'USA-states',
            locations:states,
            z:greenvalues,
            text:statenames,
            autocolorscale:true}];
            var maplayout={
            title:`${year} State Green Generation (MWh)`,
            plot_bgcolor:'rgb(215,215,215)',
            paper_bgcolor:'rgb(215,215,215)',
            geo:{
                bgcolor:'rgb(215,215,215)',
                scope:'usa',
                countrycolor:'rgb(255,255,255)',
                showland:true,
                landcolor:'rgb(255,255,255)',
                showlakes:true,
                lakecolor:'rgb(52,177,242)',
                subunitcolor:'rgb(255,255,255)',
                lonaxis:{},
                lataxis:{}}};
            Plotly.newPlot('chart8',mapdata,maplayout);});};