core.core.routes();

var routes = Routes.create();

// send every request to the controller, which will call appropriate views based on the requested url
routes.add("/", "controller", {extra: {requested_url: ""}});
routes.add(/^\/(\w+)$/, "controller", {names: ['requested_url']});
