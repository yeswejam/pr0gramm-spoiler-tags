

GEM.define('GEM.layout.Component',{

    _extend : 'GEM.Base',


    _class :  function Component(){


        this.attr ={
            'data-id' : this._id,
        };

        this.css = {
            position: 'relative',
            top  : 0,
            right: 0
        };


        this.data = {};
        this.components = {};


        var getSuffix =  function(prop){

            switch(prop){
                case 'width' :
                case 'height' :
                case 'left' :
                case 'right' :
                case 'top' :
                case 'bottom': return 'px';
                default : return '';
            }
        }





        this.add = function(name,component){

            this.set(name,component);

            component.parent = this;

            this.$.append(component.$);
        };

        this.set = function(n,c){
            this.components[n] = c;
        };

        this.get = function(c){
            return this.components[c];
        };

        this.listComponents = function(c){
            this.components.foreach(function(k){
                console.log(k);
            });
            return this.components[c];
        };
/*
        this.bindDOM = function(name){
            Object.defineProperty(_this,name, {
                set : function (prop) {
                    if(this.$ !== undefined){
                        this.$.css(name,prop+getSuffix(prop));
                    }
                    this.css[name] = prop;
                },
                get : function () {
                    return this.css[name];
                }
            });

        };

        this.css.foreach(function(name,value){
            _this.bindDOM(name);
            _this[name] = value;
        });

*/

        this.$ = jQuery('<'+this.type+' />',this.attr);

        return this;
    }
    }
)
