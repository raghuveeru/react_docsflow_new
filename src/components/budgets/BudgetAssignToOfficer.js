import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject, t, filterStatus} from './../../utilities';
import {validationOptions} from './../../constants';
import Select2 from '../Select2';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React);

var BudgetAssignToOfficer = React.createClass({
	mixins: [FluxMixin],
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var { budget } = this.props;

		var officersToNotify = budget.liasonOfficer.map( (item) => item.id)

		return {
			responsibleOfficer: [],
			officersToNotify: officersToNotify || [],
			message: '',
			subject: '',
			budgetCutId: this.props.id,
			userId: this.context.currentUser.id,
			status: ''
		}
	},
	onSave: function(event){

		var $formBudgetDetails = $('.formBudgetDetails').find('.docsflow-section-form').not('.js-hide'),
			budgetMessages = [],
			budgetMessagesObj = []

		if(this.$form.valid()){

			event && event.preventDefault();

			if($formBudgetDetails.length){

				$formBudgetDetails.each( (idx, el) => {
					var _el = $(el).closest('.formBudgetDetails')[0];
					budgetMessages.push( _el.getAttribute('data-message'))
					budgetMessagesObj.push(_el)
				});

				if(
					confirm('You are editing ' + budgetMessages.join(', ') + '. \n\nClick OK to continue editing. \nClick Cancel to discard.')
				){

					$('html, body').animate({
						scrollTop: $(budgetMessagesObj[0]).offset().top
					}, 400)

					return;
				}
			}

			this.getFlux().actions.BudgetActions.assignToOfficer(this.state, () => {

				window.location.reload()

				// this.getFlux().actions.BudgetActions.getBudgetActivity(this.props.id)

				// this.setState({
				// 	responsibleOfficer: [],
				// 	message: '',
				// })
			});
		}
	},
	updateSubject: function( props ){

		var currentProps = props? props : this.props;
		var {memberOfParliament} = currentProps.budget;
		var mp = memberOfParliament?  memberOfParliament.name : '';

		var {status} = this.state;

		var sub = t(AppConfig.SUBJECT_TEMPLATE, {
			topic: this.props.budget.title,
			mp: mp,
			status: status? status + ' - ': ''
		});

		this.setState({
			subject: sub
		})
	},
	componentDidMount: function(){

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);

		this.updateSubject();

	},
	componentWillReceiveProps(nextProps){
		var { memberOfParliament } = nextProps.budget;

		if(!memberOfParliament) return;

		if(this.props.budget.memberOfParliament != memberOfParliament) this.updateSubject( nextProps )
	},
	checkSelect2Valid: function(e){

		if(!e) return;

		if(this.$form.data('validator') == null) return;

		var $ele = $(e.target);

		return $ele.valid();

	},
	render: function(){

		var {budget} = this.props;

		return (
			<form ref="form" className="assign-form">
				<h4>Assign to officer</h4>

				<Select2
					placeholder="Select status"
					label = 'Select action'
					value = {this.state.status}
					allowClear = {true}
					onChange = { (val, data, event) => {

						this.setState({
							status: val
						}, this.updateSubject)
					}} >
					<option></option>
					{AppConfig.STATUS_MAPPING.map((status, idx) => {
						return <option key = {idx}>{status.name}</option>
					})}
				</Select2>

				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_RESPONSIBLE_OFFICERS}
					required = {true}
					placeholder= 'To'
					multiple = {true}
					name="responsibleOfficer"
					query = {{groups: 'true'}}
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event)

						this.setState({
							responsibleOfficer: val
						})
					}}
				/>

				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_OFFICERS_TO_NOTIFY}
					placeholder= 'CC'
					multiple = {true}
					required = {false}
					query = {{groups: 'true'}}
					name="officersToNotify"
					defaultValue = {budget.liasonOfficer || budget.liaisonOfficer}
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event)

						this.setState({
							officersToNotify: val
						})
					}}
				/>

				<TextareaMaterial
					required = {true}
					label="Subject"
					name="subject"
					value = {this.state.subject}
					readOnly = {true}
					rows = {1}
					/>

				<TextareaMaterial
					label="Message"
					required = {true}
					name="message"
					rows = {1} onChange = { (event) => {
					this.setState({
						message: event.target.value
					})
				}} />

				<div className="docflow-form-control docsflow-submit-control">
					<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>Submit</button>
					<a className="docsflow-btn docsflow-btn--unstyled">Cancel</a>
				</div>
			</form>
		)
	}
});

module.exports = BudgetAssignToOfficer;
