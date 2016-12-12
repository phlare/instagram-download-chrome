var IDown = {
	detectInterval: null,
	pageReference: {
		"_jx516" : "feed",
		"_42elc" : "profile"
	},
	init: function() {
		// the main loop of this script, adding buttons to images	
		var loader = setInterval(function() {
			// wait until jQuery is loaded
			if (typeof $ === "undefined") {
				return;
			}

			// once loaded, stop the outer interval
			clearInterval(loader);

			// begin the inner interval looking for new images to add a download link to
			IDown.detectInterval = setInterval(function() {
				IDown.detectPage();
			}, 125);

		}, 250);
	},

	// figure out what page we're on so we know what to do.
	detectPage: function() {
		var page = 'unknown';

		// these are subject to change, I imagine.  
		// might want to find a more bulletproof way once it changes
		if ($('main > article._42elc').length) {
			// user profile page
			page = "profile";
		} else if ($('main > section._jx516').length) {
			// feed page
			page = "feed";
		} else if ($('main > article._3n7ri').length) {
			page = "hashtag";
		}
		IDown.findImages(page);
	},

	// find images on the page and add button links for download
	findImages: function(page) {

		if (typeof page === 'undefined') {
			return false;
		}

		// console.log('seeking images for page ' + page);
		switch (page) {
			case 'profile':
			case 'hashtag':
				$('a._8mlbc:not(.idowned):first').each(function(i) {
					var self = this;
					// mark as being tracked
					$(self).addClass('idowned');
					
					IDown.drawButton(self, 'profile');
					
				});
				break;
			case 'feed':
				$('article._8ab8k:not(.idowned):first').each(function(i) {
					var self = this;
					// mark it as being tracked
					$(self).addClass('idowned');

					IDown.drawButton(self);

		        });
				break;
			case 'unknown':
			case 'default':
				return false;
		}
	},
	drawButton: function(ele, addClass) {
		// get link if there's an image
		var img = $(ele).find('div._jjzlb > img');
		if (img.length) {
			var img_src = img.attr('src');
			var button_class = "iDownBtn";
			if (typeof addClass === "string") {
				button_class += ' ' + addClass;
			}
			var button_html = '<a class="' + button_class + '" href="' + img_src + '" download>&#8681</a>';
			$(button_html)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.hide()
				.fadeIn()
				.insertAfter(ele.lastChild);
		} else {
			return false;
		}
	}
};

// initialize the module
IDown.init();