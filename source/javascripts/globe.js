// $(document).on('ready', function(){

//   var width = 960;
//   var height = 960;

//   var projection  = d3.geo.orthographic()
//     .scale(475)
//     .translate([width / 2, height / 2])
//     .clipAngle(90)
//     .precision(.1);

//   var geoPath = d3.geo.path()
//     .projection(projection);

//   var graticule = d3.geo.graticule();


//   var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

//   var featureData = d3.selectAll("path.countries").data();

//   var realFeatureSize = d3.extent(featureData, function(d) {return d3.geo.area(d)});

//   var newFeatureColor = d3.scale.quantize()
//     .domain(realFeatureSize).range(colorbrewer.Reds[7]);

//   d3.select("svg").selectAll("path").data(data)
//     .enter()
//     .append("path")
//     .attr("d", geoPath)
//     .attr("class", "countries")
//     .style("fill", function(d) {
//       return newFeatureColor(geoPath.area(d))
//     });


// });