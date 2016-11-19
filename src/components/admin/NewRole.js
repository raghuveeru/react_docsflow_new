import React from 'react';
import {validationOptions} from './../../constants';
import {checkSelect2Valid} from './../../utilities';
import Select2 from '../Select2';
import InputMaterial from '../InputMaterial';

var NewRole = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var {selectedRole} = this.props;
		var {_permissions} = this.props;
		var _selectedPermissions = [];
		var editMode = selectedRole.id? true: false;
		if(editMode)
		{
			{selectedRole.permissions.map( (permission, idx) => {
					_selectedPermissions.push(parseInt(permission.id));
			})}
		}
		return {
			name: selectedRole.name || '',
			permissions: selectedRole.permissions || '',
			id: selectedRole.id || '',
			_permissions: _permissions || '',
			_selectedPermissions: _selectedPermissions
		}
	},
	onSave: function(event){

		var {selectedRole} = this.props;
		var editMode = !!selectedRole.id;

		if(this.$form.valid()){

			event && event.preventDefault();

			if(editMode){

				// Save group

				this.props.flux.actions.AdminActions.updateRole({
					name: this.state.name,
					permissions: this.state._selectedPermissions,
					id: this.state.id,
				}, () => {

					this.props.closeModal && this.props.closeModal.call(this)
				})

			}else{

				// New group

				this.props.flux.actions.AdminActions.createNewRole({
					name: this.state.name,
					permissions: this.state._selectedPermissions,
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
		var {
			selectedRole
		} = this.props;
		var editMode = selectedRole.id? true: false;
		if(editMode==false){
		this.setState({
			_selectedPermissions: []
		})
}
	},
	componentDidUpdate: function(){

	},

	isPermissionChecked: function(permissionId){

		var {_selectedPermissions} = this.state;
		var {selectedRole} = this.props;

		var editMode = selectedRole.id? true: false;

		return _selectedPermissions.indexOf(parseInt(permissionId)) != -1
	},
	addPermission: function(value, event){

		var permissions = _.clone(this.state._selectedPermissions);

		permissions.push(parseInt(value));

		this.setState({
			_selectedPermissions: permissions
		})

	},
	removePermission: function(value){

		var permissions = _.clone(this.state._selectedPermissions);

		permissions.splice(permissions.indexOf(parseInt(value)), 1);

		this.setState({
			_selectedPermissions: permissions
		})

	},
	renderPermissions: function(){
		var {_permissions} = this.state;
		return (
			<div className="docflow-form-control">
				<label>Select permissions</label>
				{_permissions.map( (permission, idx) => {

					return (
					<label className="label-checkbox label-block" key = {idx}>
						<input
							type="checkbox"
							name="permissions"
							value = {permission.id}
							onChange = {(event) => {

								var value = event.target.value;

								if(event.target.checked){
									this.addPermission(value, event)
								}else{
									this.removePermission(value, event)
								}
							}}
							checked = {this.isPermissionChecked(permission.id)}
							required = {true}
						/>&nbsp;&nbsp;
						{permission.name}
					</label>
					)
				})
			}
			</div>
		)
	},

	render: function(){

		var {
			selectedRole
		} = this.props;
		var editMode = selectedRole.id? true: false;
		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{editMode? 'Edit Role': 'Add Role'}
				</div>
				<form className="modal-dialog-body" ref="form">

					<InputMaterial
						label="Name"
						required = {true}

						defaultValue = {selectedRole.name}
						onChange = {(event) => {
							this.setState({
								name: event.target.value
							})
						}}
						/>

    			{this.renderPermissions()}

					<div className="docflow-form-control docsflow-submit-control">
						<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>Submit</button>
						<a onClick = {this.props.closeModal} className="docsflow-btn docsflow-btn--unstyled">Cancel</a>
					</div>
				</form>
			</div>
		)
	}
});

module.exports = NewRole;
