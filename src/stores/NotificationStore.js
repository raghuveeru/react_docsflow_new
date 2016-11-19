import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var NotificationStore = Fluxxor.createStore({
	initialize: function(){	

		this.siteNotifications = [];

		this.bindActions(
			actions.ADD_NOTIFICATION, this.addNotification,
			actions.GET_SITE_NOTIFICATIONS, this.getSiteNotifications,
			actions.EDITING_IN_PROGRESS, this.editingInProgress
		)
	},
	getState: function(){
		return {
			siteNotifications: this.siteNotifications
		}
	},
	editingInProgress: function(payload){
		
		this.emit('add', payload)

	},
	addNotification: function(payload){
		
		this.emit('add', payload)
	},
	getSiteNotifications: function(data){

		this.siteNotifications = data.data;

		this.emit('change')
	}
});

module.exports = NotificationStore;