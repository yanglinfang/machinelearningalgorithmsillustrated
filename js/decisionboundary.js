


function drawDecisionBoundary(elem) {
    var url = window.location.href.toString().split('/', 3).join('/');
    var filePath;
    switch (elem) {
        case "LR":
            filePath = url + "/data/linearly-separable-case/LRcontour.txt";
            var normData = LRNorm
            break;
        case "NN":
            filePath = url + "/data/non-linearly-separable-case/NNcontour.txt";
            var normData = NNNorm
            break;
    }


    var layout = {
        width: 290,
        height: 290,
	    showlegend: false,
        margin: {
            l: 50,
            r: 10,
            b: 50,
            t: 10,
            pad: 0
        },
        xaxis:{
            nticks:10,
            tickvals:[0,0.2,0.4,0.6,0.8,1.0],
            ticktext:["100","120","140","160","180","200","220"],
            title: "Weight in lbs",
            linecolor: '#444444',
            zerolinewidth: 0,
            zerolinecolor:'#eeeeee'
        },
        yaxis:{
            nticks:10,
            tickvals:[0,0.2,0.4,0.6,0.8,1.0],
            ticktext:["5.0","5.2","5.4","5.6","5.8","6.0","6.2"],
            title: "Height in ft",
            linecolor: '#444444',
            zerolinewidth: 0,
            zerolinecolor:'#eeeeee'
        },
        font: {
            family: 'MJX_Math',

          }

    };

    var options = {
        displaylogo: false,
        displayModeBar: false,
        scrollZoom: false
    }

    d3.json(filePath, function (error, res) {
        if (error) { return console.warn("error", error); }
        else {
            data = res[0];


            var plotData = {
                z: data[0].map(function (value, index) { return value[2]; }),
                x: data[0].map(function (value, index) { return value[0]; }),
                y: data[0].map(function (value, index) { return value[1]; }),
                type: 'contour',
                showscale: false,
                colorscale: [[0, 'rgba(255,0,85,.0)'], 
                                        [0.25, 'rgba(255,0,85,.25)'], 
                                        [0.45, 'rgba(255,0,85,.45)'], 
                                        [0.65, 'rgba(255,0,85,.65)'], 
                                        [0.85, 'rgba(255,0,85,.85)'], 
                                        [1, 'rgba(255,0,85,1)']],
                contours:{
                    coloring: 'lines'
                }
            };

            var scatterDataPos = {
              x: normData.map(function (value,index){ if(value["y"] == 1){return value["x1"];}}),
              y: normData.map(function (value,index){ if(value["y"] == 1){return value["x2"];}}),
              mode: 'markers',
              type: 'scatter',
              marker: { size: 12, color:'black' }
            };
            var scatterDataNeg = {
              x: normData.map(function (value,index){ if(value["y"] == 0){return value["x1"];}}),
              y: normData.map(function (value,index){ if(value["y"] == 0){return value["x2"];}}),
              mode: 'markers',
              type: 'scatter',
              marker: { size: 12, color:'#cccccc'}
            };


            if (document.getElementById(elem + 'contour') != null) {
                Plotly.newPlot(elem + 'contour', [plotData,scatterDataPos,scatterDataNeg], layout, options);
            }

            // animate the color of the boxes.
            $(document.body).on('click', '#play' + elem, function (e) {
                var j = 0
                var k = 1
                var wait = elem == "LR" ? 25 : 0; //LR is a lot faster than NN
                var inter = setInterval(function () {
                    j += 1;

                    k += parseInt(Math.log(j)) // slow down the accelaration of weights so the change is perceptable.

                    if (j < res.length) {
                        var plotData = {
                            z: res[j][0].map(function (value, index) { return value[2]; }),
                            x: res[j][0].map(function (value, index) { return value[0]; }),
                            y: res[j][0].map(function (value, index) { return value[1]; }),
                            type: 'contour',
                            showscale: false,
                            colorscale: [[0, 'rgba(255,0,85,.0)'], 
                                        [0.25, 'rgba(255,0,85,.25)'], 
                                        [0.45, 'rgba(255,0,85,.45)'], 
                                        [0.65, 'rgba(255,0,85,.65)'], 
                                        [0.85, 'rgba(255,0,85,.85)'], 
                                        [1, 'rgba(255,0,85,1)']],
                            contours:{
                                coloring: 'lines'
                            },
                            colorbar:{}
                        };

                      

                        Plotly.newPlot(elem + 'contour', [plotData,scatterDataPos,scatterDataNeg], layout, options);

                    } else {
                        clearInterval(inter)
                    }
                }, wait); 
            })
        }
    })



}