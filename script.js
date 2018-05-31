var IDown = {
	detectInterval: null,
	pageReference: {
		"_1SP8R" : "feed",
		"_42elc" : "profile",
	},
	findClass: {
		image: "KL4Bh"
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
				IDown.detectImage();
			}, 125);

		}, 250);
	},

	// figure out what page we're on so we know what to do.
	detectImage: function() {
		var page = 'unknown';

		// these are subject to change, I imagine.  
		// might want to find a more bulletproof way once it changes
		if ($('video:not(.idowned):first').length) {
			var ele = $('video:not(.idowned):first').first();
			IDown.findVideoInElement(ele);
		} else if ($('img.FFVAD:not(.idowned)').length) {
			var ele = $('img.FFVAD:not(.idowned):first').first();
			IDown.findImageInPopup(ele);
		}
		// IDown.findImages(page);
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
		var button_html = '<a class="' + button_class + '" href="' + img_src + '" download target="_blank">&#8681</a>';
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
		var insertPoint = $(ele).parent().parent();
		if (videoUrl.length) {
			//TODO: refactor this to combine with the drawButton function
			var button_html = '<a class="iDownBtn video" href="' + videoUrl + '" download target="_blank">&#x25ba;</a>';
			
			$(button_html)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.hide()
				.fadeIn()
				.insertAfter(insertPoint);
		}
	}
};

// initialize the module
IDown.init();