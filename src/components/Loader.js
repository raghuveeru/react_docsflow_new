import React from 'react';
import Spinner from 'react-spinkit';

var Loader = React.createClass({
	render: function(){

		return (
			<div className="momster-loader">
				<Spinner spinnerName='three-bounce'/>
			</div>
		)
	}
});

module.exports = Loader;