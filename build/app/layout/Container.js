

GEM.define('GEM.layout.Container',{

    _extend : 'GEM.layout.Component',

    _defaults : {
        type : 'div',
        attr: {
            'class' : 'container',
        },
        css: {
            width :'auto',
            height :'auto',
        }
    },
    $_isDefined : false,

    _class :  function Container(){


        return this;
    }
});
