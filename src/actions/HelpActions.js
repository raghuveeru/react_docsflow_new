import {actions} from '../constants';
import request from 'superagent';
import {headers} from './../constants';
import NProgress from 'react-nprogress';
import {getUserUrl} from './../utilities';
import {handleResponse} from './../utilities';

var HelpActions = {
	getDocuments: function(){
		
		NProgress.start()

		request	
			.get(AppConfig.API.BASE_URL + AppConfig.API.GET_HELP_DOCUMENTS)
			.set(headers)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.GET_HELP_DOCUMENTS, jsonResponse);

				});

				NProgress.done()
			})	
	}
};

module.exports = HelpActions