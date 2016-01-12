var Chart = require('./Chart');

var sampleData = [
	{ x: 1, y: 10, z: 1 },
    { x: 2, y: 13, z: 12 },
    { x: 3, y: 19, z: 13},
    { x: 4, y: 21, z: 14 },
    { x: 5, y: 25, z: 6 },
    { x: 6, y: 22, z: 8 },
    { x: 7, y: 18, z: 9 },
    { x: 8, y: 15, z: 0 },
    { x: 9, y: 13, z: 3 },
    { x: 10, y: 11, z: 15 },
    { x: 11, y: 12, z: 16 },
0];

var App React.createClass({
	getInitialState: function() {
		return {
			data: sampleData, 
			domain: {x: [0, 30], y: [0, 100]}
		};
	},

	render: function() {
		return (
			<div className="Apps">
				<Chart 
					data={this.state.data}
					domain={this.state.domain} />
			</div>
		);
	}
});

React.renderComponent(App(), document.body);