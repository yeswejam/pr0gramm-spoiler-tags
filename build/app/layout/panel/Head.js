

GEM.define('GEM.layout.panel.Head',{

        _extend : 'GEM.layout.Container',

        _class :  function PanelHead(){
            this._defaults = {
                type : 'div',
                attr : {
                  'class' : 'panel-head',
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
