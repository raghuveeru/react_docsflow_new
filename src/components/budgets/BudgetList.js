import React from 'react';
import BudgetGroup from './BudgetGroup';

var BudgetList = React.createClass({		
	render: function(){

		var {budgets} = this.props;

		var temp = {},
			budgetGroups = [];

		/**
		 * Create groups
		 * @param  {[type]} budget){			var group         [description]
		 * @return {[type]}                 [description]
		 */
		budgets.forEach(function(budget){
			var group = budget.relationships.category;

			temp[group] = temp[group] || [];
			temp[group]['name'] = temp[group]['name'] || group;
			temp[group]['items'] = temp[group]['items'] || []
			temp[group]['items'].push(budget);
		});


		var tmp = {};
		budgets.forEach( (budget) => {

			var group = budget.relationships.category,
				title = budget.title;

			tmp[group] = tmp[group] || []

			tmp[group]['name'] = tmp[group]['name'] || group

			tmp[group]['items'] = tmp[group]['items'] || [];

			tmp[group]['items'][title] = tmp[group]['items'][title] || {};

			tmp[group]['items'][title]['name'] = tmp[group]['items'][title]['name'] || title;

			tmp[group]['items'][title]['items'] = tmp[group]['items'][title]['items'] || [];

			tmp[group]['items'][title]['items'].push(budget)

			// tmp[group]['items'][title]['name']['items'].push(budget)

		});

		
		Object.keys(tmp).map( function( group )
  		{

  			var items = tmp[group]['items'];

  			tmp[group]['items'] = [];

  			Object.keys(items).map( (item) => {
  				tmp[group]['items'].push(items[item])
  			})

  			budgetGroups.push(tmp[group]);
  		});

  		// console.log(budgetGroups)
		

		return (
			<div className="budget-list">
				{budgetGroups.map((group, idx) => {

					return (
						<BudgetGroup {...this.props} group = {group} key = {idx} />
					)
				})}
			</div>
		)
	}
});

module.exports = BudgetList