

GEM.define('GEM.layout.Container',{


    _extend : 'GEM.layout.Component',

    $_isDefined : false,

    _class :  function Container(){

        this.type = 'div';
        this.attr = {
            'class' : 'container'
        };




        return this;
    }
});
