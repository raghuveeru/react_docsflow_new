import React from 'react';
import fluxxor, {StoreWatchMixin} from 'fluxxor';


var Notifications = React.createClass({
	mixins: [StoreWatchMixin('NotificationStore')],
	getStateFromFlux: function(){

		return {
			notificationStore: this.props.flux.stores.NotificationStore.getState()
		}
	},
	componentDidMount: function(){

		this.props.flux.actions.NotificationActions.getSiteNotifications()
	},
	render: function(){


		var {
			siteNotifications,
		} = this.state.notificationStore,
		totalUnread = 0;

		for(var i = 0; i < siteNotifications.length; i++){
			if(!siteNotifications[i].is_Read) totalUnread++
		}

		return (
			<div className="ui-dropdown">
				<a className="notification-link">
					<em className="fa fa-bell" />
					<span className="notification-count">{totalUnread}</span>
				</a>

				<div className="dropdown arrow-right">
              		<div className="dropdown-inner">
              			<div className="notification-title">Notifications ({totalUnread} new)</div>

              			<div className="notification-list">
              				{siteNotifications.map( (notification) => {

              					var klassName = (notification.is_Read? 'read' : '');
              					return (
              						<a
              							href={notification.url}
              							key = {notification.notification_id}
              							className= {klassName}
              							>
		              					<span className="notification-event">
		              							{notification.text}
		              					</span>
		              					<span className="sp-meta sp-meta-author">
		              						<span>{notification.days}</span><span>{notification.module_Name}</span>
		              					</span>
		              				</a>
		              			)
              				})}
              			</div>
              			<a href={AppConfig.ALL_NOTIFICATIONS_LINK} className="link-more link-block">View all notifications</a>
              		</div>
              	</div>
			</div>
		)
	}
});

module.exports = Notifications;
