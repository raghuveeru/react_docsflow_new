import Fluxxor from 'fluxxor';
import {actions} from '../constants';
import _ from 'lodash';

var AdminStore = Fluxxor.createStore({
	initialize: function(){
		this.topics = [];

		this.users = [];

		this.mappingMPHods = [];

		this.mappingHodLiasons = [];

		this.topicYears = [];

		this.groups = [];

		this.permissions = [];

		this.roles = [];

		this.departments = [];

		this.bindActions(
			actions.GET_MAIN_TOPICS, this.getMainTopics,
			actions.CREATE_MAIN_TOPIC, this.createMainTopic,
			actions.EDIT_MAIN_TOPIC, this.editMainTopic,
			actions.DELETE_MAIN_TOPIC, this.deleteMainTopic,
			actions.CREATE_BUDGET_CUT_TOPIC, this.createBudgetCutTopic,
			actions.EDIT_BUDGET_CUT_TOPIC, this.editBudgetCutTopic,
			actions.DELETE_BUDGET_CUT_TOPIC, this.deleteBudgetCutTopic,
			actions.GET_ALL_USERS, this.getAllUsers,
			actions.GET_ALL_USERS_ADMIN, this.getAllUsers,
			actions.CREATE_NEW_USER, this.addUser,
			actions.DELETE_USER, this.deleteUser,
			actions.UPDATE_MAIN_TOPICS, this.updateMainTopics,
			actions.UPDATE_SUB_TOPICS, this.updateSubTopics,
			actions.UPDATE_USER, this.updateUser,
			actions.GET_MAPPING_MP_TO_HODS, this.getMappingMpToHods,
			actions.GET_MAPPING_HOD_TO_LIASONS, this.getMappingHodLiasons,
			actions.DELETE_MAPPING_MP_TO_HODS, this.deleteMappingMpToHods,
			actions.DELETE_MAPPING_HOD_TO_LIASONS, this.deleteMappingHodLiasons,
			actions.CREATE_MAPPING_MP_TO_HODS, this.createMappingMpToHods,
			actions.CREATE_MAPPING_HOD_TO_LIASONS, this.createMappingHodLiasons,
			actions.UPDATE_MAPPING_MP_TO_HODS, this.updateMappingMpToHods,
			actions.UPDATE_MAPPING_HOD_TO_LIASONS, this.updateMappingHodLiasons,
			actions.GET_TOPIC_YEARS, this.getTopicYears,
			actions.GET_ALL_GROUPS, this.getAllGroups,
			actions.DELETE_GROUP, this.deleteGroup,
			actions.CREATE_NEW_GROUP, this.createNewGroup,
			actions.EDIT_GROUP, this.editGroup,
			actions.GET_ALL_PERMISSIONS, this.getAllPermissions,
			actions.CREATE_NEW_PERMISSION, this.createNewPermission,
			actions.UPDATE_PERMISSION, this.udpatePermission,
			actions.DELETE_PERMISSION, this.deletePermission,
			actions.GET_ALL_ROLES, this.getAllRoles,
			actions.CREATE_NEW_ROLE, this.createNewRole,
			actions.UPDATE_ROLE, this.updateRole,
			actions.DELETE_ROLE, this.deleteRole,
			actions.GET_ALL_DEPARTMENTS, this.getAllDepartments
					)
	},
	getState: function(){
		return {
			topics: this.topics,
			users: this.users,
			mappingMPHods: this.mappingMPHods,
			mappingHodLiasons: this.mappingHodLiasons,
			topicYears: this.topicYears,
			groups: this.groups,
			permissions: this.permissions,
			roles: this.roles
		}
	},
	getTopicYears: function(payload){

		this.topicYears = payload.data;

		this.emit('change')
	},
	getMappingMpToHods: function(payload){

		this.mappingMPHods = payload.data;

		this.emit('change')
	},
	getMappingHodLiasons: function(payload){

		this.mappingHodLiasons = payload.data;

		this.emit('change')
	},
	createMappingMpToHods: function(payload){

		this.mappingMPHods = [].concat(this.mappingMPHods, payload.data);

		this.emit('change')
	},
	createMappingHodLiasons: function(payload){

		this.mappingHodLiasons = [].concat(this.mappingHodLiasons, payload.data);

		this.emit('change')
	},
	updateMappingMpToHods: function(payload){

		var _response = payload.response.data[0],
			index = payload.index;

		if(!_response) return;

		this.mappingMPHods[index] = _response;

		this.emit('change')
	},
	updateMappingHodLiasons: function(payload){

		var _response = payload.response.data[0],
			index = payload.index;

		if(!_response) return;

		this.mappingHodLiasons[index] = _response;

		this.emit('change')
	},
	deleteMappingMpToHods: function(payload){

		var data = payload.data.success,
			index = payload.index

		if(data){

			this.mappingMPHods.splice(index, 1);

			this.emit('change')
		}
	},
	deleteMappingHodLiasons: function(payload){

		var data = payload.data.success,
			index = payload.id

		if(data){

			this.mappingHodLiasons.splice(index, 1);

			this.emit('change')
		}
	},
	updateUser: function(payload){

		var _user = payload.data[0];

		if(!_user) return ;

		var _id = _user.id;

		var _users = _.clone(this.users);

		for(var i = 0; i < _users.length; i++){

			if(_users[i].id == _id){
				_users[i] = _user
			}
		}

		this.users = _users;

		this.emit('change')

	},
	getMainTopics: function(topics){

		this.topics = topics.data

		this.emit('change')
	},
	createMainTopic: function(payload){

		var data = payload.data[0];

		this.topics.unshift(data)

		this.emit('change')
	},
	updateMainTopics: function(payload){

		this.topics = payload.topics;
	},
	updateSubTopics: function(payload){

		var _topics = _.clone(this.topics);

		for(var i = 0; i < _topics.length; i++){
			if(_topics[i].id == payload.mainTopicId){
				_topics.budgetCutTopic = payload.subTopics
			}
		}

		this.topics = _topics
	},
	editMainTopic: function(payload){

		var data = payload.data[0]

		for(var i = 0; i < this.topics.length; i++){
			if(this.topics[i].id == data.id){
				this.topics[i].name = data.name
			}
		}

		this.emit('change')
	},
	deleteMainTopic: function(payload){

		var data = payload.data.success,
			topicId = payload.topicId

		if(data){

			for(var j = this.topics.length - 1; j >= 0; j--) {
				if(this.topics[j].id == topicId){
					this.topics.splice(j, 1);
				}
			}

			this.emit('change')
		}
	},
	createBudgetCutTopic: function(payload){

		var data = payload.data.data[0],
			topicId = payload.topicId


		for(var i = 0; i < this.topics.length; i++){
			if(this.topics[i].id == topicId){

				var budgetCutTopics = this.topics[i].budgetCutTopic;

				budgetCutTopics.push(data);

			}
		}

		this.emit('change')

	},
	editBudgetCutTopic: function(payload){

		var data = payload.data.data[0],
			topicId = payload.topicId


		for(var i = 0; i < this.topics.length; i++){
			if(this.topics[i].id == topicId){

				var budgetCutTopics = this.topics[i].budgetCutTopic;

				for(var j = 0; j < budgetCutTopics.length; j++){
					if(budgetCutTopics[j].id == data.id){
						budgetCutTopics[j].name = data.name
					}
				}
			}
		}

		this.emit('change')
	},
	deleteBudgetCutTopic: function(payload){

		var data = payload.data.success,
			topicId = payload.topicId,
			budgetCutTopicId = payload.budgetCutTopicId

		if(data){

			for(var i = 0; i < this.topics.length; i++){
				if(this.topics[i].id == topicId){

					var budgetCutTopics = this.topics[i].budgetCutTopic;

					for(var j = budgetCutTopics.length - 1; j >= 0; j--) {
						if(budgetCutTopics[j].id == budgetCutTopicId){

							budgetCutTopics.splice(j, 1)
						}
					}
				}
			}

			this.emit('change')
		}
	},
	getAllUsers: function(users){

		this.users = users.data

		this.emit('change')
	},
	getAllPermissions: function(userpermissions){

		this.permissions = userpermissions.data

		this.emit('change')
	},
	getAllRoles: function(userroles){

		this.roles = userroles.data

		this.emit('change')
	},
	getAllDepartments: function(depts){

		this.departments = depts.data

		this.emit('change')
	},
	addUser: function(payload){

		var user = payload.data[0]

		this.users.unshift(user)

		this.emit('change')
	},
	createNewPermission: function(payload){

		var permission = payload.data[0]

		this.permissions.unshift(role)

		this.emit('change')
	},
	createNewRole: function(payload){

		var role = payload.data[0]

		this.roles.unshift(role)

		this.emit('change')
	},
	deleteUser: function(payload){

		var data = payload.data.success,
			userId = payload.userId;

		if(data){
			for(var i = this.users.length - 1; i >= 0; i --){
				if(this.users[i].id == userId){
					this.users.splice(i, 1)
				}
			}

			this.emit('change')
		}
	},
	deletePermission: function(payload){

		var data = payload.data.success,
			id = payload.id;

		if(data){
			for(var i = this.permissions.length - 1; i >= 0; i --){
				if(this.permissions[i].id == id){
					this.permissions.splice(i, 1)
				}
			}

			this.emit('change')
		}
	},
	deleteRole: function(payload){

		var data = payload.data.success,
			id = payload.id;

		if(data){
			for(var i = this.roles.length - 1; i >= 0; i --){
				if(this.roles[i].id == id){
					this.roles.splice(i, 1)
				}
			}

			this.emit('change')
		}
	},
	getAllGroups: function(payload){

		this.groups = payload.data;

		this.emit('change')
	},
	deleteGroup: function(payload){

		var data = payload.data.success,
			groupId = payload.id;

		if(data){
			for(var i = this.groups.length - 1; i >= 0; i --){
				if(this.groups[i].id == groupId){
					this.groups.splice(i, 1)
				}
			}

			this.emit('change')
		}
	},
	createNewGroup: function(payload){

		var group = payload.data[0]

		this.groups.unshift(group)

		this.emit('change')
	},
	editGroup: function(payload){

		var _group = payload.data[0];

		if(!_group) return ;

		var _id = _group.id;

		var _groups = _.clone(this.groups);

		for(var i = 0; i < _groups.length; i++){

			if(_groups[i].id == _id){
				_groups[i] = _group
			}
		}

		this.groups = _groups;

		this.emit('change')
	},
	updateRole: function(payload){

		var _role = payload.data[0];

		if(!_role) return ;

		var _id = _group.id;

		var _roles = _.clone(this.roles);

		for(var i = 0; i < _roles.length; i++){

			if(_roles[i].id == _id){
				_roles[i] = _role
			}
		}

		this.roles = _roles;

		this.emit('change')
	},
	udpatePermission: function(payload){

		var _permission = payload.data[0];

		if(!_permission) return ;

		var _id = _group.id;

		var _permissions = _.clone(this.permissions);

		for(var i = 0; i < _permissions.length; i++){

			if(_permissions[i].id == _id){
				_permissions[i] = _role
			}
		}

		this.permissions = _permissions;

		this.emit('change')
	}
});

module.exports = AdminStore
