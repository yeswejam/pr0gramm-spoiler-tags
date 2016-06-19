

GEM.define('GEM.layout.panel.Body',{

        _extend : 'GEM.layout.Container',

        _class :  function PanelBody(){

            this._defaults = {
                type : 'div',
                attr : {
                    'class' : 'panel-body',
                },
                css: {
                    position: 'relative',
                    top  : 0,
                    right: 22
                }
            };
            this.__construct = function(){

                this.$ = jQuery('<'+this.type+' />',this.attr);
            };




            return this;
        }
    }
);
