FilePicker = function() {
	var FilePicker = {
		version: "0.1"
	}
}();


Handlebars.registerHelper('filepicker', function(dropzone_selector) {
	// If the filepicker helper is called, we first check to see if
	// the filepicker js is already loaded as a script.
	// If not, we add it to the head.
	var filepicker_src = $("head #filepicker-src");
	if (!filepicker_src.length) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '//api.filepicker.io/v1/filepicker.js';
		script.id = 'filepicker-src';
		script.onload = function () {
			if (!Meteor.settings) {
				throw new Meteor.Error("No Meteor settings found.");
			}
			var key = Meteor.settings.public["filepicker_key"];
			if (!key) {
				throw new Meteor.Error("'filepicker_key' is missing in your public settings.");
			}
			filepicker.setKey(key);
			var dropzones = document.getElementById(dropzone_selector);
			filepicker.constructWidget(dropzones);
		};
		script.onerror = function (error) {
			if(typeof console != undefined) {
			        console.log(error);
			}	
		};
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	}
	// we can assume the filepicker is loaded and ready to go
	// console.log(dropzones);
	return;	
});
