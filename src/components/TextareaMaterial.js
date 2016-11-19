import React from 'react';

var TextareaMaterial = React.createClass({
	getInitialState: function(){

		return {
			isFocused: false,
			hasValue: false,
		}
	},
	handleOnFocus: function(){

		this.setState({
			isFocused: true,
		});

		this.expandTextarea();
	},
	handleOnBlur: function(event){

		this.setState({
			isFocused: false,
			hasValue: event.target.value == ''? false: true,
		})
	},
	componentDidMount: function(){

		if(this.props.defaultValue){
			this.setState({
				hasValue: true
			})
		}

		this.expandTextarea();
	},
	componentDidUpdate: function(nextProps){

		if(nextProps.defaultValue != this.props.defaultValue || nextProps.value != this.props.value){
			this.setState({
				hasValue: true
			});

			this.expandTextarea();
		}
	},
	expandTextarea: function(){

		var el = this.refs.textarea.getDOMNode();

		var offset= !window.opera ? (el.offsetHeight - el.clientHeight) : (el.offsetHeight + parseInt(window.getComputedStyle(el, null).getPropertyValue('border-top-width'))) ;

		// $(el).addClass('textarea-autogrow')

		el.style.height = 'auto';
		el.style.height = (el.scrollHeight  + offset ) + 'px';
	},
	render: function(){

		var {isFocused, hasValue} = this.state;

		var klass = 'docflow-form-control' + ((hasValue)? ' label-active' : '') + (isFocused? ' label-up': '');

		var inputKlass = 'input-control' + (this.props.readOnly? ' input-disabled': '');
		return (
			<div className={klass}>
				<label
					className='label-control'
					>{this.props.label}</label>
				<textarea
					required = {this.props.required}
					className={inputKlass}
					onFocus = {this.handleOnFocus}
					onBlur = {this.handleOnBlur}
					onInput = {this.expandTextarea}
					defaultValue = {this.props.defaultValue}
					value = {this.props.value}
					rows={this.props.rows}
					onChange = {this.props.onChange}
					ref = 'textarea'
					name = {this.props.name}
					readOnly = {this.props.readOnly}
				/>
			</div>
		)
	}
});

module.exports = TextareaMaterial;
