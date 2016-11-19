import React from 'react';
import {Link} from 'react-router';
import PermissionJail from './PermissionJail';

var Navigation = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},
	render: function(){

		var currentRoutes = this.context.router.getCurrentRoutes();
		var activeRouteName = currentRoutes[currentRoutes.length - 1].name;

		var homeActive = (!activeRouteName || activeRouteName == 'budgetsInbox' || activeRouteName == 'budgets'? 'active' : '');
		return (
			<div className="nav-wrapper">
				<div className="docsflow-container">
					<ul className="nav-list">
						<li className="docsflow-li">
							<a href="#/" className={homeActive}>Home</a>
						</li>
						<PermissionJail permission = 'canCreateBudgetCut'>
							<li className="docsflow-li">
								<Link to="budgetsNew">{TRANSLATIONS.new}</Link>
							</li>
						</PermissionJail>
						<PermissionJail permission='canSeeAdminMenu'>
						<li className="docsflow-li">
							<Link to='admin'>Admin</Link>
						</li>
						</PermissionJail>
						<li className="docsflow-li">
							<Link to='help'>Help</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
});


module.exports = Navigation
