import React from 'react';

export default class Dialog extends React.Component{

	static defaultProps = {
		title: 'Alert'
	}

	render(){

		var { title, formMessages } = this.props;

		return (
			<div className="ui-modal modal-alert">
				<div className="modal-body">
					<p>You are editing { formMessages.join(', ') }. <br />Do you want to save the changes?</p>

					<a className="docsflow-btn docsflow-btn-primary flush--bottom" onClick = {this.props.onSave}>Save</a>
              		<a className="docsflow-btn docsflow-btn-secondary flush--bottom" onClick = {this.props.onDiscard}>Discard</a>
				</div>
			</div>
		)
	}
}
