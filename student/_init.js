// install some libraries

core.content.forms();
core.db.modelBase();

if (__path__) {
	__path__.models.utils();
	__path__.models.course();
	__path__.models.student();
	djang10.addTemplateRoot(__path__.views);
} else {
	local.models.utils();
	local.models.course();
	local.models.student();
	djang10.addTemplateRoot(local.views);
}

core.core.routes();

// setup routing

routes = new Routes();

routes.student = "/student.jxp";
routes.add( "students" , "/student.jxp" , { extra : { action : "list" } } );
routes.add( "courses" , "course" , { extra : { action : "list" } } );
