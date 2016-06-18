if(window.GEM !== undefined) {
    (function () {

        var args = function () {
            return [].slice.call(this);
        };

        var extend = function () {
            return jQuery.prototype.extend.apply(this, [true, this].concat(args.call(arguments)));
        };

        var BaseWrapper = function BaseWrapper(){return this;};

        var Base = function Base(){
            var _this = this;

            this.constructed = false;
            this.parents = [];

            this.super = function(){
                if(!this.hasOwnProperty('uid')){
                    this.uid =  GEM.count();
                }
                return extend.apply(this,[{}].concat(args.call(arguments[0])));
            }

            this.getClassName = function(){

                return this.__className;
            }
            this.getParentName = function(){

                return this.__parentName;
            }

            this.get = function(key){

                return GEM.service[key];
            };
            this.set = function(key,value){

                 GEM.service[key]=value;
            };

            this.testMethod = function(){
                return null;
            }
            return this;
        };

        var manager = GEM.get('ClassManager'),
            base    = manager.classes['GEM.Base'] = Base,
            wrapper = manager.classes['GEM.BaseWrapper'] = BaseWrapper;

        wrapper.prototype.extend = function () {

            return jQuery.prototype.extend.apply(this, [true, this].concat(this.args.call(arguments)));
        };

        wrapper.prototype.args = function () {

            var args =  [].slice.call(this);

            return args;
        };

        base.prototype = new BaseWrapper();
        base.prototype.constructor = base;

    })();


}