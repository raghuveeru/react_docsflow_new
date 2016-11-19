import {actions} from '../constants';
import request from 'superagent';
import NProgress from 'react-nprogress';
import {headers} from './../constants';
import {handleResponse} from './../utilities';

module.exports = {
	setBudgetOpenStatus: function(name, isOpen){

		this.dispatch(actions.SET_BUDGET_OPEN_STATUS, {
			name: name,
			isOpen: isOpen
		});
	},
	getBudgets: function(params){

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ALL)
			.set(headers)
			.query(params)
			.end((err, res) => {

				NProgress.done()

				this.dispatch(actions.UPDATE_BUDGETS, JSON.parse(res.text));
			});
	},
	getBudgetById: function(payload){

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.SINGLE)
			.set(headers)
			.query(payload)
			.end((err, res) => {

				NProgress.done()

				this.dispatch(actions.GET_BUDGET_BY_ID, JSON.parse(res.text));
			});
	},
	selectBudget: function(id, type){

		this.dispatch(actions.SELECT_BUDGET, {
			id: id,
			type: type
		})
	},
	selectAllBudgets: function(type){

		this.dispatch(actions.SELECT_ALL_BUDGETS, type)
	},
	exportToExcel: function(payload){

		NProgress.start()

		var data = {
			"ids": payload,
			"userId": CURRENT_USER.id
		};

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EXPORT_TO_EXCEL)
			.set(headers)
			.query(data)
			.end((err, res) => {

				NProgress.done()

			})
	},
	addToSpeech: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ADD_TO_SPEECH)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {


				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.ADD_TO_SPEECH, jsonResponse);

				}, 'Selected budget cuts have been added to speech.')

				NProgress.done()

			})
	},
	undoAddToSpeech: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.UNDO_ADD_TO_SPEECH)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {


				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.UNDO_ADD_TO_SPEECH, jsonResponse);

				}, 'Selected budget cuts have been removed from speech.')

				NProgress.done()

			})
	},
	assignToOfficer: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ASSIGN_TO_OFFICER)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				NProgress.done();

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.ASSIGN_TO_OFFICER, jsonResponse);

					callback && callback(jsonResponse)

				}, 'Budget cut has been assigned to the selected officers')

			})
	},
	getBudgetActivity: function(payload){

		this.dispatch(actions.FETCHING_BUDGET_ACTIVITY, true);

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_BUDGET_ACTIVITY)
			.set(headers)
			.query({
				budgetId: payload
			})
			.end((err, res) => {

				NProgress.done()

				this.dispatch(actions.GET_BUDGET_ACTIVITY, JSON.parse(res.text));
			})
	},
	getRoutingHistory: function(payload){

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_ROUTING_HISTORY)
			.set(headers)
			.query({
				budgetId: payload
			})
			.end((err, res) => {

				NProgress.done()

				this.dispatch(actions.GET_ROUTING_HISTORY, JSON.parse(res.text));
			})
	},
	createNew: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_BUDGET_CUT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					callback && callback(jsonResponse)

				}, 'Budget cut was saved successfully.')

				NProgress.done()
			})

	},
	updateBudgetCut: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.UPDATE_BUDGET_CUT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					callback && callback(jsonResponse)

				}, 'Budget cut was saved successfully.')

				NProgress.done()


			})

	},
	deleteBudgetCut: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.DELETE_BUDGET_CUT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					callback && callback(jsonResponse)

				}, 'Budget cut has been deleted.')

				NProgress.done()


			})
	},
	deleteAttachment: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.DELETE_ATTACHMENT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					callback && callback(jsonResponse)

				}, 'Attachment deleted successfully.')

				NProgress.done()

			})
	},
	updateLiasionOfficer: function(payload){

		this.dispatch(actions.UPDATE_BUDGET_LIASION_OFFICER, payload);
	}
}
