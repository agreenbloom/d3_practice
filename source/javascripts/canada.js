// $(document).on('ready', function(){

//   var width = 462,
//       height = 600;

//   var projection = d3.geo.conicEqualArea()
//       .scale(529.7143908533221)
//       .center([-96.64103465647952,60.53825778884157])
//       .parallels([41.9714969544088,83.1480859363606])
//       .rotate([96.64103465647952])
//       .translate([-97.20316630291683,83.16223755810432])

//   var path = d3.geo.path()
//       .projection(projection);

//   var svg = d3.select("body").append("svg")
//       .attr("width", width)
//       .attr("height", height);

//   var features = svg.append("g")
//       .attr("class","features");

//   var zoom = d3.behavior.zoom()
//       .scaleExtent([1, Infinity])
//       .on("zoom",zoomed);

//   svg.call(zoom);

//   d3.json("canada.geojson",function(error,geodata) {
//     if (error) return console.log(error); //unknown error, check the console

//     features.selectAll("path")
//       .data(geodata.features)
//       .enter()
//       .append("path")
//       .attr("d",path)
//       .on("click",clicked);

//   });

//   function clicked(d,i) {

//   }

//   function zoomed() {
//     features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
//         .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
//   }
// });