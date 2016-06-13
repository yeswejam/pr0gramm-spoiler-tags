
if(window.GEM !== undefined) {

    GEM.set('ui', (function(){

        var _this = this;

        this.application = null;

        this.init = function (application,$) {

            this.application = application;
            this.$ = $;

            return buildSkeleton.call(this);
        };

        var buildSkeleton = function(){


            this.panel = new Container({
                css : {
                    position : 'fixed',
                    right : 0,
                    width : 300
                }

            });
            this.panel.add('head',new PanelHead);

            this.panel.add('body',new PanelBody({
                attr: {
                    id: 'vo1d-panel-body'
                },
                css: {
                    height: 200,
                }
            }));

            add(this.panel);

            return this;
        };

        var args = function(){
           return [].slice.call(this);
        };

        var extend = function(){

            return jQuery.prototype.extend.apply(this,[true,this].concat(args.call(arguments)));
        };

        var add = function(component){

            jQuery('body').append(component.$);
        };

        var getSuffix =  function(prop){

            switch(prop){
                case 'width' :
                case 'height' :
                case 'left' :
                case 'right' :
                case 'top' :
                case 'bottom': return 'px';
                default : return '';
            }
        }

        function UiCmp(){

            var args = arguments[0] || {},
                _this = this,
                _cmp = {},
                _uid =  GEM.count();

            var _default = {
                uid :  _uid,
                type : 'div',
                attr : {
                    'data-uid' : _uid
                },
                css: {
                    position: 'relative',
                    top  : 0,
                    right: 0
                }
            };

            extend.apply(this,[_default,args]);

            this.$ = jQuery('<'+this.type+' />',this.attr);


            this.add = function(name,component){

                this.setComponent(name,component);

                component.parent = this;

                this.$.append(component.$);
            };

            this.setComponent = function(n,c){
                _cmp[n] = c;
            };

            this.getComponent = function(c){
              return _cmp[c];
            };

            this.listComponents = function(c){
                _cmp.foreach(function(k){
                    console.log(k);
                });
                return _cmp[c];
            };

            this.bindDOM = function(name){
                Object.defineProperty(_this,name, {
                    set : function (prop) {
                        if(this.$ !== undefined){
                            this.$.css(name,prop+getSuffix(prop));
                        }
                        this.css[name] = prop;
                    },
                    get : function () {
                        return this.css[name];
                    }
                });
            };

            this.css.foreach(function(name,value){
                _this.bindDOM(name);
                _this[name] = value;
            });
        }



        function Container(){

            this.constructor.apply(this,args.call(arguments));


            return this;
        }

        function PanelHead(){

            this.super({
                attr: {
                    id: 'vo1d-panel-head'
                },
                css: {
                    height: 220,
                }
            });


            return this;
        }

        function PanelBody(){

            this.constructor.apply(this,arguments);


            return this;
        }


        UiCmp.prototype.super = function(){


            this.constructor.apply(this,args.call(arguments));
        }

        Container.prototype = UiCmp.prototype;
        //Container.prototype.constructor = Container;

        PanelHead.prototype = Container.prototype;
        //PanelHead.prototype.constructor = PanelHead;

        PanelBody.prototype = Container.prototype;
        //PanelBody.prototype.constructor = PanelBody;

        //Panel.prototype.constructor = Panel;





        return this;
    }).call({}));
}