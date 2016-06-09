
window.GEM = (function(d,w){

    var _data = {

        dev : true,

        service : [],
        requires :{
        },

        path : {
            build : 'https://github.com/yeswejam/pr0gramm-spoiler-tags/build/app/'
        },
        alias : {

            jQuery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'
        }
    };


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
    this.get = function(name){

        return _data.service[name];
    };

    this.set = function(name,service){

         _data.service[name] = service;
    };


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
                return _data.path.build[script]+'.js' ;
        }
    };
    return this;

}).call({},document,window);