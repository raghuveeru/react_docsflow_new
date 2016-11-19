import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import { arrayJoin } from './../../utilities';
import {customStyles} from '../../constants';
import Modal from 'react-modal';
import NewRole from './NewRole';

var Roles = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	contextTypes: {
		currentUser: React.PropTypes.object,
		router: React.PropTypes.func
	},
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isModalOpen: false,
			selectedRole: {}
		}
	},
	componentDidMount: function(){

		this.props.flux.actions.AdminActions.getAllRoles();
		this.props.flux.actions.AdminActions.getAllPermissions();

	},
	openGroupModal: function(){

		this.setState({
			isModalOpen: true
		})
	},
	closeModal: function(){

		this.setState({
			isModalOpen: false,
			selectedRole: {}
		})
	},
	editRole: function(role, event){

		this.setState({
			selectedRole: role,
			isModalOpen: true
		})
	},
	deleteRole: function(id, event){

		event && event.preventDefault();

		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deleteRole({
				id: id,
				userId: this.context.currentUser.id
			})
		}

	},
	render: function(){

		var {roles} = this.state.AdminStore;
		var {permissions} = this.state.AdminStore;
		var {
			isModalOpen,
			selectedRole
		} = this.state;

		for(var j=0;j<roles.length;j++)
		{
			var _permissions = '';

		for (var i=0;i<roles[j].permissions.length;i++)
		{
			if(i<roles[j].permissions.length-1){
			_permissions+=roles[j].permissions[i].name + ",";
		}
			else {
				_permissions+=roles[j].permissions[i].name;
			}

		}
		roles[j].permissionList=_permissions;
	}
		return (
			<div>
				<a className="docsflow-card-link" onClick = {this.openGroupModal}><em className='fa fa-plus' />Add New Role</a>
				<Modal
					isOpen = {isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewRole {...this.props} closeModal = {this.closeModal} selectedRole = {selectedRole} _permissions = {permissions} />
				</Modal>
				<table className="docsflow-table docsflow-table-admin">
					<thead>
						<tr>
							<th>Name</th>
							<th>Permissions</th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
					
						{roles.map( (selectedRole, idx) => {

							var editFn = this.editRole.bind(this, selectedRole)
							var deleteFn = this.deleteRole.bind(this, selectedRole.id)

							return (
								<tr key = {idx}>
									<td>{selectedRole.name}</td>
									<td className = "docsflow-wordbreak">
										{selectedRole.permissionList}
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

module.exports = Roles;
