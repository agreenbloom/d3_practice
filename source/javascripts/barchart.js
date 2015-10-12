$(document).on('ready', function(){

  var w = 600;
  var h = 250;

  var dataset = [ { key: 0, value: 5 },
        { key: 1, value: 10 },
        { key: 2, value: 13 },
        { key: 3, value: 19 },
        { key: 4, value: 21 },
        { key: 5, value: 25 },
        { key: 6, value: 22 },
        { key: 7, value: 18 },
        { key: 8, value: 15 },
        { key: 9, value: 13 },
        { key: 10, value: 11 },
        { key: 11, value: 12 },
        { key: 12, value: 15 },
        { key: 13, value: 20 },
        { key: 14, value: 18 },
        { key: 15, value: 17 },
        { key: 16, value: 16 },
        { key: 17, value: 18 },
        { key: 18, value: 23 },
        { key: 19, value: 25 } ];

  var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) { return d.value; })])
        .range([0, h]);

  var key = function(d) {
  return d.key;
  };

  var svg = d3.select("#barchart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.selectAll("rect")
   .data(dataset, key)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale(i);
   })
   .attr("y", function(d) {
      return h - yScale(d.value);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
      return yScale(d.value);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d.value * 10) + ")";
   })
   .on("click", function() {
     sortBars();
   });

  svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
      return d.value;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
      return h - yScale(d.value) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");

  var sortOrder = false;

  var sortBars = function() {
    sortOrder = !sortOrder;

    svg.selectAll("rect")
      .sort(function(a, b) {
        if (sortOrder) {
          return d3.ascending(a, b);
        } else {
          return d3.descending(a, b);
        }
      })
      .transition()
      .delay(function(d, i) {
        return i * 50;
      })
      .duration(1000)
      .attr("x", function(d, i) {
        return xScale(i);
      });
  }


  d3.selectAll("p")
  .on("click", function() {

    var paragraphID = d3.select(this).attr("id");

    if (paragraphID == "add") {
      var maxValue = 25;
      var newNumber = Math.floor(Math.random() * maxValue);
      var lastKeyValue = dataset[dataset.length - 1].key;
      console.log(lastKeyValue);
      dataset.push({
        key: lastKeyValue + 1,
        value: newNumber
      });
    } else {
      dataset.shift();
    }

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, function(d) { return d.value; })]);

    var bars = svg.selectAll("rect")
      .data(dataset, key);

    bars.enter()
      .append("rect")
      .attr("x", w)
      .attr("y", function(d) {
        return h - yScale(d.value);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
        return yScale(d.value);
      })
      .attr("fill", function(d) {
        return "rgb(0, 0, " + (d.value * 10) + ")";
      });

    bars.transition()
      .duration(500)
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("y", function(d) {
        return h - yScale(d.value);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
        return yScale(d.value);
      });

    bars.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.rangeBand())
      .remove();


    var labels = svg.selectAll("text")
      .data(dataset, key);

    labels.enter()
      .append("text")
      .text(function(d) {
        return d.value;
      })
      .attr("text-anchor", "middle")
      .attr("x", w)
      .attr("y", function(d) {
        return h - yScale(d.value) + 14;
      })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "white");

    labels.transition()
      .duration(500)
      .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      });

    labels.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.rangeBand())
      .remove();

  });



});

