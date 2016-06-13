

GEM.define('GEM.layout.Component',{

    _extend : 'GEM.Base',

    _class :  function Component(){



        this.css = {
                'left' : 2,
                'right' : 3,

        };


        this.add = function(name,component){

            this.setComponent(name,component);

            component.parent = this;

            this.$.append(component.$);
        };

        this.setComponent = function(n,c){
            _cmp[n] = c;
        };

        this.getComponent = function(c){
            return _cmp[c];
        };

        this.listComponents = function(c){
            _cmp.foreach(function(k){
                console.log(k);
            });
            return _cmp[c];
        };


        this.super(arguments);


        return this.super(arguments);;
    }
    }
)
