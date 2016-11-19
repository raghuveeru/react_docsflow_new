import React from 'react';

var InputFileMaterial = React.createClass({
	render: function(){

		return (
			<div className='docflow-form-control'>				
				<label className="material-file">
					<input type="file" name={this.props.name} multiple={true} />
				</label>
				<span className="text-hint" style = {{ fontSize: '14px', fontStyle: 'italic'}}>Max per file size limit is 4 MB. Press the Control key to select multiple files.</span>
			</div>
		)
	}
});

module.exports = InputFileMaterial;
