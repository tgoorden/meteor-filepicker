class FilePickerIO
	constructor: (key) ->
		filepicker_src = $("head #filepicker-src")
		if !filepicker_src.length
			script = document.createElement 'script'
			script.type = 'text/javascript'
			script.src = '//api.filepicker.io/v1/filepicker.js'
			script.id = 'filepicker-src'
			script.onload = ()->
				if !key && Meteor.settings.public.filepicker.key
					key = Meteor.settings.public.filepicker.key
				if !key
					throw new Meteor.Error "'filepicker.key' is missing in your public settings and not specified in the constructor."
				filepicker.setKey key
			script.onerror = (error) ->
				console.log error
			head = document.getElementsByTagName('head')[0]
			head.appendChild(script)
		if Meteor.setting.public.filepicker.options
			this.defaultOptions = Meteor.setting.public.filepicker.options
		else
			this.defaultOptions =
				multiple: true
				mimetype: */*
		return
	makeDropPane: (dropPane,options) ->
		initialize()
		filepicker.makeDropPane(dropPane, options)

