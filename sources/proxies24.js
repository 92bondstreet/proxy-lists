'use strict';

var _ = require('underscore');

var linkSelectors = [
	'.blog-posts .post-outer:nth-child(1) h3 a',
	'.blog-posts .post-outer:nth-child(3) h3 a',
	'#Feed1_feedItemListDisplay > ul > li:nth-child(1) > span > a',
	'#Feed1_feedItemListDisplay > ul > li:nth-child(3) > span > a',
	'#Feed2_feedItemListDisplay > ul > li:nth-child(1) > span > a',
	'#Feed2_feedItemListDisplay > ul > li:nth-child(3) > span > a',
];

var subListDefinition = {
	// Each sub-list will have its own link selector.
	link: { selector: null },
	items: [{
		selector: 'pre,textarea',
		parse: function(text) {
			return text.trim().split('\n').map(function(item) {
				var match = item.trim().match(/^([0-9.]+):([0-9]+)/);
				if (!match || !match[1] || !match[2]) return null;
				var ipAddress = match[1];
				var port = parseInt(match[2]);
				if (_.isNaN(port)) return null;
				return {
					ipAddress: ipAddress,
					port: port,
				};
			}).filter(Boolean);
		},
	}],
};

module.exports = {
	homeUrl: 'http://proxyserverlist-24.blogspot.com/',
	abstract: 'list-crawler',
	defaultOptions: {
		defaultTimeout: 5000,
	},
	config: {
		lists: [{
			link: {
				url: 'http://proxyserverlist-24.blogspot.com/',
			},
			lists: _.map(linkSelectors, function(linkSelector) {
				return _.extend({}, subListDefinition, {
					link: { selector: linkSelector },
				});
			}),
		}],
	},
};
