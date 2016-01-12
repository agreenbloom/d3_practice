var d3Chart = {};

d3Chart.create = function(el, props, state) {
	var svg = d3.(el).append('svg')
		.attr('class', 'd3')
		.attr('width', props.width)
		.attr('height', props.height);

	svg.append('g')
		.attr('class', 'd3-points');


	this.update(el, state);
};



d3Chart.update = function(el, state) {
	var scales = this._scales(el, state.domain)
	this._drawPoints(el, scales, state.data);
};

d3Chart.destroy = function(el) {

};



d3Chart._drawPoints = function(el, scales, data) {
	var g = d3.select(el).selectAll('.d3-points');

	var point = g.selectAll('.d3-point')
		.data(data, function(d) {return d.id});

	point.enter().append('circle')
		.attr('class', 'd3-point');

	point.attr('cx', function(d) {return scales.x(d.x); })
		.attr('cy', function(d) { return scales.y(d.y); })
		.attr('r', function(d) {return scales.z(d.z); })


	point.exit()
		.remove();
};