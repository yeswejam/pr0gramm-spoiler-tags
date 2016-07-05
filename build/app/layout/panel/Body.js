

GEM.define('GEM.layout.panel.Body',{

        _extend : 'GEM.layout.Container',

        _class :  function PanelBody(){

            this.attr = {
                'class' : 'panel-body',
            };

            this.css =  {
                position: 'relative',
                top  : 0,
                right: 22
            };





            return this;
        }
    }
);
