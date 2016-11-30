

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

		var w = 40; 
		var h = 40; 
		var p = 30;

		d3.select('body')
            .select("#" + elem + "Weights")
            .select('div')
            .remove()

        var svg1 = d3.select('body')
            .select("#" + elem + "Weights")
            .data(function(d,i){return d;})
            .append('div')
            .attr('style','width: '+w+'px; height: '+h+'px; box-sizing: border-box; margin: 1px; position: relative;')
			.attr('background-color', function(d, i){return d[0];})
			;

        var path = svg1.append('path')
            .attr("transform", "translate(" + p + ",0)")
            .attr('d', parseFloat(data[0]))
     

    });
}









