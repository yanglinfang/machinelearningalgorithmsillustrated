


if (window.location.host.indexOf('127.0.0.1') != -1
   || window.location.host.indexOf('localhost') != -1
   || window.location.host.indexOf('.net') != -1) {
    url = window.location.href.toString().split('/', 3).join('/');
}
else {
    url = 'http://www.candpgeneration.com/209HTML'
}

function drawMatrix(elem){
	var width  = 250,
    	height = 250;

	d3.json(url+"/data/linearly-separable-case/LRweights.txt", function(error, res) {
	        if (error){return console.warn("error",error);}
	        else{
	        	console.debug("res",res[0])
	        	drawGraph(res[0]);
	        }
	})
	
	// purple #1d0177

	function drawGraph(data){
		
		var svg = d3.select('body').select("#"+elem).append("svg")
	                    .attr("width", width)
	                    .attr("height", height)
	                    .attr("class","weight-graph");
	    
	    var node = svg.selectAll("g")
	                    .data(data)
					    .enter()
					    .append('g')
					    .attr('class','box')

			node.append('rect')
					.attr('x',10)
					.attr('y',function(d,i){return 30*i})
					.attr('width',20)
	        		.attr('height',20)
	        		.attr('fill','#1d0177')
	        		.attr('opacity', function(d){
	        			console.log("rect d",d)
	        			return Math.abs(d[0])
	        		})



		console.log("drawing drawGraph")
	}
}








