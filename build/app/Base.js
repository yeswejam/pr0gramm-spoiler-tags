if(window.GEM !== undefined) {
    (function () {

        var args = function () {
            return [].slice.call(this);
        };

        var extend = function () {

            var arg = [true, this].concat(args.call(arguments));

                return $.prototype.extend.apply(this,arg);

        };

        var BaseWrapper = function BaseWrapper(){


            return this;
        };

        var Base = function Base(){

            this.parents = [];
            this.data = {};


            this.getClassName = function(){

                return this._className;
            };
            this.getParentName = function(){

                return this._parentName;
            };

            this.getParentClass = function(){

                return GEM.getClass(this.getParentName());
            };

            this.create = function(){

               return GEM.create.apply(GEM,arguments);
            };

            this.get = function(key){


                return key === undefined ? this.data : this.data[key];
            };
            this.set = function(key,value){

               return  this.data[key]=value;
            };




            extend.apply(this,arguments);

            return this;
        };

        var manager = GEM.get('ClassManager'),
            base    = manager.classes['GEM.Base'] = Base,
            wrapper = manager.classes['GEM.BaseWrapper'] = BaseWrapper;



        wrapper.prototype.extend = function () {

            var arg = this.args.call(arguments[0]);
            var ext = [true, this].concat(arg);

            return jQuery.prototype.extend.apply(this, ext);
        };


        function recursiveConstruct(_self,obj,arg){

            if(obj.hasOwnProperty('_parent') && obj._className !== 'GEM.Base'){

                var args = obj.data.__args;

                console.log(obj._className);
                console.log(obj._defaults);
                arg.unshift(obj._defaults);
                /*
                obj.constructor.apply(_self,args);
                obj.super(args);
                obj.constructed = true;
                //obj.__construct();
*/
                recursiveConstruct(_self,obj._parent,arg);
            }
        }
        wrapper.prototype.args = function () {

            var args =  [].slice.call(this);

            return args;
        };

        base.prototype = new BaseWrapper();
        base.prototype.constructor = base;

    })();


}