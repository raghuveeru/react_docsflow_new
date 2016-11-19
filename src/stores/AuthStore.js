import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var AuthStore = Fluxxor.createStore({

	initialize(){

		this.bindActions(actions.AUTHENTICATE_USER, this.authenticateUser)
	},

	authenticateUser(payload){

		this.currentUser = payload;

		this.emit('change');
	},


	getState() {

		return {
			currentUser: this.currentUser
		}
	}
});

module.exports = AuthStore