

GEM.define('GEM.layout.Container',{


    _extend : 'GEM.layout.Component',

    $_isDefined : false,
    _class :  function Container(){

        var _this = this;

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

        this.css = {
            'left' : 1,
            'right' : 2,
        };


        this.$ = jQuery('<'+this.type+' />',this.attr);



        this.bindDOM = function(name){

           var define = function(){

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
           }

            this.css.foreach(function(name,value){
                 define(name);
                _this[name] = value;
            });
        };

        console.log(this);


        return this.super(arguments);
    }
});
