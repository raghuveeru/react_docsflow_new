import React from 'react';
import {checkForPermission} from './../../utilities';
import {Link, RouteHandler} from 'react-router';

var Layout = React.createClass({
	contextTypes: {
		router: React.PropTypes.func,
		currentUser: React.PropTypes.object
	},
	componentDidMount: function(){

		if(!checkForPermission(this.context.currentUser, 'canSeeAdminMenu')){

			this.context.router.transitionTo('home')
		}
	},
	render: function(){

		return (
			<div>
				<h1>Admin</h1>
				<div className="docsflow-sp-card">
					<nav className="docsflow-nav-tabs">
						<Link className="tab__handle" to = {'/admin/users'}>Users</Link>
						<Link to = {'/admin/topics'}>Topics</Link>
						<Link to = {'/admin/groups'}>Email Groups</Link>
						<Link to = {'/admin/roles'}>Roles</Link>
						<Link to = {'/admin/permissions'}>Permissions</Link>
					</nav>

					<div className="docsflow-card-body">
						<RouteHandler {...this.props} />
					</div>
				</div>
			</div>
		)
	}
});


module.exports = Layout
