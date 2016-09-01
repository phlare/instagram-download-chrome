var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

if (typeof $ === "undefined") {
	var j = document.createElement('script');
	j.src = "https://code.jquery.com/jquery-3.1.0.min.js";
	j.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(j);
}

console.log('instagram-download loaded');