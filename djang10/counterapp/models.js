Counter = function(){
    this.i = 0;
};

Counter.prototype.increment = function(){
    this.i += 1;
    return this.get();
};

Counter.prototype.get = function(){
    return this.i;
};
