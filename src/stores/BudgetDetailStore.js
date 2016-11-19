import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var BudgetDetailStore = Fluxxor.createStore({
	initialize: function(){
		this.question = []

		this.workingDraft = [];

		this.finalApprovedReply = []

		this.bindActions(
			actions.GET_QUESTION, this.getQuestion,
			actions.GET_WORKING_DRAFT, this.getWorkingDraft,
			actions.GET_FINAL_APPROVED_REPLY, this.getFinalApprovedReply,
			actions.ADD_QUESTION, this.addQuestion,
			actions.ADD_WORKING_DRAFT, this.addWorkingDraft,
			actions.ADD_FINAL_APPROVED_REPLY, this.addFinalApprovedReply,
		)
	},
	getState: function(){
		return {
			question: this.question,
			workingDraft: this.workingDraft,
			finalApprovedReply: this.finalApprovedReply
		}
	},
	addQuestion: function(payload){

		if(!payload || !payload.data) return;
		
		this.question = payload.data

		this.emit('change');
	},
	addWorkingDraft: function(payload){

		if(!payload || !payload.data) return;
		
		this.workingDraft = payload.data

		this.emit('change');
	},
	addFinalApprovedReply: function(payload){

		if(!payload || !payload.data) return;
		
		this.finalApprovedReply = payload.data

		this.emit('change');
	},
	getQuestion: function(question){

		this.question = question.data

		this.emit('change')
	},
	getWorkingDraft: function(draft){

		this.workingDraft = draft.data

		this.emit('change')
	},
	getFinalApprovedReply: function(reply){

		this.finalApprovedReply = reply.data

		this.emit('change')
	}
});

module.exports = BudgetDetailStore