var n = 2, // number of layers
    m = 28, // number of samples per layer
    stack = d3.stack(),
    var url = "/data/state_data"
    d3.json(url).then(function(response){
        console.log(response);
    })