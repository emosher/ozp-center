'use strict';

var React = require('react');

var ListingRow = React.createClass({

	render: function () {
		return (
			<tr>
				<td>Title</td>
				<td>Info 1</td>
			</tr>
		);
	}

});

module.exports = ListingRow;