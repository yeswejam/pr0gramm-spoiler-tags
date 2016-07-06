

GEM.define('GEM.layout.panel.Head',{

        _extend : 'GEM.layout.Container',

        _defaults : {
            attr: {
                'class' : 'panel-head',
            },
            css: {
                position: 'relative',
                top  : 0,
                right: 22
            }
        },
        _class :  function PanelHead(){






            return this;
        }
    }
);
