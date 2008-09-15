urlpatterns = [[/user/, 'local.formsapp.views.user_view'],
               [/musician/, 'local.formsapp.views.musician'],
               [/event/, 'local.formsapp.views.event'],
               [/transaction/, 'local.formsapp.views.transaction'],
               [/.*/, 'local.formsapp.views.index']];
