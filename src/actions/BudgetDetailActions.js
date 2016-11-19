import {actions, headers} from '../constants';
import request from 'superagent';
import {handleResponse} from './../utilities';

module.exports = {	
	getQuestion: function(payload, callback){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_QUESTION)
			.set(headers)
			.query(payload)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.GET_QUESTION, jsonResponse);

					callback && callback()
				
				});
			})
	},
	addQuestion: function(payload, callback){

		this.dispatch(actions.ADD_QUESTION, payload)

		callback && callback()
	},
	addWorkingDraft: function(payload, callback){

		this.dispatch(actions.ADD_WORKING_DRAFT, payload)

		callback && callback()
	},
	addFinalApprovedReply: function(payload, callback){

		this.dispatch(actions.ADD_FINAL_APPROVED_REPLY, payload)

		callback && callback()
	},
	getWorkingDraft: function(payload, callback){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_WORKING_DRAFT)
			.set(headers)
			.query(payload)
			.end((err, res) => {
				
				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.GET_WORKING_DRAFT, jsonResponse);

					callback && callback()
				
				})
			})
	},
	getFinalApprovedReply: function(payload, callback){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_FINAL_APPROVED_REPLY)
			.set(headers)
			.query(payload)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.GET_FINAL_APPROVED_REPLY, jsonResponse);

					callback && callback()
				
				});
			})
	},
	deleteEditFlag: function(payload){

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.DELETE_EDIT_FLAG)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				this.dispatch(actions.DELETE_EDIT_FLAG, JSON.parse(res.text));
			})
	},
	createEditFlag: function(payload, callback){

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_EDIT_FLAG)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.CREATE_EDIT_FLAG, jsonResponse);

					callback && callback()
				
				});
				
			})
	}
}