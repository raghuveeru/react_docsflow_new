import React from 'react';
import utils from './../utilities';
import _ from 'lodash';

var Select2 = React.createClass({
	getDefaultProps: function(){

		return {
			multiple: false,
			allowClear: false
		}
	},
	componentDidUpdate: function(nextProps){

		if(!_.isEqual(nextProps.defaultValue, this.props.defaultValue)){
			
			$(this.refs.select.getDOMNode()).select2('val', nextProps.defaultValue)
		}
	},
	componentWillUnmount: function(){

		$(this.refs.select.getDOMNode()).select2('destroy')
	},
	componentDidMount: function(){

		var select = this.refs.select.getDOMNode();
		var self = this;

		var options = {			
			// placeholder: this.props.placeholder,
			placeholder: 'Select',
			allowClear: this.props.allowClear,
			formatResult: this.props.formatResult			
		};

		var {query} = this.props;
		
		if(this.props.url){
			
			options = jQuery.extend({}, options, {
				data:{ text: "name" },				
				multiple: this.props.multiple || false,				
				initSelection: (element, callback) => {

					callback(this.props.defaultValue)
				},
				ajax: {
					url: this.props.url,
					dataType: 'json',
					data: function (term, page) {

						var term = {
			                q: term, // search term
			            };

			        	return jQuery.extend({}, self.getQuery(), term)
			        },
			        results: function (data, page) { 
			        	
	            		return { results: data.data };
	        		},        		
	        		cache: true
				}
			});
		}

		var $select = $(select).select2(options)
		
		$select.on('change', (event) => {
				
			this.props.onChange && this.props.onChange.call(this, event.val, event.added || event.removed, event)
		});

	},
	getQuery: function(){

		var {query} = this.props;
		
		return query || {}
	},
	shouldComponentUpdate: function(nextProps){
		
		return nextProps.children != this.props.children || nextProps.defaultValue != this.props.defaultValue
	},
	render: function(){

		var {defaultValue, className} = this.props,
			selected = '';

		if(defaultValue){

			if(defaultValue instanceof Array){
				selected = []
				for(var i = 0; i < defaultValue.length; i++){
					selected.push(defaultValue[i].id)
				}
			}else{
				selected = defaultValue.id
			}
		}

		var label = <label className="label-select">{this.props.placeholder}</label>;
		var klassName= 'select2-element ' + (className? className: '');

		if(!this.props.url){

			return (
				<div className={klassName}>
					{label}
					<select 
						required ={this.props.required}
						ref= "select" 
						disabled = {this.props.disabled}
						defaultValue = {this.props.value}
						name = {this.props.name}>
						{this.props.children}
					</select>
				</div>
			)
		}
		
		return (
			<div className={klassName}>
				{label}
				<input 
					disabled = {this.props.disabled}
					required ={this.props.required}
					type="text" 
					ref="select" 
					name = {this.props.name} 
					value = {selected} />				
			</div>
		)
	}
});

module.exports = Select2;