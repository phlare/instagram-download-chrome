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
		// console.log('narp');
		var loader = setInterval(function() {
			// wait until jQuery is loaded
			if (typeof $ === "undefined") {
				return;
			}

			// once loaded, stop the outer interval
			clearInterval(loader);
			// console.log('here');
			// begin the inner interval looking for new images to add a download link to
			IDown.detectInterval = setInterval(function() {
				if(location.hostname == "onlyfans.com") {
					IDown.detectOnlyFans();
				} else if (location.hostname == "www.linkedin.com") {
					IDown.detectLinkedinLike();
				} else {
					IDown.detectInstagram();	
				}
				
			}, 125);

		}, 250);
	},
	detectLinkedinLike: function() {
		if ($('.reactions-react-button button li-icon[type=like-icon]:not(.idowned)').length) {
			var ele = $('.reactions-react-button button li-icon[type=like-icon]:not(.idowned)').first();
			IDown.autoLikeLinkedin(ele);
		}
	},
	detectOnlyFans: function() {
		if ($('.b-post__media__item-inner img:not(.idowned)').length) {
			var ele = $('.b-post__media__item-inner img:not(.idowned)').first();
			IDown.findImageOnlyFans(ele);
		} else if ($('video:not(.idowned):first').length) {
			var ele = $('video:not(.idowned):first').first();
			IDown.findVideoOnlyFans(ele);
		}
	},
	// figure out what page we're on so we know what to do.
	detectInstagram: function() {
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
	autoLikeLinkedin: function(ele) {
		if (typeof ele === 'undefined') {
			return false;
		}
		$(ele).addClass('idowned');
		$(ele).click();
	},
	// find image on popup or page and add button link
	findImageOnlyFans: function(ele) {
		if (typeof ele === 'undefined') {
			return false;
		}
		// add class so we don't try again
		$(ele).addClass('idowned');
		var img_src = $(ele).attr('src');
		var img_srcset = $(ele).attr('srcset');
		if (typeof img_srcset !== 'undefined'){
			img_srcset = img_srcset.split(" ")[0];
		}
		if (typeof img_src == 'undefined' && typeof img_srcset == "string") {
			img_src = img_srcset;
		}
		var button_class = "iDownBtn onlyfans";
		var insertPoint = $(ele);
		var button_html = '<a class="' + button_class + '" href="' + img_src + '" download target="_blank">&#8681</a>';
		$(button_html)
			.on('click', function(event) {
				console.log('click');
				event.stopPropagation();
			})
			.hide()
			.fadeIn()
			.insertBefore(insertPoint);
	},
	// find video on popup or page and add button link 
	findVideoOnlyFans: function(ele) {
		if (typeof ele === 'undefined') {
			return false;
		}
		// add class so we don't try again for the same element
		$(ele).addClass('idowned');
		var videoUrl = $(ele).attr('src');
		var insertPoint = $(ele).parent().parent();
		if (videoUrl.length) {
			//TODO: refactor this to combine with the drawButton function
			var button_html = '<a class="iDownBtn onlyfans video" href="' + videoUrl + '" download target="_blank">&#x25ba;</a>';
			
			$(button_html)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.hide()
				.fadeIn()
				.insertBefore(insertPoint);
		}
	},
	// find image on popup or page and add button link
	findImageInPopup: function(ele) {
		if (typeof ele === 'undefined') {
			return false;
		}
		// add class so we don't try again
		$(ele).addClass('idowned');
		var img_src = $(ele).attr('src');
		var img_srcset = $(ele).attr('srcset');
		if (typeof img_srcset !== 'undefined'){
			img_srcset = img_srcset.split(" ")[0];
		}
		if (typeof img_src == 'undefined' && typeof img_srcset == "string") {
			img_src = img_srcset;
		}
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