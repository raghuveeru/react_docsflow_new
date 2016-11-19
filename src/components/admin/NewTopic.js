import React from 'react';
import InputMaterial from '../InputMaterial';
import Fluxxor from 'fluxxor';
import {validationOptions} from './../../constants';

var FluxMixin = Fluxxor.FluxMixin(React);

var NewTopic = React.createClass({
	contextTypes: {
		currentUser: React.PropTypes.object
	},
	getInitialState: function(){
		var {topic} = this.props;

		return {
			name: topic? topic.name: '',
			userId: this.context.currentUser.id
		}
	},
	componentDidMount: function(){

		setTimeout(()=> {
			this.refs.firstInput.getDOMNode().getElementsByTagName('input')[0].focus()
		}, 0)

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);

	},
	onSave: function(event){

		if(this.$form.valid()){

			event && event.preventDefault();

			/**
			 * Check if there is topic prop (Edit more)
			 */

			if(this.props.topic){

				this.props.flux.actions.AdminActions.editMainTopic({
					id: this.props.topic.id,
					name: this.state.name,
					userId: this.context.currentUser.id
				}, () => {
					this.props.closeModal.call(this)
				})

			}else{

				this.props.flux.actions.AdminActions.createMainTopic(this.state, () => {
					this.props.closeModal.call(this)
				})
			}

		}

	},
	getDefaultProps: function(){

		return {
			title: 'Create new topic',
			buttonTitle: 'Submit'
		}
	},
	render: function(){

		var {topic} = this.props;

		var topic_id = topic? topic.id: null,
			topic_name = topic? topic.name: '';

		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{this.props.title}
				</div>
				<form className="modal-dialog-body" onSubmit = {this.onSave} ref="form">
					{topic? <input type="hidden" name = 'topicId' value = {topic_id} /> : null}
					<InputMaterial
						ref = "firstInput"
						label = 'Name of the topic'
						defaultValue = {topic_name}
						required = {true}
						onChange = { (event) => {
							this.setState({
								name: event.target.value
							})
						}}
						 />

					<div className="docflow-form-control docsflow-submit-control">
						<button className="docsflow-btn docsflow-btn-primary" onClick = {this.onSave}>{this.props.buttonTitle}</button>
						<a className="docsflow-btn docsflow-btn--unstyled" onClick = {this.props.closeModal}>Cancel</a>
					</div>
				</form>
			</div>
		)
	}
});


module.exports = NewTopic
