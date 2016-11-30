

if (window.location.host.indexOf('127.0.0.1') != -1
	|| window.location.host.indexOf('localhost') != -1
	|| window.location.host.indexOf('.net') != -1) {
	url = window.location.href.toString().split('/', 3).join('/');
}
else {
	url = 'http://www.candpgeneration.com/209HTML'
}

function drawWeightMatrix(elem) {

switch (elem) {
	case "LR":
	break;
	case "NN":
	break;
	case "NN2":
	break
}

    var filePath;
    switch (elem) {
        case "LR":
            filePath = url + "/data/linearly-separable-case/LRweights.txt";
            break;
        case "NN":
            filePath = url + "/data/non-linearly-separable-case/NNweights.txt";
            break;
		case "NN2":
            filePath = url + "/data/non-linearly-separable-case/NNweights2.txt";
            break;
    }

	    d3.json(filePath, function (data) {
        data = data.map(function (d, i) {
			switch (elem) {
				case "LR":
					return [i, d.map(function(v,i) { return v[1]; })]; //use weight from second column
				case "NN2":
					return [i, d.map(function(v,i) { return v[1]; })]; //use weight from second column
			}
            return [i, d];//using weights between input and hidden layer, no need to change
        });

        var w1 = data.map(function(d,i) { return Math.abs(parseFloat(d[1][0])); }); //LR weight 1

        var colorScalew1 = d3.scaleLinear()
            .domain([d3.min(w1), d3.max(w1)])
            .range(['white', '#1d0177']); 

		var w = 40; 
		var h = 40; 
       

		d3.select('body')
            .select("#" + elem + "Weights")
            .select('div')
            .remove()

        var svg1 = d3.select('body')
            .select("#" + elem + "Weights")
            .data(w1)
            .append('div')
            .attr('style',function(d,i){
                return 'background-color: '+colorScalew1(d)+'; width: '+w+'px; height: '+h+'px; box-sizing: border-box; margin: 1px; position: relative;'; 
            })
			;
       
        var path = svg1.append('path')
            .attr('class', 'line')
            .attr("transform", "translate(" + 30 + ",0)")
            .attr('d', colorScalew1(parseFloat(data[0])))
        

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

        function pathTween() {
            var interpolate = d3.scaleQuantile()
                .domain([0, 1])
                .range(d3.range(1, data.length + 1));
            return function (t) {
                return colorScalew1(data.slice(0, interpolate(t)));
            };
        }

    });
}









