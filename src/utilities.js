import {finalStatus} from './constants';
var utilities = {
	mapObject: function(object, callback) {
		return Object.keys(object).map(function (key, idx) {
			return callback(key, object[key], idx);
		});
	},
	filterStatus: function(statuses, currentStatus){

		var index = 0;

		for(var i = 0; i < AppConfig.STATUS_MAPPING.length; i++){
			if(AppConfig.STATUS_MAPPING[i].name.toLowerCase() == currentStatus.toLowerCase()){
				index = i;
			}
		}

		return statuses.filter( (status, idx) => {
			return status.name.toLowerCase() != finalStatus && idx >= index
		})
	},
	getStatusName: function(status){

		var _status = status.toLowerCase();

		for(var i = 0; i < AppConfig.STATUS_MAPPING.length; i++){

			if(
				AppConfig.STATUS_MAPPING[i].name.toLowerCase() == _status
			){
				return AppConfig.STATUS_MAPPING[i]
			}
		}

		return 'Please provide status mapping in config file for ' + status;
	},
	t: function(s,d){
		for(var p in d)
		s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
		return s;
	},
	isSpeech: function(status){

		return status.toLowerCase() == finalStatus
	},
	assign: function(){

		if (!Object.assign) {
		  Object.defineProperty(Object, 'assign', {
		    enumerable: false,
		    configurable: true,
		    writable: true,
		    value: function(target) {
		      'use strict';
		      if (target === undefined || target === null) {
		        throw new TypeError('Cannot convert first argument to object');
		      }

		      var to = Object(target);
		      for (var i = 1; i < arguments.length; i++) {
		        var nextSource = arguments[i];
		        if (nextSource === undefined || nextSource === null) {
		          continue;
		        }
		        nextSource = Object(nextSource);

		        var keysArray = Object.keys(nextSource);
		        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
		          var nextKey = keysArray[nextIndex];
		          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
		          if (desc !== undefined && desc.enumerable) {
		            to[nextKey] = nextSource[nextKey];
		          }
		        }
		      }
		      return to;
		    }
		  });
		}

		return Object.assign(arguments)
	},
	debounce: function(func, wait, immediate) {
		var timeout, args, context, timestamp, result;

		var now = Date.now || function() {
			return new Date().getTime();
	  	}

		var later = function() {
			var last = now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function() {
			context = this;
			args = arguments;
			timestamp = now();
			var callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	},
	getUserUrl: function(method, userType){

		var url = '';

		if(method == 'new'){
			switch(userType){
				case 'user':
					url = AppConfig.API.USERS.CREATE_NEW_USER;
					break;
				case 'mp':
					url = AppConfig.API.USERS.CREATE_NEW_MP;
					break;
			}
		};

		if(method == 'update'){
			switch(userType){
				case 'user':
					url = AppConfig.API.USERS.UPDATE_USER;
					break;
				case 'mp':
					url = AppConfig.API.USERS.UPDATE_MP;
					break;
			}
		};

		if(method == 'delete'){
			switch(userType){
				case 'user':
					url = AppConfig.API.USERS.DELETE_USER;
					break;
				case 'mp':
					url = AppConfig.API.USERS.DELETE_MP;
					break;
			}
		};

		return AppConfig.API.BASE_URL + url;
	},
	emitNotification(type, flux, message){

		flux.actions.NotificationActions.addNotification({
			title: (type == 'error'? 'Error' : 'Success'),
			level: type,
			message: message
		});
	},
	handleResponse: function(response, flux, successCallback, successMessage){

		if(response.ok){

			// Server response is fine

			var res = JSON.parse(response.text);

			if(res.errors){

				var errs = res.errors.map((data) => data.error);

				utilities.emitNotification('error', flux, errs.join('<br />'))

			}else{

				if(res.hasOwnProperty('success') && !res.success){

					return utilities.emitNotification('error', flux, 'Something went wrong. Your operation was not completed.')
				}

				if(successMessage){

					utilities.emitNotification('success', flux, successMessage)
				}

				successCallback && successCallback(res)
			}
		}else{

			// Server error

			utilities.emitNotification('error', flux, response.text)

		}

	},
	checkForPermission: function(currentUser, permission){

		var { roleId } = currentUser;

		/* For Admin and COS Admin */

		if(roleId.indexOf(1) != -1 || roleId.indexOf(2) != -1) return true;

		/* Gather all permissions of the current role */
		var allPermissions = [].concat.apply([], AppConfig.ROLES.map((role) => {
			if (roleId.indexOf(role.id) != -1) return role.permissions
			return []
		}))

		return allPermissions.indexOf(permission) != -1
	},
	arrayJoin: function(array, key, separator){

		if(!(array instanceof Array)) return null;

		var out = '',
			size = array.length;

		for(var i = 0; i < size; i ++){
			out+= ( key? array[i][key]: array[i] ) + (i + 1 != size? ', ' : '')
		}

		return out;
	},
	getUserRoleName: function(roles, roleList){

		var rolesHTML = [];

		if(roles.length && typeof roles[0] == 'string') return roles[0]

		if(typeof roles == 'object'){

			for(var i = 0; i < roleList.length; i++){
				if(roles.indexOf(roleList[i].id) != -1){
					rolesHTML.push(roleList[i].name)
				}
			}

		}else{

			var _role = AppConfig.ROLES.filter( (role) => role.id == roles);

			if(_role){
				rolesHTML.push(_role[0].name)
			}
		}

		return rolesHTML.join(', ');

	},
	createEditFlag: function(currentUser, flux, type, id, callback){

		flux.actions.BudgetDetailActions.createEditFlag({
			userId: currentUser.id,
			type: type,
			budgetCutId: id,
			edit: true
		}, callback)
	},
	deleteEditFlag: function(currentUser, flux, type, id){

		flux.actions.BudgetDetailActions.deleteEditFlag({
			userId: currentUser.id,
			type: type,
			budgetCutId: id,
			edit: false
		})
	},
	checkSelect2Valid: function(e){

		if(!e) return;

		var $ele = $(e.target);

		return $ele.valid();
	}
};

module.exports = utilities;
