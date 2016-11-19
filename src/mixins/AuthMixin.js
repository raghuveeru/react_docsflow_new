import React from 'react';

var AuthMixin = {  
  childContextTypes: {
    currentUser: React.PropTypes.object
  },
  getChildContext: function() {

    var _flux = this.props.flux || (this.context && this.context.flux);
    
    return {
      currentUser: _flux.store('AuthStore').getState().currentUser
    }
  }
};

module.exports = AuthMixin;
