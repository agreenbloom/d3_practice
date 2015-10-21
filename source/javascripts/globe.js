$(document).on('ready', function(){

  var width = 960;
  var height = 960;

var radius = height / 2-5,
  scale = radius,
  velocity = .02;

  var projection  = d3.geo.orthographic()
    .scale(scale)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(.1);

  var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

  var context = canvas.node().getContext("2d");

  var path = d3.geo.path()
    .projection(projection)
    .context(context);

  var graticule = d3.geo.graticule();


  var svg = d3.select("body").append("svg")
    .attr("width", height)
    .attr("height", width);

 var globe = {type: "Sphere"};


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
      // .on("click",clicked)
      .style("fill", function(d) {
      return newFeatureColor(path.area(d));
    })

    d3.timer(function(elapsed) {
      context.clearRect(0, 0, width, height);

      projection.rotate([velocity * elapsed, 0]);
      context.beginPath();
      path(geodata);
      context.fill();

      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
      context.lineWidth = 2.5;
      context.stroke();
      });

  });

  d3.select(self.frameElement).style("height", height + "px");

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
