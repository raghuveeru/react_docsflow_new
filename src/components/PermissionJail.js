import React from 'react';
import {checkForPermission} from './../utilities';

var PermissionJail = React.createClass({
	
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	
	render(){
		
		if(checkForPermission(this.context.currentUser, this.props.permission)){

			return this.props.children
		}


		return null;
	}
});

module.exports = PermissionJail