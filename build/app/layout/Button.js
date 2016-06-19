

GEM.define('GEM.layout.Button',{

        _extend : 'GEM.layout.Component',

        _class :  function Button(){

            this.__construct = function(){

                this.attr['data-uid'] = this._uid;
                this.$ = jQuery('<'+this.type+' />',this.attr);
            };



            return this;;
        }
    }
)
