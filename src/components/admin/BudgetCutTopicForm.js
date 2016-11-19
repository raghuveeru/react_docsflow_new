import React from 'react';
import InputMaterial from '../InputMaterial';
import {validationOptions} from './../../constants';

var BudgetCutTopicForm = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var {budgetCutTopic} = this.props;

		return {
			budgetCutTopicName: budgetCutTopic? budgetCutTopic.name : ''
		}
	},
	getDefaultProps: function(){

		return {
			budgetCutTopic: null,
			buttonTitle: TRANSLATIONS.add
		}
	},
	onSave: function(event){

		if(this.$form.valid()){

			event && event.preventDefault();

			var {budgetCutTopic, topic} = this.props;

			if(budgetCutTopic){
				// Edit form

				this.props.flux.actions.AdminActions.editBudgetCutTopic({
					name: this.state.budgetCutTopicName,
					topicId: topic.id,
					id: budgetCutTopic.id,
					userId: this.context.currentUser.id
				}, this.finishSaveAndEdit)

			}else{

				this.props.flux.actions.AdminActions.createBudgetCutTopic({
					name: this.state.budgetCutTopicName,
					topicId: topic.id,
					userId: this.context.currentUser.id
				}, this.finishSaveAndEdit)
			}



		}

	},
	finishSaveAndEdit: function(){

		this.setState({
			budgetCutTopicName: ''
		});

		this.props.toggleAdd.call(this)
	},
	componentDidMount: function(){
		this.refs.firstInput.getDOMNode().getElementsByTagName('input')[0].focus()

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);
	},
	render: function(){

		return (
			<form className="docsflow-section-form" ref = "form" onSub>
				<InputMaterial
					label={TRANSLATIONS.label_name}
					name="topicName"
					ref = "firstInput"
					value = {this.state.budgetCutTopicName}
					required = {true}
					onChange = { (event)=> {
						this.setState({
							budgetCutTopicName: event.target.value
						})
					}}
				/>

				<div className="docflow-form-control docsflow-submit-control">
					<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>{this.props.buttonTitle}</button>
					<a className="docsflow-btn docsflow-btn--unstyled" onClick = {this.props.toggleAdd}>Cancel</a>
				</div>
			</form>
		)
	}
});

module.exports = BudgetCutTopicForm;
