$(document).on('ready', function(){

  var width = 960;
  var height = 960;
  var rotationFactor = 0.5;
  var isMouseDown = false;

  var projection  = d3.geo.orthographic()
    .scale(475)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(.1)
    .center([0,0]);

  var path = d3.geo.path()
    .projection(projection);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var graticule = d3.geo.graticule();

  var features = svg.append("g")
    .attr("class","features");

  var featureData = d3.selectAll("path.countries").data();

queue()
    .defer(d3.json, "world.geojson")
    .defer(d3.csv, "cities.csv")
    .await(map)


  function map(error, geodata, cities) {
    if (error) return console.log(error);

    features.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "countries");

    var mapZoom = d3.behavior.zoom().translate(projection.translate()).scale(projection.scale()).on("zoom", zoomed);
    d3.select("svg").call(mapZoom);

    var rotateScale = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

    d3.select("svg").on("mousedown", startRotating).on("mouseup", stopRotating);

    function startRotating() {
      d3.select("svg").on("mousemove", function() {
        var p = d3.mouse(this);
        projection.rotate([rotateScale(p[0]), 0]);
        zoomed();
      });
    }

    function stopRotating() {
      d3.select("svg").on("mousemove", null);
    }

    function zoomed() {
      var currentRotate = projection.rotate()[0];
      projection.scale(mapZoom.scale());
      d3.selectAll("path.graticule").attr("d", path);
      d3.selectAll("path.countries").attr("d", path);

      d3.selectAll("circle.cities")
      .attr("cx", function(d) {return projection([d.y,d.x])[0]})
      .attr("cy", function(d) {return projection([d.y,d.x])[1]})
      .style("display", function(d) {return parseInt(d.y) + currentRotate < 90 && parseInt(d.y) + currentRotate > -90 ? "block" : "none"})
    }

       d3.select("svg").selectAll("circle").data(cities)
          .enter()
          .append("circle")
          .attr("class", "cities")
          .style("fill", "red")
          .style("stroke", "red")
          .style("stroke-width", 3)
          .attr("r", 3)
          .attr("cx", function(d) {return projection([d.y,d.x])[0]})
          .attr("cy", function(d) {return projection([d.y,d.x])[1]})

  };


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

