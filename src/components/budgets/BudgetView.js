import React from 'react';
import BudgetActivity from './BudgetActivity';
import BudgetViewBody from './BudgetViewBody';
import RoutingHistory from './RoutingHistory';

var BudgetView = React.createClass({
	goBack: function(){
		if(window.history.length){
			window.history.go(-1)
		}
	},
	render: function(){

		return (
			<div>
				<nav className="nav-crumb">
					<a onClick = {this.goBack} className="docsflow-a">
						<em className="fa fa-home" />
					</a>
				</nav>
				<h1>{TRANSLATIONS.details}</h1>
				<div className="row">
					<div className="docsflow-sp-content">
						<BudgetViewBody id = {this.props.params.id} />
					</div>
					<div className="sp-sidebar">
						<BudgetActivity id = {this.props.params.id} {...this.props} />
					</div>
					<div className="sp-sidebar">
						<RoutingHistory id = {this.props.params.id} {...this.props} />
					</div>
				</div>

			</div>
		)
	}
});

module.exports = BudgetView
