var IDown = {
	detectInterval: null,
	pageReference: {
		"_jx516" : "feed",
		"_42elc" : "profile"
	},
	init: function() {
		var self = this;
		// the main loop of this script, adding buttons to images	
		var loader = setInterval(function() {
			// wait until jQuery is loaded
			if (typeof $ === "undefined") {
				return;
			}

			// once loaded, stop the outer interval
			clearInterval(loader);

			// begin the inner interval looking for new images to add a download link to
			self.detectInterval = setInterval(function() {
				self.detectPage();
			}, 250);

		}, 250);
	},

	// figure out what page we're on so we know what to do.
	detectPage: function() {
		var self = this;
		var page = 'unknown';

		// these are subject to change, I imagine.  
		// might want to find a more bulletproof way once it changes
		if ($('main > article._42elc').length) {
			// user profile page
			page = "profile";
		} else if ($('main > section._jx516').length) {
			// feed page
			page = "feed";
		}
		IDown.findImages(page);
	},

	// find images on the page and add button links for download
	findImages: function(page) {
		if (typeof page === 'undefined') {
			return false;
		}

		console.log('seeking images for page ' + page);
	}
};

// initialize the module
IDown.init();