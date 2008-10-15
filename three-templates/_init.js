core.core.routes();

//  create an object for our application data. we can't just
//  use a 'scalar' as it would require us to modify the app scopea
//  which currently isn't allowed.  this is something we're working
//  on.
data = {};
data.count = 0;

// set up routing
var routes = Routes.create(local.$);

// assets don't get mapped, but everything else gets mapped to 'controller', in our case 'controller.jxp'
routes.add(/^\/assets/, null);
routes.add(/./, 'controller');
