


window.GEM = (function(d,w){
    /**
     *
     * @type {{dev: boolean, service: Array, requires: {}, path: {repo: {base: string, version: string, app: string}}, alias: {jQuery: string}}}
     * @private
     */
    var _data = {

        dev : true,
        counter : 0,
        service : [],
        included :[],
        requires :{},
        defines  :{},
        inheritance : {},
        classReady : {},
        loading : false,
        callbacks : {
            ready : []
        },
        path : {
            repo : {
                base : 'http://rawgit.com/yeswejam/pr0gramm-spoiler-tags',
                version : 'dev',
                app : 'build/app/'
            }
        },
        alias : {

            jQuery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'
        }
    },_this = this;

    this.classes = {};


    this.getData = function(){
        return _data;
    }

    /**
     *
     * @returns {string}
     */
    var getAppPath = function(){

        var _path = [],
            _repo = _data.path.repo;

        if(!_repo.hasOwnProperty('fullpath')){
            _repo.foreach(function(){
                _path.push(this);
            });
            _repo.fullpath = _path.join('/');
        }
        return  _repo.fullpath;
    };

    /**
     *
     * @param script
     * @returns {string}
     */
    var getFilePath = function(script){

        return getAppPath()+script+'.js';
    };

    /**
     *
     * @param script
     * @returns {*}
     */
    var getScript = function(script){

        switch (script){
            case 'jQuery' : return  _data.alias[script];
            default :
                if(_data.dev){

                    var path =  w.location.pathname.split('/'),
                        scriptpath = script.split('.');
                    scriptpath.splice(0,1);
                    scriptpath[scriptpath.length-1] = scriptpath[scriptpath.length-1]+'.js';

                    path.splice(path.length-1,path.length);
                    path.push('app');
                    path =  path.concat(scriptpath);

                    return path.join('/') ;

                }
                return getFilePath(script);
        }
    };


    this.classExists = function(c){

        return this.classes[c] !== undefined && typeof this.classes[c] == 'function';
    }

    /**
     *
     * @param script
     */
    this.require = function(script,version,cb){

        if(script == 'jQuery' &&  !_data.dev) return;
        var data = _data.included.indexOf(script)
        if(_data.included.indexOf(script) != -1) return;
        if(script == 'GEM.BaseWrapper') return;
/*
        var sc =  d.createElement('script');



        sc.onload =  function (e) {


        };

        d.getElementsByTagName('body')[0].appendChild(sc);

        var src = getScript(script);

        sc.setAttribute('type','text/javascript');
        sc.setAttribute('src',src);


*/
        var src = getScript(script);
        _data.requires[src] = false;
        _data.loading = true;
        _data.included.push(script);

        $.getScript(src)
            .done(function( script, textStatus ) {

                eval(script);
                _data.requires[src] = true;


                if(typeof cb == "function" ){
                    cb.call(_this);
                }
            })
            .fail(function( jqxhr, settings, exception ) {
                console.log( 'error' ); // 200
                console.log( exception); // 200

            });


    };

    this.isDefined = function(name){

        return  _data.included.indexOf(name) != -1;
    };

    this.define = function(name,args){




            if(!_data.defines.hasOwnProperty(name)){

                _data.defines[name] = args;

                this.classes[name] = args._class;



                if(args.hasOwnProperty('_extend') && this.classes[args._extend] !== Function){

                    var recursiveInherit = function(_class,_parent){

                        _this.require(_parent,null,function(){

                            var defines = _data.defines[_parent];

                            if(defines !== undefined && defines._extend !== undefined){

                                recursiveInherit(defines._class,defines._extend)
                            }
                            _data.inheritance[name] = _parent;


                        });
                    }


                    recursiveInherit(args._class,args._extend);



                }

            }

    }



    this.inheritNow = function(cb){

        var data = [],
            exists = {},
            chain = {};

        var _chain = {} ;


        _data.defines.foreach(function(k,v){
            exists[k] = false;
            if(v._extend !='GEM.Base' && k.indexOf('GEM.') !== -1){
                exists[v._extend] =  v._extend !='GEM.Base';
            }


            if(v._extend){
                data.push({_class : k, _parent : v._extend});

                if(!chain.hasOwnProperty(k)){
                    _chain[k] = [];
                }
                _chain[k].push(v._extend);
            }

        });
        var _c = {};

        _data.defines.foreach(function(k,v){

        });


        var _list = {} ;
        var _list1 ={};
        var _list2 =[];
        var times = 0;
        function computeChain(){

            var pass= true;

            data.foreach(function(){

                var _this = this;


                data.foreach(function(k1,v1){



                    _list1[this._class] =  this._parent;

                    if(this._class == _this._class) return;

                    _list = _chain[_this._class];

                    if(_list.indexOf(this._parent) == -1 && _list.indexOf(this._class) != -1){




                        _list.push(this._parent);



                        computeChain();

                    }
                });
                var l = {};
                l[this._class] = this._parent;
                if(times == 0){
                    _list2.push(l);
                }
            });


            times++;
        }
        computeChain();



 var l = [];

        var arrayUnique = function(a) {
            return a.reduce(function(p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
            }, []);
        };
        var x = arrayUnique(_list2);

        /*
        var _list2= $.map(_list1, function(value, index) {

            var obj = {};
            obj[index] = value;
            l.push(obj);
            return [value];
        });
*/


        l.foreach(function(name,parent){


            console.log(name + ' -> ' + parent);
        });


        function inherit(_class,_parent){

            _class.prototype.constructor = _class;
            _class.prototype._parent = _parent;

            _class.prototype.__className  = this._class;
            _class.prototype.__parentName = this._parent;
        }

        var int = setInterval(function(){
            var pass = true;
            _data.defines.foreach(function(k,v){
                if((k !='GEM.Base' || v._extend !='GEM.Base')  && k.indexOf('GEM.') !== -1){
                    exists[k] = false;
                    exists[v._extend] = false;
                }
                exists[k] = GEM.classExists(k);
                exists[v._extend] = GEM.classExists(v._extend);

                if(exists[k] == false || exists[v] == false){
                    pass = false;
                }
            });
            if(pass){
               clearInterval(int);

                data.reverse();

                console.log(data);
                data.foreach(function(){
                    console.log(this._class + ' extends ' + this._parent);
                    var _class = _this.classes[this._class],
                        _parent = _this.classes[this._parent];

                    try{
                        _class.prototype = new _parent;
                    }catch (e){
                        console.log('exception');
                        console.log(e);
                    }

                    _class.prototype.constructor = _class;
                    _class.prototype._parent = _parent;

                    _class.prototype.__className  = this._class;
                    _class.prototype.__parentName = this._parent;
                });

                data.reverse();

                data.foreach(function(){

                    _this.classes[this._class].prototype.constructor = _this.classes[this._class]
                    _data.classReady[this._class] = true;
                });

                cb();


            }
        },20);




    }

    /**
     *
     * @param cb
     */
    this.ready = function(cb){

        _data.callbacks.ready.push(cb);

        var ret = null;

        $(window).load(function(){



        var inte = setInterval(function(){

            var ready = true;

            _data.requires.foreach(function(){
                if(this == false) ready = false;
            });


            if(ready){
                if(_this.loading){
                    return this.ready(cb);
                }
                clearInterval(inte);
                //  ret = cb.call(GEM);

                var cbs =_data.callbacks.ready;

                GEM.inheritNow(function(){

                    cbs.foreach(function(){

                        var cb


                        this.call(GEM);

                        var index = cbs.indexOf(this);

                        Array.prototype.splice.apply(cbs,[index,index+1]);
                    });

                });



            }
        },20);
        });
        return ret;
    };


    function create(){
        var name = arguments[0];

        if(_data.classReady[arguments[0]]){
            var _class = this.getClass(name);

            return _class.apply(new _class,[].slice.call(arguments,1,arguments.length));
        }


        return GEM.create.apply(GEM,arguments);

    };

    this.create = function(){

        var name = arguments[0];
        var o = {};


        this.require(name);


        return create.apply(this,arguments);
    };

    this.getClass = function(classname){

        var _class = this.classes[classname];

        if(_class === Function) return _class;


        this.require(classname);






        return this.classes[classname];
    };

    /**
     *
     * @param name
     * @returns {*}
     */
    this.get = function(name){

        return _data.service[name];
    };

    /**
     *
     * @param name
     * @param service
     */
    this.set = function(name,service){

        _data.service[name] = service;
    };

    this.count = function(){

        return _data.counter++;
    };


    Object.defineProperty(Object.prototype,'foreach',{
        value: function(cb){
            var i,k;
            if(this.constructor === Array){
                for(i = 0; i < this.length; i++){
                    cb.call(this[i],i,this.indexOf(this[i]));
                }
            }
            if(this.constructor === Object){
                for(k in this){
                    cb.call(this[k],k,this[k]);
                }
            }
            return this;
        }
    });




    return this;

}).call(new (function GEM(){}),document,window);