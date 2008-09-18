core.ext.asstring();
__path__.forms();

Views = {
	index: function (params) {
		// Give params a default value of {}
		params = params || {};

		// Create a context to be passed to the template
		var ctx = {};
		ctx.event_form = new EventForm({data: params.event_data});
		ctx.user_form = new UserForm({data: params.user_data});
		ctx.musician_form = new MusicianForm({data: params.musician_data});
		// Demonstration of using a prefix, which prefixes all field names when the form renders
		// Make sure to specify the same prefix here as we do in the form's POST handler
		ctx.transaction_form = new TransactionForm({data: params.transaction_data, prefix: 'a-prefix'});

		// Render the index template
		__path__.templates.index(ctx);
		return;
	},

	event: function() {
		// Redirect on anything but POST
		if (request.getMethod() !== 'POST') {
			response.setResponseCode(303);
			response.setHeader("Location", "/index");
			return null;
		}

		// Instantiate a new event form with the POST data
		var f = new EventForm({data: request, files: {file_upload: request.getFile('file_upload')}});

		// If the form isn't valid then display the index page with incorrect values
		if (!f.is_valid()) {
			return Views.index({event_data: request});
		}

		// If the form is valid then display a nice success message
		var ctx = {form: f};
		return __path__.templates.event(ctx);
	},

	user_view: function() {
		// Redirect on anything but POST
		if (request.getMethod() !== 'POST') {
			response.setResponseCode(303);
			response.setHeader("Location", "/index");
			return null;
		}

		// Instantiate a new event form with the POST data
		var f = new UserForm({data: request});

		// If the form isn't valid then display the index page with incorrect values
		if (!f.is_valid()) {
			return Views.index({user_data: request});
		}

		// If the form is valid then display a nice success message
		var ctx = {form: f};
		return __path__.templates.user(ctx);
	},

	musician: function() {
		// Redirect on anything but POST
		if (request.getMethod() !== 'POST') {
			response.setResponseCode(303);
			response.setHeader("Location", "/index");
			return null;
		}

		// Instantiate a new event form with the POST data
		var f = new MusicianForm({data: request});

		// If the form isn't valid then display the index page with incorrect values
		if (!f.is_valid()) {
			return Views.index({musician_data: request});
		}

		// If the form is valid then display a nice success message
		var ctx = {form: f};
		return __path__.templates.musician(ctx);
	},

	transaction: function() {
		// Redirect on anything but POST
		if (request.getMethod() !== 'POST') {
			response.setResponseCode(303);
			response.setHeader("Location", "/index");
			return null;
		}

		// Instantiate a new event form with the POST data
		// Make sure to use the same prefix here as we do in the GET handler (in index()).
		// All of the data is looked for using keys equal to field names prefixed with a-prefix
		var f = new TransactionForm({data: request, prefix: 'a-prefix'});

		// If the form isn't valid then display the index page with incorrect values
		if (!f.is_valid()) {
			return Views.index({transaction_data: request});
		}

		// If the form is valid then display a nice success message
		var ctx = {form: f};
		return __path__.templates.transaction(ctx);
	}
};
