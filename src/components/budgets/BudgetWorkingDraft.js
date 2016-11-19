import React from 'react';
import BudgetNewWorkingDraft from './BudgetNewWorkingDraft';
import AttachmentsView from './AttachmentsView';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import PermissionJail from './../PermissionJail';
import {createEditFlag, deleteEditFlag} from './../../utilities';
import {finalStatus} from './../../constants';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetWorkingDraft = React.createClass({
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

		this.getFlux().actions.BudgetDetailActions.getWorkingDraft({
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

		createEditFlag(this.context.currentUser, this.getFlux(), 'workingDraftDetails', this.props.id, () => {

			/* If no errors: Turn on Edit Mode */

			this.getFlux().actions.BudgetDetailActions.getWorkingDraft({
				budgetCutId: this.props.id
			}, () => {

				this.setState({
					editMode: true
				})
			});

		})

	},
	render: function(){

		var {workingDraft} = this.state.BudgetDetailStore;
		var {status} = this.props;

		if(this.state.editMode){

			return (
				<div>
					<BudgetNewWorkingDraft
						workingDraft = {workingDraft}
						budgetCutId = {this.props.id}
						editMode = {this.state.editMode}
						onFinishEdit = {()=> {
							this.setState({
								editMode: false
							})

							deleteEditFlag(this.context.currentUser, this.getFlux(), 'workingDraftDetails', this.props.id)
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
		};

		var editLink = (status.toLowerCase() != finalStatus? <a className="link-edit link-edit-question" onClick = {this.onEdit}>Edit</a> : null);

		if(workingDraft.length){

			return (
				<div>
					<PermissionJail permission = 'canEditWorkingDraft'>
						{editLink}
					</PermissionJail>
					<h4>Working draft details</h4>
					<table className="docsflow-table docsflow-table-budget-item docsflow-table-budget-single">

						{workingDraft.map((q, idx) => {

							return (
								<tbody key = {idx}>
								<tr>
									<th>Draft details</th>
									<td>{q.details}</td>
								</tr>
								<tr>
									<th>Working draft within division/department</th>
									<td>
										<AttachmentsView attachments = {q.attachments} />
									</td>
								</tr>
								<tr>
									<th>Working draft available?</th>
									<td>{q.available? 'Yes': 'No'}</td>
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
					<hr className="rule" />
				</div>
			)
		}

		return (
			<PermissionJail permission = 'canEditWorkingDraft'>
				<div>
					<BudgetNewWorkingDraft
						budgetCutId = {this.props.id}
						onFinishEdit = { () => {
							deleteEditFlag(this.context.currentUser, this.getFlux(), 'workingDraftDetails', this.props.id)
						}}
					/>
					<hr className="rule" />
				</div>
			</PermissionJail>
		)
	}
});

module.exports = BudgetWorkingDraft;
