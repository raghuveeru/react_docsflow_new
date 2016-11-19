import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewUser from './NewUser';
import {customStyles} from '../../constants';
import {getUserRoleName} from './../../utilities';
import Select2 from '../Select2';
import _ from 'lodash';

var Users = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	contextTypes: {
		currentUser: React.PropTypes.object,
		router: React.PropTypes.func
	},
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isUserModalOpen: false,
			selectedUser: {},
			roleToFilter: ''
		}
	},
	componentDidMount: function(){
		this.props.flux.actions.AdminActions.getUsersAdmin();
		this.props.flux.actions.AdminActions.getAllRoles();
		this.props.flux.actions.AdminActions.getAllDepartments();
	},
	closeModal: function(){

		this.setState({
			isUserModalOpen: false
		})
	},
	openUserModal: function(event){

		event && event.stopPropagation();

		this.setState({
			selectedUser: {},
			isUserModalOpen: true
		})
	},
	deleteUser: function(userId, type, event){

		event && event.preventDefault();

		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deleteUser({
				id: userId,
				type: type,
				userId: this.context.currentUser.id
			})
		}

	},
	editUser: function(userId, type, event){

		this.props.flux.actions.AdminActions.getUserById({
			id: userId,
			type: type
		}, (response) => {

			var _user = response.data[0];

			this.setState({
				selectedUser: _user,
				isUserModalOpen: true
			})
		})

	},
	render: function(){

		var {isUserModalOpen, selectedUser, roleToFilter} = this.state;
		var {users} = this.state.AdminStore;
		var {roles} = this.state.AdminStore;
		var {departments} = this.state.AdminStore;
		var _userList = _.clone(this.users);
		var _roleList = _.clone(this.roles);
		var _departmentList = _.clone(this.departments);

		if(roleToFilter){
					users = users.filter( (user) => {

						var _role = user.role || [];

						if(typeof _role != 'object') _role = [_role];

						return _role.indexOf(parseInt(roleToFilter)) != -1
					});
		}

		return (
			<div>
				<a className="docsflow-card-link" onClick = {this.openUserModal}><em className='fa fa-plus' />Add user</a>
				<Select2
					className="topic-select-year"
					placeholder="Filter by role"
					onChange = { (val) => {

						this.setState({
							roleToFilter: val
						});

					}}
				>
					<option value = ''>All</option>
					<option value = 'mp'>Member of Parliament</option>
					{roles.map( (role, idx) => {

						return <option key = {idx} value = {role.id}>{role.name}</option>
					})}
				</Select2>
				<Modal
					isOpen = {isUserModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewUser {...this.props} closeModal = {this.closeModal} selectedUser = {selectedUser} />
				</Modal>
				<table className="docsflow-table docsflow-table-admin">
					<thead>
						<tr>
							<th colSpan="2">User details</th>
							<th>Department</th>
							<th>Roles </th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, idx) => {

							var deleteFn = this.deleteUser.bind(this, user.id, user.type || 'user');

							var editFn = this.editUser.bind(this, user.id, user.type || 'user');

							return (
								<tr key = {idx}>
									<td className="cell-image">
										<img src={user.image} style = {{width: 40}} />
									</td>
									<td>
										{user.name}
										<span className="user-role-designation">{user.designation}</span>
									</td>
									<td>
										{user.department}
									</td>
									<td>
										{getUserRoleName(user.role, roles)}
									</td>
									<td className="cell-actions">

										<a className="link-edit" onClick = {editFn}>Edit</a>
										<a className="link-delete" onClick = {deleteFn}>Delete</a>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
});


module.exports = Users
