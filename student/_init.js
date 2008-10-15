// install some libraries

core.content.forms();
core.db.modelBase();
core.core.routes();

if (local !== local.$) {
	student_site_root = '/student';
} else {
	student_site_root = '';
}

local.$.models.utils();
local.$.models.course();
local.$.models.student();
djang10.addTemplateRoot(local.$.views);

// setup routing
var routes = Routes.create(local.$);

routes.student = "student";
routes.add( "students" , "student" , { extra : { action : "list" } } );
routes.add( "courses" , "course" , { extra : { action : "list" } } );

