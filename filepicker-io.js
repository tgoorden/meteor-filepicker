FilePickerIO = function(key) {
	
	return;
};

FilePickerIO.makeDropPane = function() {
		
}

var activate = function (selector) {
	var dropzones = $(selector);
	for (var i = 0; i < dropzones.length; i++) {
		filepicker.constructWidget(dropzones[i]);
	}
}

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
			var key = Meteor.settings.public.filepicker.key;
			if (!key) {
				throw new Meteor.Error("'filepicker.key' is missing in your public settings.");
			}
			filepicker.setKey(key);
		};
		script.onerror = function (error) {
			if(typeof console != undefined) {
			        console.log(error);
			}	
		};
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	}
	// We can assume the filepicker is loaded and ready to go,
	// however, the script might not actually have loaded yet...	
	var filepicker_script = $("head #filepicker-src")[0];
	// a dummy function
	var original_onload = function() {}
       	if (typeof(filepicker_script.onload) === "function") {
		original_onload = filepicker_script.onload;
		// We'll extend the original onload function,
		// to ensure everything is executed in order
		filepicker_script.onload = function() {
			original_onload();
			activate(dropzone_selector);
			// let's avoid doing things twice:
			 filepicker_script.onload = null;
			 console.log("Locked and loaded");
		}
	} else {
		console.log("FilePicker has already loaded.");
		// it's already loaded
		activate(dropzone_selector);
	}
	
	return;	
});
