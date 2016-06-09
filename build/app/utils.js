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
