

GEM.define('GEM.layout.Container',{


    _extend : 'GEM.layout.Component',

    $_isDefined : false,

    _class :  function Container(){

        this.__construct = function(){

            this.$ = jQuery('<'+this.type+' />',this.attr);
        };

        this._defaults = {
            type : 'div',
            attr : {
                'class' : 'container',
                'data-id' : this._id,
            },
            css: {
                position: 'relative',
                top  : 0,
                right: 0
            }
        };




        return this;
    }
});
