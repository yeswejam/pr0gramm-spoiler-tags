
 new (function ClassManager(){



    var callbackCounter  = 0;

    this.count = function(){

        return  callbackCounter+= 1

    };


    this.callbacks = {

        list : {},
        add : {},
        ready : {},
    };

    this.getCallback = function(id){

        var callback = this.callbacks.list[id];

        if(callback !== undefined && callback.constructor === Function ){
            return this.callbacks.list[id]
        }

        return function(){};
    };


    this.addCallback = function() {

        var cid = this.count();
        GEM.toObjectCache(cid,arguments[0]);
        if (arguments[0] !== undefined){

            return cid;
        }

        if (arguments[0] === String) {

            if (!this.hasOwnProperty(arguments[0])) {

                this[arguments[0]] = [];
            }
            return this[arguments[0]][cid] = arguments[1];
        }

        if (arguments[0].constructor === Function) {

            return this[cid] = arguments[0];
        }
    }


    GEM.set('SystemManager',this);

    return this;
});