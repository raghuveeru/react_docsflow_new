import React from 'react';
import Modal from 'react-modal';
import {customStyles} from '../../constants';
import Loader from './../Loader';
import {StoreWatchMixin} from 'fluxxor';
import {getUserRoleName, arrayJoin} from './../../utilities';

var RoutingHistory = React.createClass({
	mixins: [StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.props.flux.store('BudgetStore').getState()
		}
	},
	getData: function(){

		this.props.flux.actions.BudgetActions.getRoutingHistory(this.props.id)
	},
	componentDidMount: function(){

		this.getData();
	},
	componentDidUpdate: function(prevProps){

		if(prevProps.id != this.props.id) this.getData();
	},
	render: function(){

		var {routingHistory} = this.state.BudgetStore;
		if(!routingHistory.length) return null;
		return (
			<div className="sp-module">
				<h2 className="sp-module-title">Routing History</h2>
				<div className="sp-module-content">
					<ul className="list-items list-user">
						{routingHistory.map((routingHistory, idx) => {
							return (
								<RoutingHistoryItem key = {idx} routingHistory = {routingHistory} />
							)
						})}

					</ul>
				</div>
			</div>
		)
	}
});


var RoutingHistoryItem = React.createClass({
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
	isExists: function(item){
		return item && item.length
	},
	render: function(){

		var {routingHistory} = this.props;

		var image = routingHistory.image;

		return (
			<li>
				<div className="media-item">
					{image?
						<img src = {image} style = {{width: '40'}} />
					: null}
				</div>
				<div className="media-content">
				{routingHistory.name}
				<br/>
				{routingHistory.date}
				</div>
			</li>
		)
	}
})

module.exports = RoutingHistory;
