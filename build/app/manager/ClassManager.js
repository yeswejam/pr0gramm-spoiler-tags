
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


    function createConstructFunction(args){

        function getConstructString(){
            return  '\n' +
                '\t\tvar args = [].slice.call(arguments,1); \n' +
                '\t\tvar _parent = GEM.getClass("'+args._extend+'"); \n' +
                '\t\t_parent.apply(this,arguments);'
        }
        var _fn      = args._class.toString().trim(),
            _fnregx  = /^function\s([a-zA-Z]+)(.*?)\{/.exec(_fn),
            _fnName  = _fnregx[1],
            _func    = _fn.replace(_fnregx[0],'return '+ _fnregx[0]+ getConstructString());

        return args._class = new Function(_fnName,_func)( args._class);
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

        _this.setClass(name, createConstructFunction(args));

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
            _chain = {},
            _inherit = {},
            _extendList = {};

        _this.data = GEM.getData();

        _inherit['GEM.Base'] = {_class : 'GEM.Base'};

        function collect(){

            _data.defines.foreach(function(k,v){
                _exists[k] = false;

                if(v._extend !='GEM.Base' && k.indexOf('GEM.') !== -1){
                    _exists[v._extend] =  v._extend !='GEM.Base';
                }
                _inherit[k] = {_class : k, _parent : v._extend};

                if(v._extend){


                    if(!_chain.hasOwnProperty(k)){
                        _chain[k] = [];
                    }
                    _chain[k].push(_inherit[k]._parent);
                }
            });
        }

        function reposition(){

            _extend.push(_inherit['GEM.Base']);

            _inherit.foreach(function(k,add){
                _extend.unshift(add);
            });


            function chain(_class,_chain){

                if(!_extendList.hasOwnProperty(_class)) {

                    _extendList[_class] = new String(_class);
                }
                if(_chain.hasOwnProperty('_parent') && _chain._parent.length){

                    if(_extendList[_class].indexOf(_chain._class) != -1 && _extendList[_class].indexOf(_chain._parent) == -1){

                        _extendList[_class] +='|'+_chain._parent;
                    }
                }
            }



            function makeChain(key){

                if(_inherit[key]._class == key && _extendList[key].indexOf(_inherit[key]._parent) == -1){

                    _extendList[key] +='|'+_inherit[key]._parent;
                }else{

                    var level = _inherit[_inherit[key]._parent];

                    if(_inherit[level] !== undefined && _inherit[level].hasOwnProperty('_parent')){
                        makeChain(_inherit[level]);
                    }
                }
            }

            var pass = 0;
            function _makeClassChain(){

                _inherit.foreach(function (k,v) {
                    pass += chain(k,v);

                    _inherit.foreach(function (k1,v1) {
                        pass += chain(k1,v1);
                    });
                });
            }
            _makeClassChain();



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

                _extend.foreach(function(i){

                    if(this._class == 'GEM.Base') return;

                    var _class  = _this.classes[this._class],
                        _parent = _this.classes[this._parent],
                        _meta   = _this.data.defines[this._class];

                    try{

                        _class.prototype = Object.create(_parent.prototype);
                        _class.prototype.constructor = _class;

                    }catch (e){

                        var x = e;

                    }

                    _class.prototype._className  = this._class;
                    _class.prototype._parentName = this._parent;

                    var defaults = {};



                    _class.prototype._defaults = (function mergeDefaults(p){

                        $.extend(true,defaults,p._defaults,_meta._defaults);

                        var c = _this.getClass('GEM.BaseWrapper');


                        if(p !== c && p.hasOwnProperty('__proto__')){

                            return mergeDefaults(p.__proto__.constructor.prototype);
                        }

                        return defaults;

                    })(_parent.prototype);

                });

              /*  _extend.reverse();

                _extend.foreach(function(){

                   // _this.classes[this._class].prototype.constructor = _this.classes[this._class];

                    _data.classReady[this._class] = true;
                });
*/

                clearInterval(int);
                _c();

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