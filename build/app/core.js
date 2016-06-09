


window.GEM = (function(d,w){
    /**
     *
     * @type {{dev: boolean, service: Array, requires: {}, path: {repo: {base: string, version: string, app: string}}, alias: {jQuery: string}}}
     * @private
     */
    var _data = {

        dev : false,

        service : [],
        requires :{},
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
    };


    /**
     *
     * @returns {string}
     */
    var getAppPath = function(){

        var _path = [],
            _repo = _data.path.repo,
            $ = $ || jQuery;

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
                    var path =  w.location.pathname.split('/');

                    path.splice(path.length-1,path.length);
                    path.push('app');
                    path.push(script+'.js');
                    path.join('/');
                    return path.join('/');
                }
                return getFilePath(script);
        }
    };


    /**
     *
     * @param script
     */
    this.require = function(script){

        var sc =  d.createElement('script');


        d.getElementsByTagName('body')[0].appendChild(sc);

        sc.setAttribute('type','text/javascript');
        sc.setAttribute('src',getScript(script));

        _data.requires[sc.src] = false;

        sc.onload =  function (e) {
            _data.requires[this.src] = true;
        };


    };


    /**
     *
     * @param cb
     */
    this.ready = function(cb){

        var inte = setInterval(function(){

            var ready = true;

            _data.requires.foreach(function(){
                console.log(this);
                if(this == false) ready = false;
            });

            if(ready){
                clearInterval(inte);
                cb.call(GEM);

            }
        },20);

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

}).call({},document,window);