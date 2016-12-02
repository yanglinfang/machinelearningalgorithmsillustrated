


function getParam(paramName, data) {
	switch (paramName) {
		case 'x1_min':
			return d3.min(data, function (d) { return d["x1"]; });
		case 'x1_max':
			return d3.max(data, function (d) { return d["x1"]; });
		case 'x1_span':
			return d3.max(data, function (d) { return d["x1"]; }) - d3.min(data, function (d) { return d["x1"]; });
		case 'x2_min':
			return d3.min(data, function (d) { return d["x2"]; });
		case 'x2_max':
			return d3.max(data, function (d) { return d["x2"]; });
		case 'x2_span':
			return d3.max(data, function (d) { return d["x2"]; }) - d3.min(data, function (d) { return d["x2"]; });
	}
}


function normalizeData(data) {

	var x1_min = getParam('x1_min', data)
	var x1_span = getParam('x1_span', data)
	var x2_min = getParam('x2_min', data)
	var x2_span = getParam('x2_span', data)

	var normalized = [];
	var i = 0;
	data.forEach(function (element) {
		var e = {};
		e.x1 = (element.x1 - x1_min) / x1_span;
		e.x2 = (element.x2 - x2_min) / x2_span;
		e.y = element.y;
		normalized[i] = e;
		i++;
	}, this);
	return normalized;
}


function scatter(id, data) {

	//clean up existing plot
	d3.select('#' + id + ' svg').remove()

	var margin = { top: 23, right: 30, bottom: 40, left: 40 }
		, width = 235
		, height = 240


	var x = d3.scaleLinear()
		.domain([getParam('x1_min', data) - getParam('x1_span', data) / 7.0, getParam('x1_max', data) + getParam('x1_span', data) / 7.0])
		.range([0, width]);

	var y = d3.scaleLinear()
		      .domain([getParam('x2_min', data) - getParam('x2_span', data) / 10.0, getParam('x2_max', data) + getParam('x2_span', data) / 10.0])
		      .range([height, 0]);


	// gridlines in x axis function
	function make_x_gridlines() {
		return d3.axisBottom(x)
			.ticks(10)
	}

	// gridlines in y axis function
	function make_y_gridlines() {
		return d3.axisLeft(y)
			.ticks(5)
	}

	var chart = d3.select('#' + id)
		.append('svg:svg')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.attr('class', 'chart')


	// add the X gridlines
	chart.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
		.call(make_x_gridlines()
			.tickSize(-height)
			.tickFormat("")
		)

	// add the Y gridlines
	chart.append("g")
		.attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")
		.attr("class", "grid")
		.call(make_y_gridlines()
			.tickSize(-width)
			.tickFormat("")
		)

	// add the X Axis
	chart.append("g")
		.attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
		.call(d3.axisBottom(x)
		// .tickValues([0, 1, 2, 3, 4, 5, 6, 7])
		// .tickFormat(d3.format(",.0f"))
		)

	// add the Y Axis
	chart.append("g")
		.attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")
		.call(d3.axisLeft(y)
		// .tickValues([0, 1, 2, 3, 4, 5, 6, 7])
		// .tickFormat(d3.format(",.0f"))
		);


	var main = chart.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'main')

	var g = main.append("svg:g");

	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
		.attr("class", function (d) { return "data-point-" + d["y"] })
		.attr("cx", function (d, i) { return x(d["x1"]); })
		.attr("cy", function (d) { return y(d["x2"]); })
		.attr("r", 6)

		.on("mouseenter", function (d, i) {
			var xPosition = parseFloat(d3.select(this).attr("cx")) - 10;
			var yPosition = parseFloat(d3.select(this).attr("cy")) - 50;

			//Update the tooltip position and value
			var tooltip = d3.select('#' + id).selectAll(".tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px")

			tooltip.selectAll(".x2")
				.text("$x_{i2} = " + d['x2'] + "\\ ft$")

			tooltip.selectAll(".x1")
				.text("$x_{i1} = " + d['x1'] + "\\ lbs$")

			tooltip.selectAll(".y")
				.text("$y = " + d['y'] + "$")

			setTimeout(function () {
				MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
			}, 1);
			//Show the tooltip
			d3.select('#' + id).selectAll(".tooltip").classed("hidden", false);

		}).on("mouseout", function (d) {
			d3.select('#' + id).selectAll(".tooltip").classed("hidden", true);
		});

	// now add titles to the axes
	main.append("text")
		.attr("class", "mathy")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (-margin.left * .75) + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("Height in ft");

	main.append("text")
		.attr("class", "mathy")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (width / 2) + "," + (height + (margin.bottom * .95)) + ")")  // centre below axis
		.text("Weight in lbs");
}

