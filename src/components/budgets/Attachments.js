import React from 'react';
import Fluxxor from 'fluxxor';
import _ from 'lodash';
var FluxMixin = Fluxxor.FluxMixin(React)

var Attachments = React.createClass({
	mixins: [FluxMixin],
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	deleteAttachment: function(id){

		if(confirm('Are you sure you want to delete?')){

			this.getFlux().actions.BudgetActions.deleteAttachment({
				budgetCutId: this.props.budgetCutId,
				id: id,
				type: this.props.type,
				userId: this.context.currentUser.id
			}, (response) => {

				if(response.success){

					var _attachments = _.clone(this.state.attachments);

					for(var i = _attachments.length - 1; i >= 0; i--){
						if(_attachments[i].id ==id){
							_attachments.splice(i, 1)
						}
					}

					this.setState({
						attachments: _attachments
					})
				}
			})

		}
	},
	getInitialState: function(){

		return {
			attachments: this.props.attachments
		}
	},
	render: function(){

		var {attachments} = this.state;

		return (
			<div>
				{attachments.map((attachment, idx) => {

					var boundDelete = this.deleteAttachment.bind(this, attachment.id);

					return (
						<div key = {idx}>
							<a key = {idx} href={attachment.downloadUrl} className="docsflow-a">
								{attachment.fileName}
							</a>
							<a onClick = {boundDelete} title="Delete attachment" className="link-delete-attachment"></a>
						</div>
					)
				})}
			</div>
		)
	}
});

module.exports = Attachments;
