import React from 'react';
import BudgetNewQuestion from './BudgetNewQuestion';
import AttachmentsView from './AttachmentsView';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import PermissionJail from './../PermissionJail';
import {arrayJoin, createEditFlag, deleteEditFlag, emitNotification} from './../../utilities';
import {finalStatus} from './../../constants';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetQuestions = React.createClass({
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

		this.getFlux().actions.BudgetDetailActions.getQuestion({
			budgetCutId: this.props.id
		})
	},
	componentDidMount: function(){

		this.getData()

	},
	componentDidUpdate: function(prevProps){

		if(prevProps.id != this.props.id) this.getData()
	},
	onEdit: function(){

		/**
		 * Create an edit flag
		 */

		createEditFlag(this.context.currentUser, this.getFlux(), 'questionDetails', this.props.id, () => {

			/* If no errors: Turn on Edit Mode */

			this.getFlux().actions.BudgetDetailActions.getQuestion({
				budgetCutId: this.props.id
			}, () => {

				this.setState({
					editMode: true
				})
			});

		})

	},
	render: function(){

		var {question} = this.state.BudgetDetailStore;
		var {status} = this.props;


		if(this.state.editMode){

			return (
				<div>
					<BudgetNewQuestion
						question = {question}
						editMode = {this.state.editMode}
						budgetCutId = {this.props.id}
						onCancelForm = {()=> {
							this.setState({
								editMode: false
							})
						}}
						onFinishEdit = {()=> {
							this.setState({
								editMode: false
							})

							deleteEditFlag(this.context.currentUser, this.getFlux(), 'questionDetails', this.props.id)
						}}
					/>
					<hr className="rule" />
				</div>
			)
		};

		var editLink = (status.toLowerCase() != finalStatus? <a className="link-edit link-edit-question" onClick = {this.onEdit}>Edit</a> : null)

		if(question.length){

			return (
				<div>
					<PermissionJail permission="canEditQuestionDetails">
						{editLink}
					</PermissionJail>
					<h4>Question details</h4>
					<table className="docsflow-table docsflow-table-budget-item docsflow-table-budget-single">

						{question.map((q,idx) => {

							return (
								<tbody key = {idx}>
								<tr>
									<th>Details of question sourced</th>
									<td>{q.details}</td>
								</tr>
								<tr>
									<th>Attachment</th>
									<td>
										<AttachmentsView attachments = {q.attachments} />
									</td>
								</tr>
								<tr>
									<th>HOD drafting reply</th>
									<td>{q.hodDrafting.name}</td>
								</tr>
								<tr>
									<th>Liaison officer</th>
									<td>{arrayJoin(q.liasonOfficer, 'name')}</td>
								</tr>
								<tr>
									<th>Drafting officer</th>
									<td>{arrayJoin(q.draftingOfficer, 'name')}</td>
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
			<PermissionJail permission="canEditQuestionDetails">
			<div>
				<BudgetNewQuestion
					budgetCutId = {this.props.id}
					onFinishEdit = { () => {
						deleteEditFlag(this.context.currentUser, this.getFlux(), 'questionDetails', this.props.id)
					}} />
				<hr className="rule" />
			</div>
			</PermissionJail>
		)
	}
});

module.exports = BudgetQuestions;
