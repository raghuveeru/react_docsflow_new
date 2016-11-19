import React from 'react';
import {validationOptions} from './../../constants';
import {checkSelect2Valid} from './../../utilities';
import Select2 from '../Select2';
import InputMaterial from '../InputMaterial';

var NewGroup = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var {selectedGroup} = this.props,
			users = []

		if(selectedGroup.users){
			users = selectedGroup.users.map( (user) => user.id)
		}

		return {
			name: selectedGroup.name || '',
			users: users || '',
			id: selectedGroup.id || '',
		}
	},
	onSave: function(event){

		var {selectedGroup} = this.props;
		var editMode = !!selectedGroup.id;

		if(this.$form.valid()){

			event && event.preventDefault();

			if(editMode){

				// Save group

				this.props.flux.actions.AdminActions.editGroup({
					name: this.state.name,
					users: this.state.users,
					id: this.state.id,
					userId: this.context.currentUser.id
				}, () => {

					this.props.closeModal && this.props.closeModal.call(this)
				})

			}else{

				// New group

				this.props.flux.actions.AdminActions.createNewGroup({
					name: this.state.name,
					users: this.state.users,
					userId: this.context.currentUser.id
				}, () => {

					this.props.closeModal && this.props.closeModal.call(this)
				})
			}
		}

	},
	componentDidMount: function(){

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);

	},
	render: function(){

		var {
			selectedGroup
		} = this.props;

		var editMode = selectedGroup.id? true: false;

		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{editMode? 'Edit email group': 'Add email group'}
				</div>
				<form className="modal-dialog-body" ref="form">

					<InputMaterial
						label="Name"
						required = {true}

						defaultValue = {selectedGroup.name}
						onChange = {(event) => {
							this.setState({
								name: event.target.value
							})
						}}
						/>

					<Select2
						url = {AppConfig.API.BASE_URL + AppConfig.API.GROUPS.GET_ALL_USERS}
						placeholder= 'Enter name or email address...'
						defaultValue = {selectedGroup.users}
						required = {true}
						name="users"
						multiple = {true}
						onChange = { (val, data, event) => {

							this.setState({
								users: val
							})

							checkSelect2Valid(event);

						}}
						formatResult = {(result) => {
							return '<div>' + result.name + '<br /><small>' + result.email + '</small></div>'
						}}
					/>


					<div className="docflow-form-control docsflow-submit-control">
						<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>Submit</button>
						<a onClick = {this.props.closeModal} className="docsflow-btn docsflow-btn--unstyled">Cancel</a>
					</div>
				</form>
			</div>
		)
	}
});

module.exports = NewGroup;
