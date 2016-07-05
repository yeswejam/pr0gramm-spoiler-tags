

GEM.define('GEM.layout.Component',{

    _extend : 'GEM.Base',


    _defaults : {

        attr: {
            'data-id' : this._id,
        },
        css: {
            position: 'relative',
            top  : 0,
            right: 0
        }
    },
    _class :  function Component(){

        var _this = this;

        this.components = {};


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



        return this;
    }
    }
)
