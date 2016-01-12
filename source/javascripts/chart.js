var d3Chart = require('./circle');

var Chart = React.createClass({
	propTypes: {
		data: React.propTypes.array,
		domain: React.propTypes.object
	},

	componentDidMount: function() {
		var el = this.getDOMNode();
		d3Chart.create(el, {
			width: '100%',
			height: '500px'
		}, this.getChartState());
	},

	componentDidUpdate: function() {
		var el = this.getDOMNode(); 
		d3Chart.update(el, this.getChartState());
	},

	getChartState: function() {
		return { 
			data: this.props.data,
			domain: this.props.domain
		};
	},

	componentWillUnmount: function() { 
		var el = this.getDOMNode();
		d3Chart.destroy(el);
	}, 

	render: function() {
    	return (
      		<div className="Chart"></div>
    	);
  	}
});