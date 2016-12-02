function drawNNMatrix(elem){
	var url = window.location.href.toString().split('/', 3).join('/');
	var width  = 300,
    	height = 170;


    var x = d3.scaleLinear()
    	.domain([0, 7])
    	.range([0, 1]);

    var opacity = function(d){
    	var op =  Math.abs(x(d))
		return 'rgba(29,1,119,'+op+')'
	}
    var OUTPUT_opacity = function(d){
        var op =  Math.abs(x(d[1]))
        return 'rgba(29,1,119,'+op+')'
    }
	var weightValue = function(d,i){
		return d[1].toFixed(10)
	}
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
            .html("<div class='matrix-label'><br><br>Inputs</div>")
            .attr("x", 20)
            .attr("y", 25)
    d3.select('.weight-graph')
            .append("foreignObject")
            .attr("width",100)
            .attr("height",20) 
            .html("<div class='matrix-label'>Hidden<br>Layer<br>Weights</div>")
            .attr("x", 80)
            .attr("y", 25)         

    d3.select('.weight-graph')
            .append("foreignObject")
            .attr("width",100)
            .attr("height",20) 
            .html("<div class='matrix-label'>Output<br>Layer<br>Weigths</div>")
            .attr("x", 190)
            .attr("y", 25)        

    // Draw the two input boxes        
    for(var i = 0; i < 2; i++){
        d3.select('.weight-graph').append('rect')
            .attr('class','input-box')
            .attr('fill','#fff')
            .attr('x',20)
            .attr('y',function(){return i*30+80})
    }

    //*  HIDDEN LAYER
    (function(){
 
        d3.json(url+"/data/non-linearly-separable-case/NNweights.txt", function(error, res) {
	        if (error){return console.warn("error",error);}
	        else{
	        	w1_data = res[0];


                // Draw weights boxes
	    		var hidden_layer = svg.selectAll(".hidden-boxes")
	                    .data(w1_data)
					    .enter()
					    .append('g')
                        .attr('class','hidden-boxes')
					    .each(function(d, j) {
                            d3.select(this).selectAll(".hidden-boxes")
                                .data(function(d, i) { return d; })
                                .enter()
                                .append("rect")
            						.attr('class','hidden-box')
            						.attr('x',function(d,i){
                                        return 30*i + 80;
                                    })
            						.attr('y',function(d,i){
                                        return 30*j + 80;
                                    })
            						.attr('width',20)
            		        		.attr('height',20)
            		        		.attr('fill',opacity)
                                })
                

                // animate the color of the boxes.
	        	$(document.body).on('click', "#playNN", function (e) {
		        	var j = 0
                    // var k = 1
		        	var inter = setInterval(function() {
		        			j+=100;

                            // k += parseInt(Math.log(j)) // slow down the accelaration of weights so the change is perceptable.
		        			
                            if (j < res.length){
								hidden_layer.selectAll('.hidden-boxes')
                                    .data(res[j])
                                    .enter()
                                    .each(function(d,i){

                                        d3.select(this).selectAll(".hidden-box")
                                            .data(function(d, i) { return d; })
                                            .attr('fill',opacity)
                                    })
                                

		        			}else{
		        				clearInterval(inter)
		        			}
			        }, 50); // run for 5 secs. iterations = 10,000/100 = 100. 5,000 millisecs/100 iterations = 50 miliseconds. *** NOT GUARANTEED ***
		        })
	        }
	   })
    })();
    //*/

    //* OUTPUT LAYER
    (function(){

        d3.json(url+"/data/non-linearly-separable-case/NNweights2.txt", function(error, res) {
            if (error){return console.warn("error",error);}
            else{
                w2_data = res[0];

                // Draw weights boxes
                var output_layer = svg.selectAll(".output-boxes")
                        .data(w2_data)
                        .enter()
                        .append('g')
                        .attr('class','output-boxes')


                output_layer.append('rect')
                        .attr('class','output-box')
                        .attr('x',190)
                        .attr('y',function(d,i){
                            return 30*i + 80
                        })
                        .attr('width',20)
                        .attr('height',20)
                        .attr('fill',OUTPUT_opacity)

                // Draw weight values.        
                output_layer.append('text')
                    .attr('x',220)
                    .attr('y',function(d,i){return 30*i + 95})
                    .attr('class','box-value')
                    .text(weightValue)  


                // // animate the color of the boxes.
                $(document.body).on('click', "#playNN", function (e) {
                    var i = 0
                    var j = 1
                    var inter = setInterval(function() {
                            i+=100;

                            j += parseInt(Math.log(i)) // slow down the accelaration of weights so the change is perceptable.
                            
                            if (i < res.length){
                                output_layer.select('.output-box').data(res[j])
                                    .attr('fill',OUTPUT_opacity)

                                output_layer.select('.box-value').data(res[j])
                                    .text(weightValue)  

                            }else{
                                clearInterval(inter)
                            }
                    }, 150); // run for 5 secs. iterations = 10,000/100 = 100. 5,000 millisecs/100 iterations = 50 miliseconds. *** NOT GUARANTEED ***
                })
            }
        })
    })()
    //*/
}	




