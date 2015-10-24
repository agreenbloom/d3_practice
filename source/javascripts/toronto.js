$(document).on('ready', function(){

  var width = 462,
      height = 600;

  var projection = d3.geo.conicEqualArea()


  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var zoom = d3.behavior.zoom()
      .scaleExtent([1, Infinity])
      .on("zoom",zoomed);

  svg.call(zoom);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var features = svg.append("g")
      .attr("class","features");

  var zoom = d3.behavior.zoom()
      .scaleExtent([1, Infinity])
      .on("zoom",zoomed);

  svg.call(zoom);

  d3.json("ontario.json",function(error,geodata) {
    if (error) return console.log(error);

    features.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d",path)
      .on("click",clicked);

  });


  function clicked(d,i) {

  }

  function zoomed() {
    features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
        .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
  }
});