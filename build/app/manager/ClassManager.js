
new (function ClassManager(){

    var _data = GEM.getData(),
        _this  = this;



    this.classes = {};


    this.getClass = function(name){

        return undefined === name ? this.classes : this.classes[name];
    };
    this.setClass = function(name,_class){

        this.classes[name] = _class;
    };

    this.classExists = function(c){

        return this.classes[c] !== undefined && typeof this.classes[c] == 'function';
    };

    this.isRequired = function(name){

        return  _data.required.hasOwnProperty(name);
    };
    this.isIncluded = function(name){

        return _data.included.indexOf(name) != -1;
    };

    /**
     *
     * @param script
     */
    this.require = function(script,callback,args){

        var requires =  script.constructor === Array ? script : [script];

        if(!_data.coreRequired){
            requires =  _data.core.require.concat(requires);
            _data.coreRequired = true;
        }
        requires.foreach(function(){

            if(this == 'jQuery' &&  _data.dev) return
            if(this == 'GEM.BaseWrapper') return;

            if(_this.isRequired(this)) return;
            _data.required[this] = true;
            _data.classReady[this] = false;
            _data.loading = true;

            if(callback !== undefined){
                GEM.get('SystemManager').addCallback(callback);
            }

            require.call(_this,this,callback);
        });

        function require(src, cb){

            var scriptSource = GEM.getScript(src);

            _data.requires[scriptSource] = false;

            $.getScript(scriptSource).done(function( script ) {

                var x = '2';
                eval(script);

                _data.requires[scriptSource] = true;

                if(typeof cb == 'function' ){

                    cb.call(_this);
                }

            }).fail(function( jqxhr, settings, exception ) {
                console.log( 'error' ); // 200
                console.log( exception); // 200
            });

            return this;
        }

        return GEM;
    };

    function require(_require){

        if(_require === undefined) return;

        _this.require(_require);
    }


    this.define = function(name,args){

        var defines  = _data.defines,
            _extend  = args._extend,
            _require = args._require,
            _this    = this;

        if(defines.hasOwnProperty(name) && _data.defines[name]){
            return ;
        }
        _data.defines[name] = args;
        _this.setClass(name, args._class);



        if(undefined !== _require){
            _require = _require.constructor === Array ? _require : [_require];
            _require.foreach(function(){
                require(this);
            });
        }

        if(undefined === _extend && defines.hasOwnProperty(_extend) && _data.defines[_extend]){
            return;
        }
        require(_extend);
    };




    this.fireInitFunctions = function(){

        _data.defines.foreach(function(){
            if(this.hasOwnProperty('_init')){
                this._init.apply(new this._class,arguments);
            }
        });
    };


    this.inheritNow = function(_c){

        var _extend = [],
            _exists = {},
            _inherit = {};

        _this.data = GEM.getData();

        _inherit['GEM.Base'] = {_class : 'GEM.Base'};

        function collect(){

            _data.defines.foreach(function(k,v){
                _exists[k] = false;

                if(v._extend !='GEM.Base' && k.indexOf('GEM.') !== -1){
                    _exists[v._extend] =  v._extend !='GEM.Base';
                }
                _inherit[k] = {_class : k, _parent : v._extend};
            });
        }

        function reposition(){

            _extend.push(_inherit['GEM.Base']);

            _inherit.foreach(function(k,add){
                _extend.unshift(add);
            });

            do{
                var reloop = false,
                    passed = false;

                _extend.foreach(function(i){
                    if(!reloop){
                         reloop = orderClassParentList(this,reloop)
                    }
                });

            }while(reloop);

            passed = true;

            function orderClassParentList(elem,reloop){

                if(passed) return _extend;

                var i = _extend.indexOf(elem);

                _extend.foreach(function(i2){
                    if(elem._class == this._parent && i2 > i && reloop == false){
                        reloop = true;
                            _extend.move(_extend.indexOf(this),_extend.indexOf(elem));
                    }
                });

                return reloop;
            }

            return _extend;
        }


        function validate(){

            var pass = true;

            _data.defines.foreach(function(k,v){

                if((k !='GEM.Base' || v._extend !='GEM.Base')  && k.indexOf('GEM.') !== -1){

                    _extend[k]         = false;
                    _extend[v._extend] = false;
                }

                _extend[k]         = _this.classExists(k);
                _extend[v._extend] = _this.classExists(v._extend);

                if(_extend[k] == false || _extend[v] == false){
                    pass = false;
                }
            });

            return pass;
        }

        var int = setInterval(function(){

            collect();

            if(validate()){

                var _extend = reposition();

                _extend.reverse();

                _extend.foreach(function(){

                    if(this._class == 'GEM.Base') return;

                    var _class  = _this.classes[this._class],
                        _parent = _this.classes[this._parent];

                    try{
                        _class.prototype = new _parent;

                    }catch (e){

                        var x = e;

                    }
                    
                    _class.prototype.constructor = _class;
                    _class.prototype._parent = _parent.prototype;

                    _class.prototype._className  = this._class;
                    _class.prototype._parentName = this._parent;
                });

                _extend.reverse();

                _extend.foreach(function(){

                    _this.classes[this._class].prototype.constructor = _this.classes[this._class];

                    _data.classReady[this._class] = true;
                });

                _c();
                clearInterval(int);
            }
        },20);
    }

    /**
     *
     * @param cb
     */
    this.ready = function(cb){

        var ret = null;

        var cid =  GEM.get('SystemManager').addCallback('ready',cb);

        var value = '1';
        $(window).load(function(){

            var inte = setInterval(function(){

                var ready = true;

                _data.requires.foreach(function(){
                    if(this == false) ready = false;
                });

                if(ready){

                    clearInterval(inte);

                    _this.inheritNow(function(){

                        _this.fireInitFunctions();

                        cb.call(GEM);
                    });
                }
            },20);

        });
        return {
            then : function(c){

                _data.callbacks.then[cid] = c;

                if(c !== undefined){
                    c.call(_this,value);
                }

                return value;
            }
        };
    };

    GEM.set('ClassManager',this);

    return this;
});