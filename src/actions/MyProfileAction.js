import {actions} from '../constants';
import request from 'superagent';
import {headers} from './../constants';
import NProgress from 'react-nprogress';
import {getUserUrl} from './../utilities';
import {handleResponse} from './../utilities';

var MyProfileAction = {

	getUserById: function(payload, callback){

		NProgress.start();

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_USER_BY_ID)
			.query(payload)
			.set(headers)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.GET_MY_PROFILE, jsonResponse);

					callback && callback(jsonResponse)

				});

				NProgress.done()
			})
	}

};

module.exports = MyProfileAction;
