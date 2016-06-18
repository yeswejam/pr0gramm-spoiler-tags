


window.GEM = (function(d,w){
    /**
     *
     * @type {{dev: boolean, service: Array, requires: {}, path: {repo: {base: string, version: string, app: string}}, alias: {jQuery: string}}}
     * @private
     */
    var _data = {

        dev : true,
        writable: false,
        path : {
            repo : {
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
        service : [],
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

    this.getData = function(){
        var c = {};
        for(var i in _data){
            c[i] = _data[i];
        }
        return c;
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

                    return path.join('/') ;

                }
                return getFilePath(script);
        }
    };



    this.getCallback = function(id){

        var callback = _data.callbacks.list[id];

        if(callback !== undefined && callback.constructor === Function ){
            return _data.callbacks.list[id]
        }
        return function(){};
    };


    this.addCallback = function() {

        var cid = this.count();

        if (arguments[0] !== undefined){

            return cid;
        }

        if (arguments[0] === String) {

            if (!_data.callbacks.hasOwnProperty(arguments[0])) {

                _data.callbacks[arguments[0]] = [];
            }
            return _data.callbacks[arguments[0]][cid] = arguments[1];
        }

        if (arguments[0].constructor === Function) {

            return _data.callbacks[cid] = arguments[0];
        }
    }


    this.require = function(){

        return this.get('ClassManager').require.apply(this.get('ClassManager'),arguments);
    };

    this.define = function(){

        return this.get('ClassManager').define.apply(this.get('ClassManager'),arguments);
    };


    /**
     *
     * @param cb
     */
    this.ready = function(cb){

        var ret = null;

        var cid = this.addCallback('ready',cb);
        var value = '1';
        $(window).load(function(){

            var inte = setInterval(function(){

                var ready = true;

                _data.requires.foreach(function(){
                    if(this == false) ready = false;
                });

                if(ready){

                    clearInterval(inte);

                    GEM.get('ClassManager').inheritNow(function(){

                       GEM.get('ClassManager').fireInitFunctions();

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

    this.create = function(){

        var _classname = Array.prototype.splice.call(arguments,0,1)[0],
            _class = this.getClass(_classname)

        return _class === Function ? {} : _class.apply(new _class,arguments);
    };

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

    addBase('GEM.manager.ClassManager');
    addBase('app');

    return this;

}).call(new (function GEM(){}),document,window);

