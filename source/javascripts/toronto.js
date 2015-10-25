$(document).on('ready', function(){

  var width = 500,
      height = 500;

  var projection = d3.geo.conicEqualArea()
      .scale(height * 100)
      .center([ -79.20831973072589, 43.739257904235977 ])
      // .parallels([41.9714969544088,83.1480859363606])
      // .rotate([96.64103465647952])
      .translate([height / 2, width / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);


  var features = svg.append("g")
      .attr("class","features");

  // var zoom = d3.behavior.zoom()
  //     .scaleExtent([1, Infinity])
  //     .on("zoom",zoomed);

  // svg.call(zoom);

  d3.json("toronto.geojson", function(error,geodata) {
    if (error) return console.log(error);

    features.selectAll("path")
      .data(geodata.features)
      .enter()
      .append("path")
      .attr("d",path);
      // .on("click",clicked);

  });



  // function zoomed() {
  //   features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
  //       .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
  // }
});