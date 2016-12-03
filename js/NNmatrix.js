function drawNNMatrix(elem){
	var url = window.location.href.toString().split('/', 3).join('/');
	var width  = 300,
    	height = 170;


    var x = d3.scaleLinear()
    	.domain([0, 7])
    	.range([0, 1]);

    var HIDDEN_opacity = function(d){
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
        
    
    // STATIC ELEMENTS //
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

    // initialize data array
    var w1_data = [];
    d3.json(url+"/data/NNweights.txt", function(error, res) {
            if (error){return console.warn("error",error);}
            else{
                w1_data = res;
                hidden_layer_weights_update(w1_data[0])
            }
        });




    //*  HIDDEN LAYER [2 x 3]
    function hidden_layer_weights_update(data){
        // Draw weights boxes
        var hidden_layer = svg.selectAll(".hidden-boxes")
                .data(data, function(d) { return d; });

        	hidden_layer.enter()
                .append('g')
                .attr('class','hidden-boxes')
        	    .each(function(d, j) {

                    var hidden_boxes = d3.select(this).selectAll(".hidden-boxes")
                        .data(function(d, i) { return d; });
                        

                        hidden_boxes.enter()
                            .append("rect") // ???? HOW TO DO THIS IN SETUP? Need to get rid of th append
        					.attr('class','hidden-box')
        					.attr('x',function(d,i){
                                return 30*i + 80;
                            })
        					.attr('y',function(d,i){
                                return 30*j + 80;
                            })
        					.attr('width',20)
        	        		.attr('height',20)
        	        		.attr('fill',HIDDEN_opacity)

                        hidden_boxes.exit().remove();
                })
            hidden_layer.exit().remove();    
        }

                    // animate the color of the boxes.
        $(document.body).on('click', "#playNN", function (e) {
            var i = 0
            var j = 1
            var inter = setInterval(function() {
                    j+=100;

                    i += parseInt(Math.log(j)) // slow down the accelaration of weights so the change is perceptable.
                    
                    if (j < w1_data.length){
                        
                        hidden_layer_weights_update(w1_data[i])

                    }else{
                        clearInterval(inter)
                    }
            }, 50); // run for 5 secs. iterations = 10,000/100 = 100. 5,000 millisecs/100 iterations = 50 miliseconds. *** NOT GUARANTEED ***
        })


    //*/

    //* OUTPUT LAYER [1 x 3]

        d3.json(url+"/data/NNweights2.txt", function(error, res) {
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
    //*/
}	




