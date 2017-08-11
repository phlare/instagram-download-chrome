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
		if ($('video:not(.idowned):first').length) {
			var ele = $('video:not(.idowned):first').first();
			IDown.findVideoInElement(ele);
		} else if ($('img._2di5p').length) {
			var ele = $('img._2di5p:not(.idowned):first').first();
			IDown.findImageInPopup(ele);
		} else if ($('main > article._42elc').length) {
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
	// find image on popup or page and add button link
	findImageInPopup: function(ele) {
		if (typeof ele === 'undefined') {
			return false;
		}
		// add class so we don't try again
		$(ele).addClass('idowned');
		var img_src = $(ele).attr('src');

		var button_class = "iDownBtn profile";
		var insertPoint = $(ele).parent();
		var button_html = '<a class="' + button_class + '" href="' + img_src + '" download>&#8681</a>';
		$(button_html)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.hide()
			.fadeIn()
			.insertAfter(insertPoint);
	},
	// find video on popup or page and add button link 
	findVideoInElement: function(ele) {
		if (typeof ele === 'undefined') {
			return false;
		}
		// add class so we don't try again for the same element
		$(ele).addClass('idowned');
		var videoUrl = $(ele).attr('src');
		var insertPoint = $(ele).closest('article').find('div._4c5eh');
		if (videoUrl.length) {
			//TODO: refactor this to combine with the drawButton function
			var button_html = '<a class="iDownBtn video" href="' + videoUrl + '" download>&#x25ba;</a>';
			
			$(button_html)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.hide()
				.fadeIn()
				.insertAfter(insertPoint);
		}

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