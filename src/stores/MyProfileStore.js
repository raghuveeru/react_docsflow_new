import Fluxxor from 'fluxxor';
import {actions} from '../constants';
import _ from 'lodash';

var MyProfileStore = Fluxxor.createStore({
	initialize: function(){
		this.users = [];
		this.bindActions(
			actions.GET_MY_PROFILE,this.getUserById
		)
	},
	getState: function(){
		return {
			users: this.users
		}
	},
	getUserById: function(users){

		this.users = users.data

		this.emit('change')
	}
});

module.exports = MyProfileStore;
