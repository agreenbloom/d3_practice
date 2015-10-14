$(document).on('ready', function(){
  var w = 600;
  var h = 250;

  var path = d3.geo.path();

  var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

  d3.json("us-states.json", function(json){
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path);
  });

});