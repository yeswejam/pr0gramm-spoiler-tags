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

            this.testMethod = function(){
                return null;
            }

            this.init = function(){



            };



            return this;
        };

        GEM.classes['GEM.Base'] = Base;
        GEM.classes['GEM.BaseWrapper'] = BaseWrapper;


        GEM.classes['GEM.BaseWrapper'].prototype.extend = function () {

            return jQuery.prototype.extend.apply(this, [true, this].concat(this.args.call(arguments)));
        };

        GEM.classes['GEM.BaseWrapper'].prototype.args = function () {

            var args =  [].slice.call(this);

            return args;
        };

        GEM.classes['GEM.Base'].prototype = new BaseWrapper();
        GEM.classes['GEM.Base'].prototype.constructor = GEM.classes['GEM.Base'];




    })();


}