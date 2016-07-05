

GEM.define('GEM.layout.panel.Body',{

    _extend : 'GEM.layout.Container',

    _defaults : {
        type : 'div',
        attr: {
            'class' : 'panel-body',
        },
        css: {
            position: 'relative',
            top  : 0,
            right: 22
        }
    },
    _class :  function PanelBody(){



        return this;

    }
});
