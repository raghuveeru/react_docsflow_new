import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import { arrayJoin } from './../../utilities';
import {customStyles} from '../../constants';
import Modal from 'react-modal';
import NewGroup from './NewGroup';

var Groups = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	contextTypes: {
		currentUser: React.PropTypes.object,
		router: React.PropTypes.func
	},
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isModalOpen: false,
			selectedGroup: {}
		}
	},
	componentDidMount: function(){

		this.props.flux.actions.AdminActions.getAllGroups();
	},
	openGroupModal: function(){

		this.setState({
			isModalOpen: true
		})
	},
	closeModal: function(){

		this.setState({
			isModalOpen: false,
			selectedGroup: {}
		})
	},
	editGroup: function(group, event){

		this.setState({
			selectedGroup: group,
			isModalOpen: true
		})
	},
	deleteGroup: function(id, event){

		event && event.preventDefault();

		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deleteGroup({
				id: id,
				userId: this.context.currentUser.id
			})
		}

	},
	render: function(){

		var {groups} = this.state.AdminStore;

		var {
			isModalOpen,
			selectedGroup
		} = this.state;

		return (
			<div>
				<a className="docsflow-card-link" onClick = {this.openGroupModal}><em className='fa fa-plus' />Add email group</a>
				<Modal
					isOpen = {isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewGroup {...this.props} closeModal = {this.closeModal} selectedGroup = {selectedGroup} />
				</Modal>
				<table className="docsflow-table docsflow-table-admin">
					<thead>
						<tr>
							<th>Name</th>
							<th>Users</th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{groups.map( (group, idx) => {

							var editFn = this.editGroup.bind(this, group)
							var deleteFn = this.deleteGroup.bind(this, group.id)

							return (
								<tr key = {idx}>
									<td>{group.name}</td>
									<td>
										{ arrayJoin(group.users, 'name')}
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

module.exports = Groups;
