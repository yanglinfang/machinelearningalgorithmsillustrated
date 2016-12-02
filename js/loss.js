

function drawLossChart(elem) {

    var url = window.location.href.toString().split('/', 3).join('/');
    // var filePath;
    // switch(elem){
    //     case "LR":
    //         filePath = url + "/data/LRlosses.txt";
    //         break;
    //     case "NN":
    //         filePath = url + "/data/NNlosses.txt";
    //         break;
    // } 

    d3.json(url + "/data/"+elem+"losses.txt", function (data) {
        data = data.map(function (d, i) {
            return [i, d];
        });

        var w = 250,
            h = 120,
            p = 30;

        var x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w]);

        var y = d3.scaleLinear()
            .domain([0, 1.5])
            .range([h, 0]);

        //var xAxis =    d3.select(".axis")
        //    .call(d3.axisBottom(x));

        //var yAxis = d3.svg.axis()
        //    .scale(y)
        //    .orient("left");

        var line = d3.line()
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); });


        d3.select('body')
            .select("#" + elem + "Loss")
            .select('svg')
            .remove()

        var svg = d3.select('body')
            .select("#" + elem + "Loss")
            .append('svg')
            .attr('w', w)
            .attr('h', h);

        // add element and transition in



        var path = svg.append('path')
            .attr('class', 'line')
            .attr("transform", "translate(" + p + ",0)")
            .attr('d', line(parseFloat(data[0])))

        $(document.body).on('click', "#play" + elem, function (e) {
            var that = $(this).find('i')
            that.text('pause')
            path
                .transition().on(
                'end', function () {
                    that.text('play_arrow')
                }
                )
                .duration(5000)
                .attrTween('d', pathTween)

                ;
        })

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + p + ", " + 130 + ")")
            .call(d3.axisBottom().scale(x))
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 4)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + p + ", 10)")
            .call(d3.axisLeft().scale(y));

        function pathTween() {
            var interpolate = d3.scaleQuantile()
                .domain([0, 1])
                .range(d3.range(1, data.length + 1));
            return function (t) {
                return line(data.slice(0, interpolate(t)));
            };
        }

    });
}
