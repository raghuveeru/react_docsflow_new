import React from 'react';
import {Route, DefaultRoute, Redirect} from 'react-router';
import Main from './components/Main';
import Help from './components/help';
import MyProfile from './components/MyProfile'
import BudgetLayout from './components/budgets/Layout';
import BudgetView from './components/budgets/BudgetView';
import NewBudget from './components/budgets/New';
import Users from './components/admin/Users';
import Topics from './components/admin/Topics';
import Mapping from './components/admin/Mapping';
import AdminLayout from './components/admin/Layout';
import Groups from './components/admin/Groups';
import EReg from './components/admin/EReg';
import Permissions from './components/admin/Permissions';
import Roles from './components/admin/Roles'

module.exports = (
	<Route handler = {Main} path = '/' name="home">

		<DefaultRoute handler={BudgetLayout} />

		<Route handler={NewBudget} path = "budgets/new" name="budgetsNew" />
		<Route handler={BudgetLayout} path = "budgets" name="budgets" />
		<Route handler={Help} path = "help" name="help" />
		<Route handler={BudgetLayout} path = "budgets/:type" name="budgetsInbox" />
		<Route handler={BudgetView} path = "budgets/view/:id" name="budgetsView" />
		<Route handler={NewBudget} path = "budgets/edit/:id" name="budgetsEdit" />

		<Redirect from='/admin' to='users' />

		<Route handler = {AdminLayout} name='admin'>
			<Route handler = {Users} name="users" />
			<Route handler = {Topics} name="topics" />
			<Route handler = {Mapping} name="mapping" />
			<Route handler = {Groups} name="groups" />
			<Route handler = {Roles} name="roles" />
			<Route handler = {Permissions} name="permissions" />
		</Route>


		<Redirect from='/' to='budgetsInbox' params = {{type: 'inbox'}} />

		<Route handler = {MyProfile} name="myprofile"/>
	</Route>
)
