    GEM.define('GEM.pr0gramm.UI',{

        _extend : 'GEM.manager.ComponentManager',
        _require : [
            'GEM.layout.Panel',
            'GEM.layout.panel.Head',
            'GEM.layout.panel.Body',
            'GEM.pr0gramm.app.Spoiler',
        ],

        _init : function(){

           this.init('pr0gramm',jQuery);
        },
        _class :  function UI(){


            this.init = function (application,$) {

                this.application = application;
                this.$ = $;

                GEM.app = this;

                var gui = this.set('gui',this.create('GEM.layout.Panel',{
                    attr: {
                      'class' : 'vo1d-panel'
                    },
                    css : {
                        position : 'fixed',
                        top : 20,
                        right : 0,
                        height : 300,
                        width : 300,
                        background : '#fff',
                        'z-index' : 999
                    }
                }));

                gui.add('head',this.create('GEM.layout.panel.Head',{
                    css : {
                        position : 'relative',
                        right : 0,
                        width : 300,
                        background : '#c4c4c4'
                    }
                }));
                gui.add('body',this.create('GEM.layout.panel.Body',{
                    css : {
                        position : 'relative',
                        right : 0,
                        width : 300,
                        background : '#c4c4c4'
                    }
                }));


                add(gui);

                return this;
            };


            var add = function(component){

                jQuery('body').append(component.$);
            };
            return this;

    }
});
