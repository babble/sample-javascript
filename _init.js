core.core.routes();

routes = new Routes();

// Stuff for three-templates
three_templates_routes = new Routes();
three_templates_routes.add(/assets\/(.*)/, "three-templates/assets/$1");
three_templates_routes.add(/.*/, "controller");

routes.add("three-templates", three_templates_routes);
