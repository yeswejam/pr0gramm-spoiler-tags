GEM.define('GEM.manager.ComponentManager',{

    _extend : 'GEM.Base',
    _class :  function ComponentManager(){

        this.__construct = function(){

        };


        this.add = function(name,component){

            this.set(name,component);

            component.parent = this;
            this.$.append(component.$);
        };

        this.set = function(n,c){
            this.components[n] = c;
        };

        this.get = function(c){
            return this.components[c];
        };

        this.listComponents = function(c){
            this.components.foreach(function(k){
                console.log(k);
            });
            return this.components[c];
        };


        return this;
    }
});
