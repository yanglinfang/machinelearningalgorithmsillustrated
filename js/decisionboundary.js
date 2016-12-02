


function drawDecisionBoundary(elem) {
    var url = window.location.href.toString().split('/', 3).join('/');
    var filePath;
    switch (elem) {
        case "LR":
            filePath = url + "/data/linearly-separable-case/LRcontour.txt";
            break;
        case "NN":
            filePath = url + "/data/non-linearly-separable-case/NNcontour.txt";
            break;
    }


    var layout = {
        width: 300,
        height: 300,
	    showlegend: false
    };

    d3.json(filePath, function (error, res) {
        if (error) { return console.warn("error", error); }
        else {
            data = res[0];


            var plotData = [{
                z: data[0].map(function (value, index) { return value[2]; }),
                x: data[0].map(function (value, index) { return value[0]; }),
                y: data[0].map(function (value, index) { return value[1]; }),
                type: 'contour'
            }
            ];

            if (document.getElementById(elem + 'contour') != null) {
                Plotly.newPlot(elem + 'contour', plotData, layout);
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
                        var plotData = [{
                            z: res[j][0].map(function (value, index) { return value[2]; }),
                            x: res[j][0].map(function (value, index) { return value[0]; }),
                            y: res[j][0].map(function (value, index) { return value[1]; }),
                            type: 'contour'
                        }
                        ];

                        Plotly.newPlot(elem + 'contour', plotData, layout);

                    } else {
                        clearInterval(inter)
                    }
                }, wait); 
            })
        }
    })



}