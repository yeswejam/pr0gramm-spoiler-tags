
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
                base : 'https://github.com/yeswejam/pr0gramm-spoiler-tags',
                version : 'master',
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
            _repo = _data.path.repo ;

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

        sc.onload =  function (e) {
             _data.requires[this.src] = true;
        };
        d.getElementsByTagName('body')[0].appendChild(sc);

        sc.setAttribute('type','text/javascript');
        sc.setAttribute('src',getScript(script));

        _data.requires[sc.src] = false;

    };


    /**
     *
     * @param cb
     */
    this.ready = function(cb){

        var inte = setInterval(function(){

            var ready = true;

            _data.requires.foreach(function(){
                if(this === false) ready = false;
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


    return this;

}).call({},document,window);