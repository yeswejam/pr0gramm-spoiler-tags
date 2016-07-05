

GEM.define('GEM.layout.Container',{

    _extend : 'GEM.layout.Component',

    _defaults : {
        type : 'div',
        attr: {
            'class' : 'container',
        },
        css: {
            width :200,
            height :200,
        }
    },
    $_isDefined : false,
    _init : function(){

        this.init();
    },
    _class :  function Container(){

        var _this = this;


        var getSuffix =  function(prop){

            var ret = '';
            switch(prop){
                case 'width' :
                case 'height' :
                case 'left' :
                case 'right' :
                case 'top' :
                case 'bottom': ret = 'px';break;
                default : return '';
            }
            return ret;
        };

        this.bindDOM = function(name){
            Object.defineProperty(_this,name, {
                set : function (prop) {
                    if(this.$ !== undefined){
                        this.$.css(name,prop+getSuffix(name));
                    }
                    this.css[name] = prop;
                },
                get : function () {
                    return this.css[name];
                }
            });
        };

        this.init = function(){
            console.log(this.getParentClass().prototype);
            _parent.prototype.init.call(this);


            this.$ = jQuery('<'+this.type+' />',this.attr);
            this.css.foreach(function(name,value){
                _this.bindDOM(name);
                _this[name] = value;
            });
        };

        return this;
    }
});
