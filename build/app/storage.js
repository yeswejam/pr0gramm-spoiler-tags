
if(window.GEM !== undefined) {

    GEM.set('storage', (function(){

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
    }).call({}));
}