if(window.GEM !== undefined) {
    (function () {

        var args = function () {
            return [].slice.call(this);
        };

        var extend = function () {

            var arg = [true, this].concat(args.call(arguments));
            console.log(arg);
            return jQuery.prototype.extend.apply(this,arg);
        };

        var BaseWrapper = function BaseWrapper(){return this;};

        var Base = function Base(){
            var _this = this;

            this.constructed = false;
            this.parents = [];
            this.data = {};




            this.getClassName = function(){

                return this._className;
            }
            this.getParentName = function(){

                return this._parentName;
            }

            this.create = function(){

               return GEM.create.apply(GEM,arguments);
            };

            this.get = function(key){

                return this.data[key];
            };
            this.set = function(key,value){

                this.data[key]=value;
            };

            this.testMethod = function(){
                return null;
            }
            return this;
        };

        var manager = GEM.get('ClassManager'),
            base    = manager.classes['GEM.Base'] = Base,
            wrapper = manager.classes['GEM.BaseWrapper'] = BaseWrapper;



        wrapper.prototype.super = function(){

            var arg = args.call(arguments[0]);

            if(arguments[1] !== undefined){
                arg.push(arguments[1]);
            }
            recursiveConstruct(this,this._parent,arg);



            arg.clean(undefined);

            extend.apply(this,arg);

            this._id = GEM.count();

            GEM.toObjectCache(this._id,this);

            this.data.__args = arg;

            //if(!this.constructed){

            this.__construct(arg);

          //  }

            return  this;
        }

        wrapper.prototype.defaults = function(){

            return extend.apply(this,[].concat(args.call(arguments[0])));
        }

        wrapper.prototype.extend = function () {

            var arg = this.args.call(arguments[0]);
            var ext = [true, this].concat(arg);


            return jQuery.prototype.extend.apply(this, ext);
        };

        wrapper.prototype.__construct = function(){};
        wrapper.prototype.__parentConstruct = function(){

            if(!this.constructed && !this._parent.constructed) {

                //recursiveConstruct(this,this._parent);
            }
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