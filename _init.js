core.core.routes();

routes = new Routes();

// Stuff for three-templates
three_templates_routes = new Routes();
three_templates_routes.add(/assets\/(.*)/, "three-templates/assets/$1");
three_templates_routes.add(/.*/, "controller");
routes.add("three-templates", three_templates_routes);

// Stuff for student
student_routes = new Routes();
student_routes.student = "student";
student_routes.course = "course";
student_routes.add("students", "student", {extra: {action: "list"}});
student_routes.add("courses", "course", {extra: {action: "list"}});
student_routes.add(/assets\/(.*)/, "student/assets/$1");
routes.add("student", student_routes);
