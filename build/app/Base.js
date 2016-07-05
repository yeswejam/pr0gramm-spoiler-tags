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
            this.data.arguments = arguments;


            this.create = function(){

                var o = GEM.create.apply(GEM,arguments);

                var arg = [true, this].concat(args.call(arguments));

                $.prototype.extend.apply(o,arg);

               return o;
            };

            this.get = function(key){


                return key === undefined ? this.data : this.data[key];
            };
            this.set = function(key,value){

               return  this.data[key]=value;
            };


            var arg = [true, this,this._defaults].concat(args.call(arguments));

            $.prototype.extend.apply(this,arg);

            console.log(arg);
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

        wrapper.prototype.init = function(){

            var arg = [true, this].concat(args.call(this.data.arguments));

            $.prototype.extend.apply(this,arg);
   /*         console.log(this.getParentName());
            console.log(GEM.getClass(this.getParentName()));
            console.log(GEM.getClass(this.getParentName()).prototype);
            console.log(GEM.getClass(this.getParentName()).prototype.__proto__);

*/
            if(undefined !== this.getParentClass().prototype.__proto__.getClassName()){
                this.getParentClass().prototype.__proto__.init.call(this);
            }




            return this._className;
        };



        wrapper.prototype.getClassName = function(){

            return this._className;
        };
        wrapper.prototype.getParentName = function(){

            return this._parentName;
        };
        wrapper.prototype.getParentClass = function(){

            return GEM.getClass(this.getParentName()).prototype.__proto__.constructor;
        };




        function recursiveConstruct(_self,obj,arg){

            if(obj.hasOwnProperty('_parent') && obj._className !== 'GEM.Base'){

                var args = obj.data.__args;
/*
                console.log(obj._className);
                console.log(obj._defaults);*/
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