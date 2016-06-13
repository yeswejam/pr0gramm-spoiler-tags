
if(window.GEM !== undefined) {

    GEM.define('GEM.io.Storage', {

        _extend : 'GEM.Base',

        _class :  function Storage(){

            this.setNameSpace = function(namespace){
                this.namespace = namespace;
                return this;
            };
            this.set = function(n,v){
                localStorage.setItem(this.namespace+'|'+n,v);
            };
            this.get = function(n){
                localStorage.getItem(this.namespace+'|'+n);
            };
            return this;
        }
    });
}