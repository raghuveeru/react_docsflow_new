import React from 'react';

var InputMaterial = React.createClass({
	getInitialState: function(){

		return {
			isFocused: false,
			hasValue: false,
		}
	},
	handleOnFocus: function(){

		this.setState({
			isFocused: true,
		})
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
	},
	componentDidUpdate: function(nextProps){

		if(nextProps.defaultValue != this.props.defaultValue || nextProps.value != this.props.value){
			this.setState({
				hasValue: true
			})
		}
	},
	render: function(){

		var {isFocused, hasValue} = this.state;

		var klass = 'docflow-form-control' + ((hasValue)? ' label-active' : '') + (isFocused? ' label-up': '');
		var inputKlass = 'input-control ' + (this.props.className? this.props.className : '');
		var _type = this.props.type || 'text';

		return (
			<div className={klass}>
				<label
					className='label-control'
					>{this.props.label}</label>
				<input
					required = {this.props.required}
					className= {inputKlass}
					ref = 'input'
					type={_type}
					name = {this.props.name}
					disabled = {this.props.disabled}
					readOnly = {this.props.readOnly}
					onFocus = {this.handleOnFocus}
					onBlur = {this.handleOnBlur}
					defaultValue = {this.props.defaultValue}
					value = {this.props.value}
					onInput = {this.props.onChange}
				/>
			</div>
		)
	}
});

module.exports = InputMaterial;
