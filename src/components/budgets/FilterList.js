import React from 'react';

var FilterList = React.createClass({
	onChange: function(key, value){		

		this.props.onChange.call(this, key, value)
	},
	getInitialState: function(){

		return {
			isOpen: false,
			filterText: ''
		}
	},
	changeFilterText: function(event){

		this.setState({
			filterText: event.target.value
		})
	},
	toggleShowMore: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){

		var {values, keys, active, allHTML} = this.props;
		var maxCount = 5;
		var {isOpen, filterText} = this.state;

		var showSearch = values.length > 5;
		var filteredValues = values.filter( (val) => val.name.toLowerCase().indexOf(filterText.toLowerCase()) != -1)
		
		var showMoreLink = (filteredValues.length > maxCount? (isOpen? <a className="facet-showmore facet-showless" onClick = {this.toggleShowMore}>Show less</a>: <a className="facet-showmore" onClick = {this.toggleShowMore}>Show more</a>): null);

		if(!isOpen && filteredValues.length > maxCount){
			filteredValues = filteredValues.slice(0, maxCount);
		}
		
		return (
			<div>
				{showSearch? 
				<input 
					type="text"
					placeholder="Filter"
					className="text-input"
					onChange = {this.changeFilterText}
				/>
				: null}
				<nav className="nav-sidemenu">
					{allHTML}
					{filteredValues.map((value, idx) => {

						var bounds = value.count > 0? this.onChange.bind(this, keys, value) : null
						var itemActiveClass = (active && (active == value.name || active == value.id)? 'active': '')

						return <a 
							onClick = {bounds} 
							key = {idx}
							className = {itemActiveClass}
							>
							{value.name} ({value.count})
						</a>
					})}
					{showMoreLink}
				</nav>			
			</div>
		)
	}
});

module.exports = FilterList