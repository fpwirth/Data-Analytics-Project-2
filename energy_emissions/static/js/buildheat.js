//Function to build annual heatmaps and show individual power plants
function buildheat(facilityurl,yearheat){
    var heatlayer=[];
    var facility=[];
    //Get data and filter by year
    d3.json(facilityurl).then(function(facilities){
        var year=yearheat;
        var tempfilteredheat=facilities.filter(facilities=>facilities.year==year);
        var filteredheat=tempfilteredheat.filter(tempfilteredheat=>tempfilteredheat.state!='US');
    //Create annual facility and heat layer data
        for (var i=0;i<filteredheat.length;i++){
        var location=[filteredheat[i].latitude,filteredheat[i].longitude,filteredheat[i].emissions_mt];
        var marker=L.circle([filteredheat[i].latitude,filteredheat[i].longitude],{stroke:false,color:'red',fillOpacity:.5,radius:filteredheat[i].emissions_mt/300}).bindPopup(`<h3>${filteredheat[i].facility_name}<hr>Greenhouse Emissions (mt): ${filteredheat[i].emissions_mt}</h3>`);
        heatlayer.push(location);
        facility.push(marker);};
    //Create basemaps
        var street=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/streets-v11',
            accessToken:API_KEY});
        var satellitemap=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id:'mapbox/satellite-v9',
            accessToken:API_KEY});
        var basemaps={
            'Street Map':street,
            'Satellite Map':satellitemap};
        var map=L.map('heatmap',{
            center:[39.8333,-98.5833],
            zoom:4,
            layers:[street]});
    //Create heatlayer for year
        L.heatLayer(heatlayer,{
            radius: 5,
            blur: 10
            }).addTo(map);
    //Create layer control for map
        var overlaymaps={
            'Power Plants':L.layerGroup(facility)};
            L.control.layers(basemaps,overlaymaps,{collapsed:false}).addTo(map);});};