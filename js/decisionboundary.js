


function drawDecisionBoundary(elem){
    var url = window.location.href.toString().split('/', 3).join('/');
    var filePath;
   switch(elem){
       case "LR":
       filePath = url + "/data/linearly-separable-case/LRcontour.txt";
       break;
       case "NN":
       filePath = url + "/data/non-linearly-separable-case/NNcontour.txt";
       break;
   } 

    d3.json(filePath, function (data) {
        data = data.map(function (d, i) {
            return [i, d];
        });

        var c = new Conrec(),
            xs = d3.range(0, data.length),
            ys = d3.range(0, data[0].length),
            zs = d3.range(-1, 2, 1),
            width = 200,
            height = 200,
            x = d3.scale.linear().range([0, width]).domain([0, data.length]),
            y = d3.scale.linear().range([height, 0]).domain([0, data[0].length]),
            colours = d3.scale.linear().domain([-5, 3]).range(["#fff", "red"]);
        
        c.contour(data, 0, xs.length - 1, 0, ys.length - 1, xs, ys, zs.length, zs);

        d3.select("body")
        .select("#" + elem + "contour")
        .select("svg")
        .remove();

        var LRcountour = d3.select("body")
        .select("#" + elem + "contour")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .selectAll("path")
        .data(c.contourList())
        .enter()
        .append("path")
        .style("fill", function(d){ return colours(d.level);})
        .style("stroke","black")
        .attr("d", d3.svg.line()
          .x(function(d){ return x(d.x); })
          .y(function(d){ return y(d.y); }));




    });

}