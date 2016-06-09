Object.defineProperty(Object.prototype,'foreach',{
    value: function(cb){
        var i,k;
        if(this.constructor === Array){
            for(i = 0; i < this.length; i++){
                cb.call(this[i],i,this.indexOf(this[i]));
            }
        }
        if(this.constructor === Object){
            for(k in this){
                cb.call(this[k],k,this[k]);
            }
        }
        return this;
    }
});
Object.defineProperty(Object.prototype,'removeFromArray',{
    value: function(mixed){
        if(mixed.constructor === Array && mixed.indexOf(this) !== -1){
            Array.prototype.splice.apply(mixed,[mixed.indexOf(this),1]);
        }
    }
});
Object.defineProperty(Object.prototype,'equals',{
    value: function(mixed){
        return this == mixed;
    }
});
