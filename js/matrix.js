



function drawMatrix(elem){
	var url = window.location.href.toString().split('/', 3).join('/');
	var width  = 425,
    	height = 300,
    	node;


    var x = d3.scaleLinear()
    	.domain([-4, 4.1])
    	.range([0, 1]);

    var opacity = function(d,i){
    	var op =  Math.abs(x(d[1]))
		return 'rgba(29,1,119,'+op+')'
	}
	var weightValue = function(d,i){
		return d[1].toFixed(5)
	}
	d3.json(url+"/data/linearly-separable-case/LRweights.txt", function(error, res) {
	        if (error){return console.warn("error",error);}
	        else{
	        	data = res[0];

	        	var svg = d3.select('body').select("#"+elem).append("svg")
	                    .attr("width", width)
	                    .attr("height", height)
	                    .attr("class","weight-graph");
	    
	    		node = svg.selectAll("g")
	                    .data(data)
					    .enter()
					    .append('g')
					    

				node.append('rect')
						.attr('class','box')
						.attr('x',80)
						.attr('y',function(d,i){return 30*i + 80})
						.attr('width',20)
		        		.attr('height',20)
		        		.attr('fill',opacity)

		        node.append('text')
		        	.attr('x',110)
					.attr('y',function(d,i){return 30*i + 95})
		        	.attr('class','box-value')
		        	.text(weightValue)		

	        	$(document.body).on('click', "#playLR", function (e) {
		        	var j = 0
		        	var inter = setInterval(function() {
		        			j++
		        			if (j < res.length){
								node.select('.box').data(res[j])
									.attr('fill',opacity)

								node.select('.box-value').data(res[j])
									.text(weightValue)	

		        			}else{
		        				clearInterval(inter)
		        			}
			                
			        }, 1);
		        })
	        }
	})
}	
/*

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
            .attr('d', function(d,i){
               
            })
        

        $(document.body).on('click', "#play" + elem, function (e) {
        	console.debug("play", elem)
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
                .domain([d3.min(w1), d3.max(w1)])
                .range(d3.range(1, data.length + 1));
            return function (t) {
                return (data.slice(0, interpolate(t))).map(function(v,i) { return Math.abs(parseFloat(v[1])); });
            };
        }

    });
}


*/






