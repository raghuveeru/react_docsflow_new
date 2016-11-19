import React from 'react';
import Modal from 'react-modal';
import {customStyles} from '../../constants';
import Loader from './../Loader';
import {StoreWatchMixin} from 'fluxxor';
import {getUserRoleName, arrayJoin} from './../../utilities';

var BudgetActivity = React.createClass({
	mixins: [StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.props.flux.store('BudgetStore').getState()
		}
	},
	getData: function(){

		this.props.flux.actions.BudgetActions.getBudgetActivity(this.props.id)
	},
	componentDidMount: function(){

		this.getData();
	},
	componentDidUpdate: function(prevProps){

		if(prevProps.id != this.props.id) this.getData();
	},
	render: function(){

		var {activity, isFetchingBudgetActivity} = this.state.BudgetStore;

		if(isFetchingBudgetActivity) return <Loader />;

		if(!activity.length) return null;

		return (
			<div className="sp-module">
				<h2 className="sp-module-title">Activity</h2>
				<div className="sp-module-content">
					<ul className="list-items list-user">
						{activity.map((activity, idx) => {


							return (
								<BudgetActivityItem key = {idx} activity = {activity} />
							)
						})}

					</ul>
				</div>
			</div>
		)
	}
});


var BudgetActivityItem = React.createClass({
	getInitialState: function(){

		return {
			isModalOpen: false
		}
	},
	viewMessage: function(){

		this.setState({
			isModalOpen: true
		})
	},
	closeModal: function(){
		this.setState({
			isModalOpen: false
		})
	},
	renderUsers: function(usersArray, prefix){
		if(!usersArray) return null;
		var len = usersArray.length;
		return (
			<span>
				<span>{prefix} </span>
				{usersArray.map( (user, idx) => {

					var xtra = (idx != len - 1? ', ': '');
					return (<span><strong>{user.name}</strong>{xtra}</span>)
				})}
			</span>
		)
	},
	isExists: function(item){
		return item && item.length
	},
	render: function(){

		var {activity} = this.props;
		var fromUser = activity.from;
		var toUser = activity.to;

		var image = fromUser && fromUser.length? fromUser[0].image: null;

		return (
			<li>
				<div className="media-item">
					{image?
						<img src = {image} style = {{width: '40'}} />
					: null}
					<div className="activity-meta">{activity.date}</div>
				</div>
				<div className="media-content">
					{this.renderUsers(fromUser)} {activity.action} {this.renderUsers(toUser)}<strong></strong>

					<div className="activity-meta">
						<a className="link-view-message"  onClick = {this.viewMessage}>Message</a>
					</div>
				</div>
				<Modal
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<div className="modal-dialog">
						<div className="modal-dialog-title">
							View Message
						</div>
						<div className="modal-dialog-body">
							{this.isExists(toUser) ?
							<p>
								<label><strong>To: </strong></label><br />
								{arrayJoin(toUser, 'name')}</p>
							: null}

							{this.isExists(activity.cc)?
							<p>
								<label><strong>CC: </strong></label><br />
								{arrayJoin(activity.cc, 'name')}</p>
							: null}

							{this.isExists(activity.status)?
							<p>
								<label><strong>Status: </strong></label><br />
								{activity.status}</p>
							: null}
							{activity.subject?
							<p>
								<label><strong>Subject: </strong></label><br />
								{activity.subject}
							</p>

							: null}

							{activity.message?
							<p>
								<label><strong>Message: </strong></label><br />
								{activity.message}
							</p>
							: null}

							<a onClick = {this.closeModal} className="docsflow-a">Close</a>
						</div>
					</div>
				</Modal>
			</li>
		)
	}
})

module.exports = BudgetActivity;
