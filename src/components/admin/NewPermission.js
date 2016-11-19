import React from 'react';
import {validationOptions} from './../../constants';
import {checkSelect2Valid} from './../../utilities';
import Select2 from '../Select2';
import InputMaterial from '../InputMaterial';

var NewPermission = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var {selectedPermission} = this.props,
			users = []


		return {
			name: selectedPermission.name || '',
			description: selectedPermission.description || '',
			id: selectedPermission.id || '',
		}
	},
	onSave: function(event){

		var {selectedPermission} = this.props;
		var editMode = !!selectedPermission.id;

		if(this.$form.valid()){

			event && event.preventDefault();

			if(editMode){

				// Save group

				this.props.flux.actions.AdminActions.updatePermission({
					name: this.state.name,
					description: this.state.description,
					id: this.state.id,
				}, () => {

					this.props.closeModal && this.props.closeModal.call(this)
				})

			}else{

				// New group

				this.props.flux.actions.AdminActions.createNewPermission({
					name: this.state.name,
					description: this.state.description,
					id: this.state.id,
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
			selectedPermission
		} = this.props;

		var editMode = selectedPermission.id? true: false;

		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{editMode? 'Edit Permission': 'Add Permission'}
				</div>
				<form className="modal-dialog-body" ref="form">

					<InputMaterial
						label="Name"
						required = {true}

						defaultValue = {selectedPermission.name}
						onChange = {(event) => {
							this.setState({
								name: event.target.value
							})
						}}
						/>

            <InputMaterial
  						label="Description"
  						required = {true}

  						defaultValue = {selectedPermission.description}
  						onChange = {(event) => {
  							this.setState({
  								name: event.target.value
  							})
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

module.exports = NewPermission;
