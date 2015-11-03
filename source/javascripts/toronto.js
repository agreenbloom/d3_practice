$(document).on('ready', function(){

  var width = 1230,
      height = 1160;

  var projection = d3.geo.mercator()
      .scale(120555)
      .center([-79.45318304409768,43.74080098090873])
      .translate([height / 2, width / 2]);

  var path = d3.geo.path()
    .projection(projection);


  var color = d3.scale.quantize()
      .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)"]);


  var svg = d3.select("#toronto")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
      d3.csv("uber.csv", function(data) {
        color.domain([
          d3.min(data, function(d) { return d.value; }),
          d3.max(data, function(d) { return d.value; })
        ]);

        d3.json("toronto.geojson", function(json) {
          for (var i = 0; i < data.length; i++) {
            var dataID = data[i].id;
            var uberVote = data[i].vote;
            var dataValue = parseFloat(data[i].value);

            for (var j = 0; j < json.features.length; j++) {

              var jsonID = json.features[j].properties.id;

              if (dataID == jsonID) {

                json.features[j].properties.value = dataValue;
                break;

              }

            }
          }
          svg.selectAll("path")
             .data(json.features)
             .enter()
             .append("path")
             .attr("d", path)
             .style("fill", function(d) {
                var value = d.properties.value;

                if (value) {
                  return color(value);
                } else {
                  return "#ccc";
                }
             });
        });

      });


});


