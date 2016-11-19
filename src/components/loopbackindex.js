/*!
 * loopback-current-user <https://github.com/yahoohung/loopback-current-user>
 *
 * Copyright (c) 2016, Marshall Chan.
 * Licensed under the MIT License.
 */
'use strict';

var loopback = require('loopback');

module.exports = {
	get: function(){
		var context = loopback.getCurrentContext();
		var accessToken = context && context.get('accessToken');
		return accessToken && accessToken.userId;
	}
}
