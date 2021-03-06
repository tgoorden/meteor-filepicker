Package.describe({
	summary: "Upload files using Filepicker.io as the backend, using HandleBars tags."
});

Package.on_use(function (api) {
	api.use('handlebars','client');
	api.use('jquery','client');
	api.use('coffeescript','client');
	api.add_files('filepicker-io.coffee', 'client');
	api.export('FilePickerIO','client');
	
});
