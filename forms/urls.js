urlpatterns = [[/user/, '__path__.formsapp.views.user_view'],
               [/musician/, '__path__.formsapp.views.musician'],
               [/event/, '__path__.formsapp.views.event'],
               [/transaction/, '__path__.formsapp.views.transaction'],
               [/.*/, '__path__.formsapp.views.index']];
