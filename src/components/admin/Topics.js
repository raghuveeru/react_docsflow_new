import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewTopic from './NewTopic';
import {customStyles} from '../../constants';
import TopicList from './TopicList';
import SortableMixin from 'Sortablejs/react-sortable-mixin';
import Select2 from './../Select2';

var currentDate = new Date();
var currentYear = currentDate.getFullYear();

var Topics = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isModalOpen: false,
		}
	},
	getInitialState: function(){

		return {
			year: currentYear
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){

		this.requestTopics();

		this.props.flux.actions.AdminActions.getTopicYears();

	},
	requestTopics: function(){

		this.props.flux.actions.AdminActions.getMainTopics({
			year: this.state.year
		})
	},
	closeModal: function(){

		this.setState({
			isModalOpen: false
		})
	},
	openModal: function(){

		this.setState({
			isModalOpen: true
		})
	},
	render: function(){

		var {topics, topicYears} = this.state.AdminStore;
		var disableSort = this.state.year != currentYear;

		topicYears = topicYears.filter( (year) => year != currentYear)

		return (
			<div>
				{disableSort?
					<span className="docsflow-card-link" style = {{opacity: 0.6}}><em className="fa fa-plus" />Add topic</span>
					:
					<a className="docsflow-card-link" onClick = {this.openModal}><em className="fa fa-plus" />Add topic</a>
				}
				<Select2
					className="topic-select-year"
					placeholder="Select year"
					value = {currentYear}
					onChange = { (val) => {

						this.setState({
							year: val
						}, this.requestTopics)

					}}
				>
					<option>{currentYear}</option>
					{topicYears.map( (year, idx) => <option key = {idx}>{year}</option> )}
				</Select2>
				<Modal
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewTopic {...this.props} closeModal = {this.closeModal} />
				</Modal>

				<TopicsSortable topics = {topics} {...this.props} disableSort = {disableSort} />
			</div>
		)
	}
});


var TopicsSortable = React.createClass({
	mixins: [SortableMixin],
	sortableOptions: {
		model: "maintopics",
		handle: '.drag-handle-main-topic'
	},
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getDefaultProps: function(){
		return {
			disableSort : false
		}
	},
	getInitialState: function(){
		return {
			maintopics: this.props.topics
		}
	},
	componentWillReceiveProps: function(nextProps){

		this.setState({
			maintopics: nextProps.topics
		})
	},
	handleSort: function (event) {

		this.props.flux.actions.AdminActions.updateMainTopics({
			topics: this.state.maintopics,
			userId: this.context.currentUser.id
		})
	},
	componentDidUpdate: function(nextProps){

		this._sortableInstance.option('disabled', nextProps.disableSort)
	},
	render: function(){

		var {maintopics} = this.state;
		var {disableSort} = this.props;
		var klassName = 'main-topic-list' + (disableSort? ' disable-sort': '');

		return (
			<ul className={klassName}>
			{maintopics.map((topic, idx) => {

					return <TopicList {...this.props} index = {idx} key = {idx} topic = {topic} {...this.movableProps}  />
				})}
			</ul>
		)
	}
});


module.exports = Topics
