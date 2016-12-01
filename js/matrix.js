


if (window.location.host.indexOf('127.0.0.1') != -1
   || window.location.host.indexOf('localhost') != -1
   || window.location.host.indexOf('.net') != -1) {
    url = window.location.href.toString().split('/', 3).join('/');
}
else {
    url = 'http://www.candpgeneration.com/209HTML'
}

function drawMatrix(elem){
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








