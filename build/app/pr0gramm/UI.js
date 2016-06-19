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


            var _this = this;

            this.init = function (application,$) {

                this.application = application;
                this.$ = $;

                GEM.set(application,this);

                this.gui = this.create('GEM.layout.Panel',{
                    attr: {
                      'class' : 'vo1d-panel'
                    },
                    css : {
                        position : 'fixed',
                        right : 0,
                        width : 300
                    }
                });
                console.log(this.gui);
                this.gui.add('head',this.create('GEM.layout.panel.Head',{
                    css : {
                        position : 'fixed',
                        right : 0,
                        width : 300
                    }
                }));
                this.gui.add('body',this.create('GEM.layout.panel.Body',{
                    css : {
                        position : 'fixed',
                        right : 0,
                        width : 300
                    }
                }));


                add(this.gui);

            };


        var add = function(component){

            jQuery('body').append(component.$);
        };




        return this;
    }
});
