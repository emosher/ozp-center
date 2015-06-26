'use strict';

var React = require('react');
var TableRow = require('../listing/ListingRow.jsx');

var TableView = React.createClass({

	renderTableRows: function() {
		return(
			<TableRow />
		);
	},

	render: function () {
		return (
			<table>
			{ this.renderTableRows() }
			</table>
		);
	}

});

module.exports = TableView;