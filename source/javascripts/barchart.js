$(document).on('ready', function(){

  var w = 600;
  var h = 250;

  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

  var xScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

  var svg = d3.select("#barchart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

  svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return h - yScale(d);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", function(d) {
    return yScale(d);
  })
  .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
  });

  svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function(d) {
    return h - yScale(d) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");


  d3.select("p")
  .on("click", function() {
    var numValues = dataset.length;
    dataset = [];
    for (var i = 0; i < numValues; i++) {
      var newNumber = Math.floor(Math.random() * 25);
      dataset.push(newNumber);
    }

    svg.selectAll("rect")
    .data(dataset)
    .transition()
    .delay(function(d, i) {
      return i / dataset.length * 1000;
    })
    .duration(500)
    .ease("linear")
    .attr("y", function(d) {
      return h - yScale(d);
    })
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (d * 10) + ")";
    });

    svg.selectAll("text")
    .data(dataset)
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
      return h - yScale(d) + 14;
    });

  });




})