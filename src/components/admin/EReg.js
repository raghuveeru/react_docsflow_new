import React from 'react';
import { emitNotification } from './../../utilities';


var EReg = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object,
		router: React.PropTypes.func
	},
	render: function(){

		return (
			<div>
				<br />
				<a
					className="docsflow-btn docsflow-btn-primary"
					onClick = { (event) => {

						this.props.flux.actions.AdminActions.uploadToEReg({ 'userId': this.context.currentUser.id }, ( response ) => {

							emitNotification( 'success', this.props.flux, response.message? response.message: 'No message found in response JSON')
						})
					}}
				>
					Upload to eReg
				</a>
			</div>
		)
	}
});

module.exports = EReg;
