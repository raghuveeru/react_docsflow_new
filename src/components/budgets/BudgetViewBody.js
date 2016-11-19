import React from 'react';
import BudgetQuestions from './BudgetQuestions';
import BudgetWorkingDraft from './BudgetWorkingDraft';
import BudgetFinalApprovedReply from './BudgetFinalApprovedReply';
import BudgetAssignToOfficer from './BudgetAssignToOfficer';
import {getStatusName, isSpeech} from './../../utilities';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import Loader from './../Loader';
import {Link} from 'react-router';
import PermissionJail from './../PermissionJail';
import {finalStatus} from './../../constants';
import RichTextEditor from '.././RichTextEditor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetViewBody = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	contextTypes: {
		router: React.PropTypes.func
	},
	getStateFromFlux: function(){

		return {
			BudgetStore: this.getFlux().store('BudgetStore').getState()
		}
	},
	componentWillUnmount: function() {
	},
	componentDidMount: function(){
		this.getData();
	},
	getData: function(){
		this.getFlux().actions.BudgetActions.getBudgetById({
			id: this.props.id
		})
	},
	componentDidUpdate: function(prevProps){
		if(prevProps.id != this.props.id) this.getData();
		var {currentBudget} = this.state.BudgetStore;
		var _template = decodeURIComponent(currentBudget.template);
			$(".summernote").summernote("destroy");
		$(".summernote").summernote("code",_template);
			$(".panel-heading").attr("style","display:none");
			$(".note-editable").removeAttr("contenteditable");
			$(".note-editable").attr("style", "width:500px");
	},
	handleDelete: function(){

		if(confirm('Are you sure you want to delete?')){
			this.getFlux().actions.BudgetActions.deleteBudgetCut({
				id: this.props.id
			}, (response) => {

				if(response.success){

					this.context.router.transitionTo('budgets')
				}

			})
		}
	},
	render: function(){
		var {currentBudget} = this.state.BudgetStore;

		if(!Object.keys(currentBudget).length) return <Loader />;


		var budgetEditActions = !isSpeech(currentBudget.status)?(
			<nav className="budget-cut-actions">
				<Link to = 'budgetsEdit' params ={{id: currentBudget.id}} className="link-edit">Edit</Link>
				<a className="link-delete" onClick = {this.handleDelete}>Delete</a>
			</nav>
		) : null;

		var statusText = (currentBudget.status.toLowerCase() == finalStatus)? <span className="budget-item-status budget-item-status-view" style = {{backgroundColor: getStatusName(currentBudget.status).color}}>{getStatusName(currentBudget.status).name}</span> : null;

		return (
			<div className="docsflow-sp-card sp-budget-card">
				<div className="docsflow-card-body">
					{statusText}

					<PermissionJail permission="canEditDeleteBudgetCut">
						{budgetEditActions}
					</PermissionJail>
					<table className="docsflow-table docsflow-table-budget-item docsflow-table-budget-single">
							<tbody>
								<tr>
									<th>Subject</th>
									<td>{currentBudget.title}</td>
								</tr>
								<tr>
									<th>template</th>
									<td>
									<RichTextEditor
										required = {true}
										name="template"
										readOnly="true"
										width="500px"
										defaultValue = {currentBudget.template}
										/></td>
								</tr>
								<tr>
									<th>description</th>
									<td>{currentBudget.summary}</td>
								</tr>
							</tbody>
					</table>
				</div>
				<div className="docflow-form-control">
					<button className="docsflow-btn docsflow-btn-primary" onClick = {this.Approve}>Approve</button>
					<button className="docsflow-btn docsflow-btn-primary" onClick = {this.create}>Reject</button>
					<button className="docsflow-btn docsflow-btn-primary" onClick = {this.create}>Revert</button>
					<a className="docsflow-btn docsflow-btn--unstyled" onClick = {() =>{

						this.context.router.transitionTo('budgets')

					}}>Cancel</a>
				</div>

			</div>
		)
	}
});

module.exports = BudgetViewBody
