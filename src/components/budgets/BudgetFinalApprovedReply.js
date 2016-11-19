import React from 'react';
import BudgetNewFinalApprovedReply from './BudgetNewFinalApprovedReply';
import AttachmentsView from './AttachmentsView';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import PermissionJail from './../PermissionJail';
import {arrayJoin, createEditFlag, deleteEditFlag, emitNotification} from './../../utilities';
import {finalStatus} from './../../constants';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetFinalApprovedReply = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetDetailStore')],
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getStateFromFlux: function(){

		return {
			BudgetDetailStore: this.getFlux().store('BudgetDetailStore').getState()
		}
	},
	getInitialState: function(){

		return {
			editMode: false
		}
	},
	getData: function(){

		this.getFlux().actions.BudgetDetailActions.getFinalApprovedReply({
			budgetCutId: this.props.id
		})
	},
	componentDidMount: function(){

		this.getData();

	},
	componentDidUpdate: function(prevProps){

		if(prevProps.id != this.props.id) this.getData()
	},
	onEdit: function(){

		/**
		 * Create an edit flag
		 */

		createEditFlag(this.context.currentUser, this.getFlux(), 'finalDraftDetails', this.props.id, () => {

			/* If no errors: Turn on Edit Mode */

			this.getFlux().actions.BudgetDetailActions.getFinalApprovedReply({
				budgetCutId: this.props.id
			}, () => {

				this.setState({
					editMode: true
				})
			});

		})

	},
	render: function(){

		var {finalApprovedReply} = this.state.BudgetDetailStore;
		var {status} = this.props;

		if(this.state.editMode){

			return (
				<div>
					<BudgetNewFinalApprovedReply
						budgetCutId = {this.props.id}
						finalApprovedReply = {finalApprovedReply}
						editMode = {this.state.editMode}
						onFinishEdit = {()=> {
							this.setState({
								editMode: false
							})

							deleteEditFlag(this.context.currentUser, this.getFlux(), 'finalDraftDetails', this.props.id)
						}}
						onCancelForm = {()=> {
							this.setState({
								editMode: false
							})
						}}
					/>
					<hr className="rule" />
				</div>
			)
		}

		var editLink = (status.toLowerCase() != finalStatus? <a className="link-edit link-edit-question" onClick = {this.onEdit}>Edit</a>: null);

		if(finalApprovedReply.length){

			return (
				<div>
					<PermissionJail permission = 'canEditFinalDraft'>
						{editLink}
					</PermissionJail>
					<h4>Final approved reply details</h4>
					<table className="docsflow-table docsflow-table-budget-item docsflow-table-budget-single">

						{finalApprovedReply.map((q, idx) => {

							return (
								<tbody key = {idx}>
								<tr>
									<th>Final approved reply</th>
									<td>
										<AttachmentsView attachments = {q.attachments} />
									</td>
								</tr>
								<tr>
									<th>Final approved reply available?</th>
									<td>{q.available? 'Yes': 'No'}</td>
								</tr>
								<tr>
									<th>Type of reply uploaded</th>
									<td>{ arrayJoin(q.types) }</td>
								</tr>
								<tr>
									<td colSpan="2">
										<div className="activity-meta">
											{q.date}
										</div>
									</td>
								</tr>
								</tbody>
							)
						})}

					</table>
				</div>
			)
		}

		return (
			<PermissionJail permission = 'canEditFinalDraft'>
				<div>
					<BudgetNewFinalApprovedReply
						budgetCutId = {this.props.id}
						onFinishEdit = { () => {
							deleteEditFlag(this.context.currentUser, this.getFlux(), 'finalDraftDetails', this.props.id)
						}}
					/>
					<hr className="rule" />
				</div>
			</PermissionJail>
		)
	}
});

module.exports = BudgetFinalApprovedReply;
