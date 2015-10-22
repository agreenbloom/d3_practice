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


  var λ = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

  var φ = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var features = svg.append("g")
    .attr("class","features");

  var featureData = d3.selectAll("path.countries").data();

  var realFeatureSize = d3.extent(featureData, function(d) {return d3.geo.area(d)});

  var newFeatureColor = d3.scale.quantize()
    .domain(features).range(colorbrewer.Reds[7]);

  svg.on("mousemove", function() {
    var p = d3.mouse(this);
    projection.rotate([λ(p[0]), φ(p[1])]);
    svg.selectAll("path").attr("d", path);
  })
;
  d3.json("world.geojson",function(error,geodata) {
    if (error) return console.log(error); //unknown error, check the console

    features.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d",path)
      .attr("class", "countries")
      .style("fill", function(d) {
      return newFeatureColor(geoPath.area(d));
    })

    svg.append("path")
      .datum(topojson.feature(geodata, geodata.objects.land ))
      .attr("class", "land")
      .attr("d", path);
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