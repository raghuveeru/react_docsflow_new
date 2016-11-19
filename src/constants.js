module.exports = {
	finalStatus: 'completed',
	actions: {
		AUTHENTICATE_USER: 'AUTHENTICATE_USER',
		UPDATE_BUDGET_CUT:'UPDATE_BUDGET_CUT',
		DELETE_BUDGET_CUT: 'DELETE_BUDGET_CUT',
		UPDATE_BUDGETS: 'UPDATE_BUDGETS',
		SELECT_ALL_BUDGETS: 'SELECT_ALL_BUDGETS',
		SELECT_BUDGET: 'SELECT_BUDGET',
		GET_BUDGET_BY_ID: 'GET_BUDGET_BY_ID',
		ADD_TO_SPEECH: 'ADD_TO_SPEECH',
		UNDO_ADD_TO_SPEECH: 'UNDO_ADD_TO_SPEECH',
		GET_QUESTION: 'GET_QUESTION',
		CREATE_NEW_QUESTION: 'CREATE_NEW_QUESTION',
		GET_FINAL_APPROVED_REPLY: 'GET_FINAL_APPROVED_REPLY',
		GET_WORKING_DRAFT: 'GET_WORKING_DRAFT',
		ASSIGN_TO_OFFICER: 'ASSIGN_TO_OFFICER',
		FETCHING_BUDGET_ACTIVITY: 'FETCHING_BUDGET_ACTIVITY',
		GET_BUDGET_ACTIVITY: 'GET_BUDGET_ACTIVITY',
		ADD_QUESTION: 'ADD_QUESTION',
		ADD_WORKING_DRAFT: 'ADD_WORKING_DRAFT',
		ADD_FINAL_APPROVED_REPLY: 'ADD_FINAL_APPROVED_REPLY',
		GET_MAIN_TOPICS: 'GET_MAIN_TOPICS',
		CREATE_MAIN_TOPIC: 'CREATE_MAIN_TOPIC',
		EDIT_MAIN_TOPIC: 'EDIT_MAIN_TOPIC',
		DELETE_MAIN_TOPIC: 'DELETE_MAIN_TOPIC',
		CREATE_BUDGET_CUT_TOPIC: 'CREATE_BUDGET_CUT_TOPIC',
		EDIT_BUDGET_CUT_TOPIC: 'EDIT_BUDGET_CUT_TOPIC',
		DELETE_BUDGET_CUT_TOPIC: 'DELETE_BUDGET_CUT_TOPIC',

		GET_ALL_USERS: 'GET_ALL_USERS',
		GET_ALL_USERS_ADMIN: 'GET_ALL_USERS_ADMIN',
		CREATE_NEW_USER: 'CREATE_NEW_USER',
		DELETE_USER: 'DELETE_USER',
		ADD_NOTIFICATION: 'ADD_NOTIFICATION',
		GET_SITE_NOTIFICATIONS: 'GET_SITE_NOTIFICATIONS',
		GET_USER_ROLE: 'GET_USER_ROLE',
		UPDATE_MAIN_TOPICS: 'UPDATE_MAIN_TOPICS',
		UPDATE_SUB_TOPICS: 'UPDATE_SUB_TOPICS',
		SET_BUDGET_OPEN_STATUS: 'SET_BUDGET_OPEN_STATUS',
		EDITING_IN_PROGRESS: 'EDITING_IN_PROGRESS',

		DELETE_EDIT_FLAG: 'DELETE_EDIT_FLAG',
		CREATE_EDIT_FLAG: 'CREATE_EDIT_FLAG',
		GET_USER_BY_ID: 'GET_USER_BY_ID',
		GET_MY_PROFILE: 'GET_MY_PROFILE',
		UPDATE_USER: 'UPDATE_USER',

		GET_MAPPING_MP_TO_HODS: 'GET_MAPPING_MP_TO_HODS',
		GET_MAPPING_HOD_TO_LIASONS: 'GET_MAPPING_HOD_TO_LIASONS',
		DELETE_MAPPING_MP_TO_HODS: 'DELETE_MAPPING_MP_TO_HODS',
		DELETE_MAPPING_HOD_TO_LIASONS: 'DELETE_MAPPING_HOD_TO_LIASONS',
		CREATE_MAPPING_MP_TO_HODS: 'CREATE_MAPPING_MP_TO_HODS',
		CREATE_MAPPING_HOD_TO_LIASONS: 'CREATE_MAPPING_HOD_TO_LIASONS',
		UPDATE_MAPPING_MP_TO_HODS: 'UPDATE_MAPPING_MP_TO_HODS',
		UPDATE_MAPPING_HOD_TO_LIASONS: 'UPDATE_MAPPING_HOD_TO_LIASONS',
		GET_TOPIC_YEARS: 'GET_TOPIC_YEARS',

		GET_ALL_GROUPS: 'GET_ALL_GROUPS',
		CREATE_NEW_GROUP: 'CREATE_NEW_GROUP',
		DELETE_GROUP: 'DELETE_GROUP',
		EDIT_GROUP: 'EDIT_GROUP',
		UPDATE_BUDGET_LIASION_OFFICER: 'UPDATE_BUDGET_LIASION_OFFICER',

		UPLOAD_TO_EREG_SUCCESS: 'UPLOAD_TO_EREG_SUCCESS',
		GET_HELP_DOCUMENTS: 'GET_HELP_DOCUMENTS',
		GET_ROUTING_HISTORY: 'GET_ROUTING_HISTORY',
		GET_ALL_PERMISSIONS: 'GET_ALL_PERMISSIONS',
		CREATE_NEW_PERMISSION: 'CREATE_NEW_PERMISSION',
		UPDATE_PERMISSION: 'UPDATE_PERMISSION',
		DELETE_PERMISSION: 'DELETE_PERMISSION',
		GET_ALL_ROLES: 'GET_ALL_ROLES',
		CREATE_NEW_ROLE: 'CREATE_NEW_ROLE',
		UPDATE_ROLE: 'UPDATE_ROLE',
		DELETE_ROLE: 'DELETE_ROLE',
		GET_ALL_DEPARTMENTS: 'GET_ALL_DEPARTMENTS'
	},
	customStyles: {
		overlay : {
			position          : 'fixed',
			top               : 0,
			left              : 0,
			right             : 0,
			bottom            : 0,
			backgroundColor   : 'rgba(0,0,0, 0.75)',
			zIndex: 10,
		},
		content : {
			top                   : '50%',
			left                  : '50%',
			right                 : 'auto',
			bottom                : 'auto',
			marginRight           : '-50%',
			transform             : 'translate(-50%, -50%)',
			padding: 0,
			zIndex: 11,
			maxHeight: '100%',
			overflow: 'auto'
		}
	},
	notificationStyles: {
		NotificationItem: {
			error: {
				borderColor: '#874141'
			},
			success: {
				borderColor: '#5A8321'
			}
		}
	},
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	validationOptions: {
		errorClass: 'label-error',
		ignore: null,
		errorPlacement: function(error, element){

			var $ele = $(element);

			if(!$ele.attr('type')) return error.insertAfter(element);

			switch($ele.attr('type')){

				case 'checkbox':
					error.insertAfter($ele.closest('.docflow-form-control'))
					break;

				default:
					error.insertAfter(element)
					break;
			}

		},
		highlight: function (element, errorClass, validClass) {

			var elem = $(element);
			if (elem.hasClass("select2-offscreen")) {
				$("#s2id_" + elem.attr("id") + " ul").addClass(errorClass);
			} else {
				elem.addClass(errorClass);
			}
		},

		//When removing make the same adjustments as when adding
		unhighlight: function (element, errorClass, validClass) {
			var elem = $(element);
			if (elem.hasClass("select2-offscreen")) {
				$("#s2id_" + elem.attr("id") + " ul").removeClass(errorClass);
			} else {
				elem.removeClass(errorClass);
			}
		}
	}
}
