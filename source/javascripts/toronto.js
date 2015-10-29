$(document).on('ready', function(){

  var width = 940,
      height = 860;

  var projection = d3.geo.conicEqualArea()
      .scale(145500)
      .center([-79.45318304409768,43.74080098090873])
      .translate([height / 2, width / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);


  var features = svg.append("g")
      .attr("class","features");


  queue()
    .defer(d3.json, "toronto.geojson")
    .defer(d3.csv, "uber.csv")
    .await(ready);


  function ready(error, geodata) {
    if (error) return console.log(error);

    features.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d",path);

  };


});