// install some libraries

core.content.forms();
core.db.modelBase();
core.core.routes();

if (__path__) {
	student_site_root = '/student';
	__path__.models.utils();
	__path__.models.course();
	__path__.models.student();
	djang10.addTemplateRoot(__path__.views);
} else {
	student_site_root = '';
	local.models.utils();
	local.models.course();
	local.models.student();
	djang10.addTemplateRoot(local.views);
}

// setup routing
var routes = Routes.create();

routes.student = "student";
routes.add( "students" , "student" , { extra : { action : "list" } } );
routes.add( "courses" , "course" , { extra : { action : "list" } } );

