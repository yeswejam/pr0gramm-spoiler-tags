


window.GEM = (function(d,w){
    /**
     *
     * @type {{dev: boolean, service: Array, requires: {}, path: {repo: {base: string, version: string, app: string}}, alias: {jQuery: string}}}
     * @private
     */
    var _data = {

        //dev : false,
        dev : true,
        writable: false,
        path : {
            repo : {
                //base : 'http://codestyle.in/stuff/wod',
                base : 'http://rawgit.com/yeswejam/pr0gramm-spoiler-tags',
                version : 'dev',
                app : 'build/app/'
            }
        },
        alias : {
            jQuery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'
        },
        core : {
            require :  [
                'jQuery',
                'GEM.Base',
                'GEM.manager.ComponentManager',
                'GEM.view.ViewController'
            ]
        },
        counter : 0,
        classes : [],
        service : {},
        included :[],
        required :{},
        requires :{},
        defines  :{},
        inheritance : {},
        classReady : {},
        loading : false,
        coreRequired : false,
        callbacks : {
            list  : [],
            then  : [],
            ready : []
        }
    };

    var _this = this;
    this.cache = [];
    this.getData = function(){
        var c = {};
        for(var i in _data){
            c[i] = _data[i];
        }
        return c;
    };

    var getAppPath = function(script){

        var _path = [],
            _repo = _data.path.repo,
            _scriptpath = script.split('.');

        if(!_repo.hasOwnProperty('fullpath')){
            _repo.foreach(function(){
                _path.push(this);
            });

            _repo.fullpath = _path.join('/');
        }
        if(_scriptpath.length>1){
            _scriptpath.splice(0,1);
        }

        return  _repo.fullpath+_scriptpath.join('/');
    };
    /**
     *
     * @param script
     * @returns {string}
     */
    var getFilePath = function(script){

        return getAppPath(script)+'.js?ts='+(+new Date());
    };

    /**
     *
     * @param script
     * @returns {*}
     */
    this.getScript = function(script){

        switch (script){
            case 'jQuery' : return  _data.alias[script];
            default :
                if(_data.dev){

                    var path =  window.location.pathname.split('/'),
                        scriptpath = script.split('.');

                    if(scriptpath.length>1){
                        scriptpath.splice(0,1);
                    }

                    scriptpath[scriptpath.length-1] = scriptpath[scriptpath.length-1]+'.js';
                    path.splice(path.length-1,path.length);
                    path.push('app');
                    path =  path.concat(scriptpath);

                    return path.join('/');

                }

                return getFilePath(script);
        }
    };

    this.count = function(){
        return this.get('SystemManager').count();
    };
    this.require = function(){

        return this.get('ClassManager').require.apply(this.get('ClassManager'),arguments);
    };

    this.define = function(){

        return this.get('ClassManager').define.apply(this.get('ClassManager'),arguments);
    };

    this.ready = function(){

        return this.get('ClassManager').ready.apply(this.get('ClassManager'),arguments);
    };

    this.create = function(){

        var _classname = Array.prototype.splice.call(arguments,0,1)[0],
            _class = this.getClass(_classname);

        if(_class === Function)  return {};


        var o = _class.apply(Object.create(_class.prototype),arguments);
        o._id = this.count();
        o.init.apply(o,arguments);
        this.toObjectCache(o._id,o);

        return  o;
    };

    this.toObjectCache = function(k,v){

        if(v !== undefined)
            this.cache[k] = v;
    }

    this.getClass = function(classname) {

        var _class = this.get('ClassManager').getClass(classname);

        return _class !== undefined ? _class : Function;
    }

    this.getClassIsReady = function(classname){

        return _data.classReady.hasOwnProperty(classname) && _data.classReady[classname];
    }

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






    Object.defineProperty(Object.prototype,'foreach',{
        value: function(cb){
            var i,k;
            if(this.constructor === Array){
                for(i = 0; i < this.length; i++){
                    cb.call(this[i],i,this.indexOf(this[i]));
                }
            }
            if(this.constructor === Object){
                var i = 0;
                for(k in this){
                    cb.call(this[k],k,this[k],i);
                    i++;
                }
            }
            return this;
        }
    });

    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this; // for testing purposes
    };

    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };

    Object.defineProperty(Object.prototype,'exact',{
        value: function(state){
            return this === state;
        }
    });

    function addBase(scriptname){
        var sc = document.createElement('script');
        sc.async = false;
        sc.src = _this.getScript(scriptname);

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(sc, s);
    }

    addBase('GEM.manager.SystemManager');
    addBase('GEM.manager.ClassManager');
    addBase('app');

    return this;

}).call(new (function GEM(){}),document,window);

