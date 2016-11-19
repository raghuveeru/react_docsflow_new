import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {mapObject, getStatusName} from './../../utilities';
import BudgetInnerGroup from './BudgetInnerGroup';

var BudgetGroup = React.createClass({
	
	getInitialState: function(){

		var {openStatus, group} = this.props;

		return {
			isOpen: openStatus.indexOf(group.name) != -1
		}
	},
	toggleGroup: function(name){

		var isOpen = !this.state.isOpen;

		this.setState({
			isOpen: isOpen
		})

		this.props.flux.actions.BudgetActions.setBudgetOpenStatus(name, isOpen)
	},
	render: function(){

		var {group} = this.props;
		var klassName = 'group' + (this.state.isOpen? ' group-open' : ' group-closed');
		
		var toggleBound = this.toggleGroup.bind(this, group.name)

		return (
			<div className={klassName}>
				
				<h3 className="budget-group-title" onClick = {toggleBound}>{group.name} ({group.items.length})</h3>

				{group.items.map( (grp, idx) => {

					return <BudgetInnerGroup key = {idx} grp = {grp} {...this.props}  />
				})}
															
			</div>
		)
	}
});

module.exports = BudgetGroup;