core.ext.asstring();

index = function(){
    var ctx = {};
    ctx.count = myCounter;
    resp = new HttpResponse(
        Ext.asString(function(){ djang10.loadTemplate('index')(ctx); })
    );
    ctx.count.increment();
    return resp;
};
