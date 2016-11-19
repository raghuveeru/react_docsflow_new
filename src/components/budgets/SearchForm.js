import React from 'react';

var SearchForm = React.createClass({
	clearQuery: function(nextProps){

		var _input = this.refs.Input.getDOMNode();

		_input.value = '';

		_input.focus();

		this.props.onClear.call(this)
	},
	render: function(){

		var {
			defaultValue
		} = this.props;

		return (
			<div className="docsflow-sp-card-search sp-search-top">
				<div className="text-wrap">
					<input
						className="text-input"
						type="text"
						ref = 'Input'
						placeholder={this.props.placeholder}
						onChange = {this.props.onChange}
						defaultValue = {this.props.defaultValue}
					/>

					{defaultValue?
						<button className="docsflow-btn docsflow-btn--unstyled" onClick = {this.clearQuery}>
							<em className="fa fa-times" />
						</button>
						:
						<button className="docsflow-btn docsflow-btn--unstyled" onClick = {this.props.onSubmit}>
							<em className="fa fa-search" />
						</button>
					}
				</div>
				<a className="link-toggle-filter"><i className="fa fa-filter"></i></a>
			</div>
		)
	}
});

module.exports = SearchForm
