import React from 'react';
import BudgetCutTopicForm from './BudgetCutTopicForm';

var BudgetCutTopicItem = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){

		return {
			isEditing: false
		}
	},
	toggleEdit: function(){

		this.setState({
			isEditing: !this.state.isEditing
		})
	},
	onDelete: function(){

		var {budgetCutTopic, topic} = this.props

		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deleteBudgetCutTopic({
				topicId: topic.id,
				budgetCutTopicId: budgetCutTopic.id,
				userId: this.context.currentUser.id
			})

		}
	},
	render: function(){

		var {budgetCutTopic, topic, disableSort} = this.props;
		var {isEditing} = this.state;
		var klassName = 'budget-list-subitem' + (isEditing? ' budget-list-subitem--editing' : '');

		return (
			<li className={klassName}>
				<span className="drag-handle topic-drag-handle fa fa-bars"></span>
				<span>{budgetCutTopic.name}</span>
				{isEditing? <BudgetCutTopicForm
					{...this.props}
					topic = {topic}
					toggleAdd = {this.toggleEdit}
					budgetCutTopic = {budgetCutTopic}
					buttonTitle = 'Submit'
				/> : null}

				{disableSort? null: <div className="topic-cell-actions">
					<a onClick = {this.toggleEdit} className="link-edit">Edit</a>
					<a onClick = {this.onDelete} className="link-delete">Delete</a>
				</div>}
			</li>
		)
	}
});

module.exports = BudgetCutTopicItem
