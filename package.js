Package.describe({
	summary: "Upload files using Filepicker.io as the backend, using HandleBars tags."
});

Package.on_use(function (api) {
	api.use('coffeescript','client');
	api.add_files('test.js', 'client');
	
	api.add_files('filepicker-io.js', 'client');
	api.export('FilePicker','client');
	
});
