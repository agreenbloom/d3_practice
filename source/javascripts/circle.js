// $(document).on('ready', function(){

//   var width = 960, height = 500, r = 50,
//     force = d3.layout.force()
//       .size([width, height])
//       .gravity(0)
//       .charge(0)
//       .friction(0.95);

//   var previousPoint;

//   var data = d3.range(20).map(function() {
//     return [Math.random() * width, Math.random() * height];
//   });


//   var color = d3.scale.category20();

//    var svg = d3.select("body").append("svg")
//      .attr("width", width)
//      .attr("height", height)
//      .append("g");

//    var drag = d3.behavior.drag()
//      .on("drag", move);

//    svg.on("mousemove", function() {
//     var point = d3.mouse(this),
//       node = {
//         x: point[0],
//         y: point[1],
//         px: previousPoint ? previousPoint[0] : point[0],
//         py: previousPoint ? previousPoint[1] : point[1]
//     };

//     previousPoint = point;

//     svg.append("circle")
//         .data([node])
//       .attr("class", "node")
//       .attr("cx", function (d) {return d.x;})
//       .attr("cy", function (d) {return d.y;})
//       .attr("r", 1e-6)
//     .transition()
//       .attr("r", 4.5)
//     .transition()
//       .delay(7000)
//       .attr("r", 1e-6)
//       .each("end", function () {
//         force.nodes().shift();
//       })
//       .remove();
//     force.nodes().push(node);
//     force.start();

//    });


//    svg.selectAll("circle")
//      .data(data)
//      .enter().append("circle")
//      .attr("r", r)
//      .attr("transform", function (d) {
//        return "translate(" + d + ")";
//      })
//      .style("fill", function(d, i) {
//       return color(i);
//      })
//    .call(drag);



//    d3.select(this).transition()
//      .ease("elastic")
//      .duration(500)
//      .attr("r", 48);

//    function move(d) {
//      var x = d3.event.x,
//        y = d3.event.y;
//      if(inBoundaries(x, y))
//        d3.select(this)
//        .attr("transform", function (d) {
//          return "translate(" + x + ", " + y + ")";
//        });
//    }

//    function inBoundaries(x, y){
//      return (x >= (0 + r) && x <= (width - r))
//        && (y >= (0 + r) && y <= (height - r));
//    }


// });

