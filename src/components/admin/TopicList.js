import React from 'react';
import MainTopicTitle from './MainTopicTitle';
import BudgetCutTopicItem from './BudgetCutTopicItem';
import BudgetCutTopicForm from './BudgetCutTopicForm';
import Sortable from 'Sortablejs';
import SortableMixin from 'Sortablejs/react-sortable-mixin';
import _ from 'lodash';

var TopicList = React.createClass({
	getInitialState: function(){

		return {
			isOpen: true,
			showAdd: false
		}
	},
	toggleGroup: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	toggleAdd: function(){

		this.setState({
			showAdd: !this.state.showAdd
		})
	},
	render: function(){

		var klassName = 'group group-admin-topic' + (this.state.isOpen? ' group-open' : ' group-closed');
		var {topic, disableSort} = this.props;
		var {showAdd} = this.state;

		var budgetCutForm = disableSort? null: showAdd? <BudgetCutTopicForm
						{...this.props}
						toggleAdd = {this.toggleAdd}
						topic = {topic}
						/>: <a onClick = {this.toggleAdd} className="docsflow-a">{TRANSLATIONS.add}</a>;

		return (
			<li className={klassName}>
				<MainTopicTitle
					topic = {topic}
					toggleGroup = {this.toggleGroup}
					{...this.props}
				/>
				<div className="budget-list-item">

			        <BudgetCutTopicList budgetCutTopic = {topic.budgetCutTopic} {...this.props} />

					{budgetCutForm}
				</div>
			</li>
		)
	}
});


var BudgetCutTopicList = React.createClass({
	mixins: [SortableMixin],
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	sortableOptions: {
		model: "topics",
		handle: '.drag-handle'
	},
	getInitialState: function(){
		return {
			topics: this.props.budgetCutTopic
		}
	},
	componentWillReceiveProps: function(nextProps){

		this.setState({
			topics: nextProps.budgetCutTopic
		})
	},
	handleSort: function (event) {

		this.props.flux.actions.AdminActions.updateSubTopics({
			topicId: this.props.topic.id,
			topics: this.state.topics,
			userId: this.context.currentUser.id
		})
	},
	render: function(){

		var {topics} = this.state;
		// console.log(this.props)

		return (
			<ul className="sub-topic-list">
			{topics.map( (topic, idx) => {
				// console.log(topic)
				return <BudgetCutTopicItem {...this.props} key = {idx} budgetCutTopic = {topic} />
			})}
			</ul>
		)
	}
})

module.exports = TopicList
