import {actions} from '../constants';
import request from 'superagent';
import NProgress from 'react-nprogress';
import {headers} from './../constants';

module.exports = {
	addNotification: function(payload){

		this.dispatch(actions.ADD_NOTIFICATION, payload);
	},
	getSiteNotifications: function(){

		var {currentUser} = this.flux.store('AuthStore').getState();

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.NOTIFICATIONS.ALL)
			.set(headers)
			.query({
				userId: currentUser.id
			})
			.end((err, res) => {

				this.dispatch(actions.GET_SITE_NOTIFICATIONS, JSON.parse(res.text));
			})
	}
}