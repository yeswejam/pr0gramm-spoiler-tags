

GEM.define('GEM.view.ViewController',{

        _extend : 'GEM.Base',

        _class :  function ViewController(){

            this.css = {
                'left'  : 2,
                'right' : 3
            };

            this.$ = jQuery('<'+this.type+' />',this.attr);

            return this;
        }
    }
);
