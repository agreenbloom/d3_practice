$(document).on('ready', function(){

  var width = 1230,
      height = 1160;


  var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  var projection = d3.geo.mercator()
      .scale(135500)
      .center([-79.45318304409768,43.74080098090873])
      .translate([height / 2, width / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);


  var features = svg.append("g")
      .attr("class","features");


  queue()
    .defer(d3.json, "toronto.geojson")
    .defer(d3.csv, "uber.csv")
    .await(ready);

  var ward = [];

  var tooltip = d3.select('body').append('div')
   .attr('class', 'tooltip');


  function ready(error, json, csvData) {
    if (error) return console.log(error);
    // console.log(geodata.features[1,40].properties.id);
     // data.forEach(function(d){
     //   console.log(d.id)
     //   console.log(d.vote)
    var keyArray = [];



       for (var i = 0; i < csvData.length; i ++){

            //get the ward name
            var wardName = csvData[i].HOOD;
            //get the number of vote for ward
            var voteUber = csvData[i].vote;

            for(var j = 0; j < json.features.length; j++){

                var jsonWard = json.features[j].properties.HOOD

                if (wardName == jsonWard ) {

                  json.features[j].properties.value = voteUber;
                  break;

                }

                //stop
              }
            }


     svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d) {
          var value = d.properties.value;

          if (value == "yes") {
            return "blue"
          } else {
            return "yellow"
          }
        })

     };



});


