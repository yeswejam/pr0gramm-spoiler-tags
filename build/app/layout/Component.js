

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
    _init : function(){

        this.init();
    },
    _class :  function Component(){

        var _this = this;

        this.components = {};

        this.init = function(){

            _parent.prototype.init.call(this);

            this.$ = jQuery('<'+this.data.type+' />',this.data.attr);
            this.$.css(this.data.css);

            $.extend(true,this.__proto__, this.$);

            return this;
        };



        this.add = function(name,component){

            this.set(name,component);

            component._parent = this;

            this.$.append(component);
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
