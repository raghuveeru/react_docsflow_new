import React from 'react';
import Navigation from './Navigation';
import {RouteHandler} from 'react-router';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
import NotificationSystem from 'react-notification-system';
import {notificationStyles} from './../constants';
import AuthMixin from './../mixins/AuthMixin';

var FluxMixin = Fluxxor.FluxMixin(React);

var Main = React.createClass({
	mixins: [FluxMixin, AuthMixin],
	componentDidMount: function() {

		this._notificationSystem = this.refs.notificationSystem;

		this.props.flux.store('NotificationStore')
			.on("add", (payload) => {

				this._notificationSystem.addNotification(payload);

			});
	},
	render: function(){

		return (
			<div>
				<Navigation />
				<div className="main-content">
					<div className="docsflow-container">

						<RouteHandler {...this.props} />
					</div>
 				</div>
 				<NotificationSystem ref="notificationSystem" allowHTML = {true} style = {notificationStyles} />
			</div>
		)
	}
});


module.exports = Main
