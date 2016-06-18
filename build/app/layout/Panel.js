

GEM.define('GEM.layout.Panel',{

        _extend : 'GEM.layout.Container',
        _require : [
            'GEM.layout.Button',
            'GEM.layout.UI',
            'GEM.pr0gramm.Spoiler'
        ],
        _class :  function Panel(){

            this.test = '2';



            return this.super(arguments);
        }
    }
);
