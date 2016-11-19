import Timer from '../../node_modules/react-timer/lib/Timer' // 'react-timer'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

var CountdownTimer = React.createClass({
  render: function(){
    var OPTIONS = { prefix: 'seconds elapsed!', delay: 100};
    return(
      <div>
        <Timer options={OPTIONS} />
      </div>
    )
  }
});
module.exports =  CountdownTimer;
//ReactDOM.render( <CountdownTimer />, document.getElementById('docsflow-timer') )
