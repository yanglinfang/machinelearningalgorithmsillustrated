function drawLRMatrix(elem){
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
		return d[1].toFixed(10)
	}
	d3.json(url+"/data/linearly-separable-case/LRweights.txt", function(error, res) {
	        if (error){return console.warn("error",error);}
	        else{
	        	data = res[0];

	        	var svg = d3.select('body').select("#"+elem).append("svg")
	                    .attr("width", width)
	                    .attr("height", height)
	                    .attr("class","weight-graph");
	    
                // Draw the matrix layer labels. Use math font. 
                // Also, this allow us to  create line breaks, which are a PIA with SVG text.
                d3.select('.weight-graph')
                        .append("foreignObject")
                        .attr("width",100)
                        .attr("height",20) 
                        .html("<div class='matrix-label'>Output<br>Layer<br>Weights</div>")
                        .attr("x", 80)
                        .attr("y", 25)   
                
                d3.select('.weight-graph')
                        .append("foreignObject")
                        .attr("width",100)
                        .attr("height",20) 
                        .html("<div class='matrix-label'><br><br>Inputs</div>")
                        .attr("x", 20)
                        .attr("y", 25)

                // Draw the two input boxes        
                for(var i = 0; i < 2; i++){
                    d3.select('.weight-graph').append('rect')
                        .attr('class','input-box')
                        .attr('fill','#fff')
                        .attr('x',20)
                        .attr('y',function(){return i*30+80})
                }
                
               

                // Draw weights boxes - nodes
	    		node = svg.selectAll("g")
	                    .data(data)
					    .enter()
					    .append('g')
					    

				node.append('rect')
						.attr('class','output-box')
						.attr('x',80)
						.attr('y',function(d,i){
                            console.log("dd",d,i)
                            return 30*i + 80
                        })
						.attr('width',20)
		        		.attr('height',20)
		        		.attr('fill',opacity)

                // Draw weight values.        
		        node.append('text')
		        	.attr('x',110)
					.attr('y',function(d,i){return 30*i + 95})
		        	.attr('class','box-value')
		        	.text(weightValue)		


                // animate the color of the boxes.
	        	$(document.body).on('click', "#playLR", function (e) {
		        	var j = 0
                    var k = 1
		        	var inter = setInterval(function() {
		        			j+=100;

                            k += parseInt(Math.log(j)) // slow down the accelaration of weights so the change is perceptable.
		        			
                            if (j < res.length){
								node.select('.output-box').data(res[k])
									.attr('fill',opacity)

								node.select('.box-value').data(res[k])
									.text(weightValue)	

		        			}else{
		        				clearInterval(inter)
		        			}
			        }, 25); // run for 5 secs. iterations = 20,000/100 = 200. 5,000 millisecs/200 iterations = 25 miliseconds. *** NOT GUARANTEED ***
		        })
	        }
	})
}	



