import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import { arrayJoin } from './../../utilities';
import {customStyles} from '../../constants';
import Modal from 'react-modal';
import NewPermission from './NewPermission';

var Permissions = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	contextTypes: {
		currentUser: React.PropTypes.object,
		router: React.PropTypes.func
	},
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isModalOpen: false,
			selectedPermission: {}
		}
	},
	componentDidMount: function(){

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
			selectedPermission: {}
		})
	},
	editPermission: function(permission, event){

		this.setState({
			selectedPermission: permission,
			isModalOpen: true
		})
	},
	deletePermission: function(id, event){

		event && event.preventDefault();

		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deletePermission({
				id: id,
				userId: this.context.currentUser.id
			})
		}

	},
	render: function(){

		var {permissions} = this.state.AdminStore;

		var {
			isModalOpen,
			selectedPermission
		} = this.state;

		return (
			<div>
				<a className="docsflow-card-link" onClick = {this.openGroupModal}><em className='fa fa-plus' />Add Permission</a>
				<Modal
					isOpen = {isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewPermission {...this.props} closeModal = {this.closeModal} selectedPermission = {selectedPermission} />
				</Modal>
				<table className="docsflow-table docsflow-table-admin">
					<thead>
						<tr>
							<th>Permission</th>
							<th>Description</th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{permissions.map( (selectedPermission, idx) => {

							var editFn = this.editPermission.bind(this, selectedPermission)
							var deleteFn = this.deletePermission.bind(this, selectedPermission.id)

							return (
								<tr key = {idx}>
									<td>{selectedPermission.name}</td>
									<td>
										{ selectedPermission.description}
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

module.exports = Permissions;
