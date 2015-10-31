$(document).on('ready', function(){

  var width = 1230,
      height = 1160;

  var rateById = d3.map();

  var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  var projection = d3.geo.mercator()
      .scale(135500)
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


  function ready(error, geodata, uber) {
    if (error) return console.log(error);


      uber.forEach(function(d) {
        console.log(d.rate);
        console.log(d.HOOD);
        console.log(d.id);
      });

    svg.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d",path);
  };

});