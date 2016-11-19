import React from 'react';

var AttachmentsView = React.createClass({
	render: function(){

		var {attachments} = this.props;

		return (
			<div>
			{attachments.map((attachment, index) => {
				return (
					<div className="file-attachment-block" key = {index}>
						<a className="file-attachment" href={attachment.downloadUrl} key = {index}>
							<span className="file-attachment-name">{attachment.fileName}</span>
						</a>
						<span className="file-attachment-size">({attachment.fileSize})</span>
						{attachment.date? <span className="file-attachment-date">{attachment.date}</span> : null}
					</div>
				)
			})}
			</div>
		)
	}
});

module.exports = AttachmentsView;