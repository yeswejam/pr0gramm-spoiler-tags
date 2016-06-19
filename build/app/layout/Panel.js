

GEM.define('GEM.layout.Panel',{

        _extend : 'GEM.layout.Container',
        _require : [
            'GEM.layout.Button'
        ],
        _class :  function Panel(){




            this.__construct = function(){

                this.$ = jQuery('<'+this.type+' />',this.attr);

            };



            return this;
        }
    }
);
