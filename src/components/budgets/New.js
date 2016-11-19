import React from 'react';
import InputMaterial from '../InputMaterial';
import Select2 from './../Select2';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject, t, checkForPermission, checkSelect2Valid} from './../../utilities';
import {validationOptions} from './../../constants';
import {Link} from 'react-router';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import RichTextEditor from '.././RichTextEditor';
var FluxMixin = Fluxxor.FluxMixin(React);

var defaultStatus = AppConfig.STATUS_MAPPING.filter( (status) => status.defaultStatus).map( (item) => item.name)

var BudgetNew = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.getFlux().store('BudgetStore').getState()
		}
	},
	contextTypes: {
		router: React.PropTypes.func,
		currentUser: React.PropTypes.object
	},
	goBack: function(){
		this.context.router.transitionTo('budgetsInbox', {type: 'inbox'})
	},
	getInitialState: function(){

		return {
			topicId: '',
			budgetCutId: '',
			budgetCutTopic: [],
			budgetCutTopicName: '',
			memberOfParliament:'',
			memberOfParliamentName: '',
			hodSourcing: '',
			hodOfficers: [],
			fileReferenceNo: '',
			summary: '',
			time: '',
			status: defaultStatus[0],
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			userId: this.context.currentUser.id,
			subject: '',
			template: ''
		}
	},
	draft: function(event){

		if(this.props.params.id) return this.update(event)

		if(this.$form.valid()){

			event && event.preventDefault();

			var data = this.getData();

			this.props.flux.actions.BudgetActions.createNew(data, (response) => {

				var res = response.data[0];

				if(!res || !res.id){
					throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
				}
				this.context.router.transitionTo('budgetsView', {'id': res.id})
			})
		}
	},
	create: function(event){

		if(this.props.params.id) return this.update(event)

		if(this.$form.valid()){

			event && event.preventDefault();

			var data = this.getData();
			data.template = encodeURIComponent($(".summernote").summernote("code"));
			this.props.flux.actions.BudgetActions.createNew(data, (response) => {

				var res = response.data[0];

				if(!res || !res.id){
					throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
				}
				this.context.router.transitionTo('budgetsView', {'id': res.id})
			})
		}
	},
	getData: function(){

		return {
			topicId: this.state.topicId,
			budgetCutId: this.state.budgetCutId,
			memberOfParliament: this.state.memberOfParliament,
			hodSourcing: this.state.hodSourcing,
			fileReferenceNo: this.state.fileReferenceNo,
			summary: this.state.summary,
			time: this.state.time,
			responsibleOfficer: this.state.responsibleOfficer,
			officersToNotify: this.state.officersToNotify,
			message: this.state.message,
			userId: this.context.currentUser.id,
			subject: this.state.subject,
			status: this.state.status,
			template: this.state.template
		}
	},
	update: function(event){

		event && event.preventDefault();

		if(this.$form.valid()){

			var {currentBudget} = this.state.BudgetStore;

			var data = {
				id: currentBudget.id,
				topicId: this.state.topicId || currentBudget.topic.id,
				budgetCutId: this.state.budgetCutId || currentBudget.budgetCutTopic.id,
				memberOfParliament: this.state.memberOfParliament || currentBudget.memberOfParliament.id,
				hodSourcing: this.state.hodSourcing || currentBudget.hodSourcing.id,
				fileReferenceNo: this.state.fileReferenceNo || currentBudget.fileReferenceNo,
				summary: this.state.summary || currentBudget.summary,
				time: this.state.time || currentBudget.time,
				userId: this.context.currentUser.id
			}


			this.props.flux.actions.BudgetActions.updateBudgetCut(data, (response) => {

				var res = response.data[0];

				if(!res || !res.id){
					throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
				}
				this.context.router.transitionTo('budgetsView', {'id': res.id})
			})



		}
	},
	updateSubject: function(){

		var {status} = this.state;

		var sub = t(AppConfig.SUBJECT_TEMPLATE, {
			status: status? status + ' - ': '',
			topic: this.state.budgetCutTopicName,
			mp: this.state.memberOfParliamentName
		});

		this.setState({
			subject: sub
		})
	},
	componentDidUpdate: function(nextProps, nextState){

		var {currentBudget} = this.state.BudgetStore;

		if(this.props.params.id && currentBudget.id){
			this.$form = $(this.refs.form.getDOMNode());

			this.$form.validate(validationOptions);
		}
	},
	componentDidMount: function(){



		if(!this.props.params.id){

			this.$form = $(this.refs.form.getDOMNode());

			this.$form.validate(validationOptions);
		}

		/**
		 * Check if its in editMode
		 */

		if(this.props.params.id){

			/**
			 * Check if the user has permission
			 */

			if(!checkForPermission(this.context.currentUser, 'canEditDeleteBudgetCut')){

				this.context.router.transitionTo('budgets')
			}


			/**
			 * Get Budget cut
			 */

			this.getFlux().actions.BudgetActions.getBudgetById({
				id: this.props.params.id
			})

			var {currentBudget} = this.state.BudgetStore;
			var _template = decodeURIComponent(currentBudget.template);
			$(".summernote").summernote("code",_template);
		}

	},
	render: function(){
		var {currentBudget} = this.state.BudgetStore;
		var isEditMode = !!this.props.params.id;

		if(!isEditMode) currentBudget = {};

		//var AssignTo = !isEditMode? this.renderAssignToOfficer() : null;
		var buttonTitle = !isEditMode? 'Submit': 'Submit';
		var title = !isEditMode? TRANSLATIONS.new : TRANSLATIONS.edit;

		/* Handle for edit and no Id */

		if(isEditMode && !currentBudget.id) return null;

		return (
			<form ref="form">
				<nav className="nav-crumb">
					<Link to = "home">
						<em className="fa fa-home" />
					</Link>
				</nav>
				<h1>{title}</h1>
				<div className="docsflow-sp-card">
					<div className="docsflow-card-body">

						<Select2
							url = {AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_MAIN_TOPICS}
							required = {true}
							placeholder= 'Subject'
							name="selectTitle"
							multiple = {false}
							defaultValue = {currentBudget.topic}
							onChange = { (val, data, event) => {

								var bcTopic = data.budgetCutTopic;
								var _template = decodeURIComponent(data.template);
								$(".summernote").summernote("code",_template);
								checkSelect2Valid(event);

								this.setState({
									topicId: val,
									budgetCutTopic: bcTopic,
									template: _template
								})
							}}
						/>
					  <br/>
						<br/>
						<div className="row">
							<div className="columns two">
							<RichTextEditor
							required = {true}
							name="template"
							width="800px"
							defaultValue = {currentBudget.template}
							/>
							</div>

						</div>

						<div className="row">
							<div className="columns three">
								<TextareaMaterial
									rows = {1}
									required = {true}
									name="discription"
									label = "Discription"
									defaultValue = {currentBudget.summary}
									onChange = {
										(event) => {

											this.setState({
												summary: event.target.value
											})
										}
									}
								/>
							</div>
						</div>

						<div className="docflow-form-control">
							<button className="docsflow-btn docsflow-btn-primary" onClick = {this.draft}>Save as Draft</button>
							<button className="docsflow-btn docsflow-btn-primary" onClick = {this.create}>{buttonTitle}</button>
							<a className="docsflow-btn docsflow-btn--unstyled" onClick = {() =>{

								if(isEditMode){
									return this.context.router.transitionTo('budgetsView', {id: currentBudget.id})
								}

								this.context.router.transitionTo('budgets')

							}}>Cancel</a>
						</div>

					</div>
				</div>
			</form>
		)
	}
})

module.exports = BudgetNew
