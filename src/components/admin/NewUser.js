import React from 'react';
import Select2 from '../Select2';
import InputMaterial from '../InputMaterial';
import {mapObject} from './../../utilities';
import {validationOptions} from './../../constants';
import _ from 'lodash';

var USER_GROUPS = AppConfig.ROLES;
var DEPARTMENTS = AppConfig.DEPARTMENTS;

var NewUser = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		var {selectedUser} = this.props;

		return {
			type: selectedUser.type || 'user',
			name: selectedUser.name || '',
			department: selectedUser.department || '',
			roles: selectedUser.role || [],
			id: selectedUser.id || null,
		}
	},
	onSave: function(event){

		var {selectedUser} = this.props;
		var editMode = !!selectedUser.name;

		if(this.$form.valid()){

			event && event.preventDefault();

			var {
				type,
				name,
				memberOfParliament,
				hodDrafting,
				roles,
				department,
				id
				} = this.state,
				params = {};

			var {selectedUser} = this.props;

			switch(type){
				case 'user':
					params = {
						id: id,
						type: type,
						userId: this.context.currentUser.id,
						roles: roles,
						department: department
					}
					break;

				case 'mp':
					params = {
						name: name,
						type: type,
						userId: this.context.currentUser.id
					}

					if(editMode){
						params = jQuery.extend({}, params, {id: id})
					}
					break;
			}

			/**
			 * Check if its in edit mode
			 */

			if(editMode){

				var _params = jQuery.extend({}, params, {id: id});

				this.props.flux.actions.AdminActions.updateUser(_params, () => {

					this.props.closeModal && this.props.closeModal.call(this)
				})

			}else{

				this.props.flux.actions.AdminActions.addUser(params, () => {

					this.props.closeModal && this.props.closeModal.call(this)
				})
			}
		}

	},
	componentDidMount: function(){

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);

	},
	checkSelect2Valid: function(e){

		if(!e) return;
		var $ele = $(e.target);

		return $ele.valid();
	},
	isRoleChecked: function(roleId){

		var {roles} = this.state;

		return roles.indexOf(roleId) != -1
	},
	addRole: function(value, event){

		var roles = _.clone(this.state.roles);

		roles.push(parseInt(value));

		this.setState({
			roles: roles
		})

	},
	removeRole: function(value){

		var roles = _.clone(this.state.roles);

		roles.splice(roles.indexOf(parseInt(value)), 1);

		this.setState({
			roles: roles
		})

	},
	render: function(){

		var {type} = this.state;

		var {selectedUser} = this.props;

		var editMode = selectedUser.name? true: false;

		var formContent = null;

		switch(type){
			case 'user':
				formContent = this.renderUsers();
				break;

			case 'mp':
				formContent = this.renderMps();
				break;
		}

		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{editMode? 'Edit user': 'Add user'}
				</div>
				<form className="modal-dialog-body" ref="form">

					<Select2
						value = {selectedUser.type || 'user'}
						placeholder="Select user type"
						className = 'select2-flushtop'
						disabled = {editMode}
						onChange = {(val) => {

							this.setState({
								type: val
							})
						}}
						>
						<option></option>
						<option value = 'user'>MOM Officer</option>
						<option value = 'mp'>MP</option>
					</Select2>

					{formContent}

					<div className="docflow-form-control docsflow-submit-control">
						<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>Submit</button>
						<a onClick = {this.props.closeModal} className="docsflow-btn docsflow-btn--unstyled">Cancel</a>
					</div>

				</form>
			</div>
		)
	},
	renderUsers: function(){

		var {selectedUser} = this.props;

		return (
			<div>

				<div className="docflow-form-control">
					<Select2
						placeholder="Select department"
						required = {true}
						value = {selectedUser.department}
						disabled = {!!selectedUser.department}
						onChange = {(val, data, event) =>{
							this.setState({
								department: val
							})

							this.checkSelect2Valid(event);
						}}
					>
					<option></option>
					{DEPARTMENTS.map( (dept, idx) => {
						return <option key = {idx}>{dept}</option>
					})}
					</Select2>
				</div>

				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS}
					placeholder= 'Enter name or email address...'
					defaultValue = {selectedUser}
					disabled = {!!selectedUser.name}
					required = {true}
					query = {{'department': this.state.department}}
					name="email"
					onChange = { (val, data, event) => {

						this.setState({
							id: val
						})

						this.checkSelect2Valid(event);

					}}
					formatResult = {(result) => {
						return '<div>' + result.name + '<br /><small>' + result.email + '</small></div>'
					}}
				/>

				{this.renderRoles()}

			</div>)
	},
	renderMps: function(){

		var {selectedUser} = this.props;

		return (
			<div>
				<InputMaterial
					label="Name"
					required = {true}
					defaultValue = {selectedUser.name}
					onChange = {(event) => {
						this.setState({
							name: event.target.value
						})
					}}
					/>
			</div>
		)
	},
	renderRoles: function(){

		return (
			<div className="docflow-form-control">
				<label>Select user group</label>
				{USER_GROUPS.map( (group, idx) => {

					return (
					<label className="label-checkbox label-block" key = {idx}>
						<input
							type="checkbox"
							name="groups"
							value = {group.id}
							onChange = {(event) => {

								var value = event.target.value;

								if(event.target.checked){
									this.addRole(value, event)
								}else{
									this.removeRole(value, event)
								}
							}}
							checked = {this.isRoleChecked(group.id)}
							required = {true}
						/>
						{group.name}
					</label>
					)
				})}
			</div>
		)
	}
});


module.exports = NewUser
