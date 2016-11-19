import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var HelpStore = Fluxxor.createStore({

	initialize(){

		this.documents = [],

		this.bindActions(actions.GET_HELP_DOCUMENTS, this.getHelpDocuments)
	},
	getHelpDocuments(docs){

		this.documents = docs.data;

		this.emit('change');
	},
	

	getState() {

		return {
			documents: this.documents
		}
	}
});

module.exports = HelpStore