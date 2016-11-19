import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import TextareaMaterial from '../TextareaMaterial';
import Fluxxor from 'fluxxor';
import Attachments from './Attachments';
import {emitNotification, createEditFlag, deleteEditFlag} from './../../utilities';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetNewWorkingDraft = React.createClass({
	mixins: [FluxMixin],
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){
		return {
			isOpen: this.props.editMode? true : false
		}
	},
	toggle: function(){

		if(!this.state.isOpen){

			createEditFlag(this.context.currentUser, this.getFlux(), 'workingDraftDetails', this.props.budgetCutId, () => {

				this.setState({
					isOpen: !this.state.isOpen
				})
			})
		}

	},
	cancelForm: function(){

		this.setState({
			isOpen: false
		})

		deleteEditFlag(this.context.currentUser, this.getFlux(), 'workingDraftDetails', this.props.budgetCutId)

		this.props.onCancelForm && this.props.onCancelForm.call(this)
	},
	componentDidMount: function(){

		var $form = $(this.refs.ajaxForm.getDOMNode());

		$form.on('submit', (e) => {

		    e.preventDefault();

		    $form.ajaxSubmit({
				dataType: 'json',
				success: (data) => {

					if(data.errors){

						var errs = data.errors.map((data) => data.error);

						/* Emit error notification */

						emitNotification('error', this.getFlux(), errs.join('<br />'))

					}else{

						/* Emit success notification */

						emitNotification('success', this.getFlux(), this.props.editMode? 'Working draft details successfully updated.' : 'Working draft details successfull added.');

						this.getFlux().actions.BudgetDetailActions.addWorkingDraft(data);

						this.getFlux().actions.BudgetActions.getBudgetActivity(this.props.budgetCutId);

						this.props.onFinishEdit && this.props.onFinishEdit.call(this)

					}

				},
				error: (data) => {

					/* Emit error notification */

					emitNotification('error', this.getFlux(), data.responseText)
				}

			})
		})
	},
	render: function(){

		var {isOpen} = this.state;
		var {editMode, workingDraft} = this.props;
		var sectionClass = 'docsflow-section-form' + (isOpen? '' : ' js-hide');
		var link = !isOpen? <a className="link-add" onClick = {this.toggle}>Add working draft details </a>: null;
		var currentDraft = {
			attachments: []
		};
		var heading = editMode? 'Edit working draft details': 'Add working draft details';

		var url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_WORKING_DRAFT;
		if(editMode) {
			currentDraft = workingDraft[0];
			url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EDIT_WORKING_DRAFT;
		}

		return (
			<form className="formBudgetDetails" data-message = "Working draft details" ref="ajaxForm" method = 'post' action = {url}>
				{link}

				<input type = "hidden" name="userId" value = {this.context.currentUser.id} />
				<input type = "hidden" name="budgetCutId" value = {this.props.budgetCutId} />

				<div className={sectionClass}>
					<h4>{heading}</h4>

					<InputFileMaterial
						name="attachments"
					 />

					<Attachments attachments = {currentDraft.attachments} budgetCutId = {this.props.budgetCutId} type = 'workingDraftDetails' />

					<TextareaMaterial
					 	label="Draft details"
					 	name="details"
					 	defaultValue = {currentDraft.details}
					 	rows = {1}
					 />

					<div className="docflow-form-control docsflow-submit-control">
						<button className="docsflow-btn docsflow-btn-primary">Save</button>
						<a className="docsflow-btn docsflow-btn--unstyled docsflow-btn-cancel" onClick = {this.cancelForm}>Cancel</a>
					</div>
				</div>
			</form>
		)
	}
});

module.exports = BudgetNewWorkingDraft;
