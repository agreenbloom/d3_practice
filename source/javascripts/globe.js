$(document).on('ready', function(){

  var width = 960;
  var height = 960;

  var projection  = d3.geo.orthographic()
    .scale(475)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(.1);

  var path = d3.geo.path()
    .projection(projection);

  var graticule = d3.geo.graticule();


  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var features = svg.append("g")
    .attr("class","features");

  var featureData = d3.selectAll("path.countries").data();

  var realFeatureSize = d3.extent(featureData, function(d) {return d3.geo.area(d)});

  var newFeatureColor = d3.scale.quantize()
    .domain(features).range(colorbrewer.Reds[7]);


  d3.json("world.geojson",function(error,geodata) {
    if (error) return console.log(error); //unknown error, check the console

    features.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d",path)
      .attr("class", "countries")
      .on("click",clicked)
      .style("fill", function(d) {
      return newFeatureColor(geoPath.area(d));
    })
  });

  d3.select("svg").append("path")
    .datum(graticule)
    .attr("class", "graticule line")
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "grey")
    .style("stroke-width", "1px");

    d3.select("svg").append("path")
      .datum(graticule.outline)
      .attr("class", "graticule outline")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "1px");


});
