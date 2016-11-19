import {actions} from '../constants';

module.exports = {
	authenticateUser(payload){

		this.dispatch(actions.AUTHENTICATE_USER, payload)
	}
}