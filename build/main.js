

GEM.require('jQuery','1.12.4');
GEM.require('utils');
GEM.require('storage');
GEM.require('pr0gramm/spoiler');


GEM.ready(function(){


    var storage = this.get('storage');
    storage.setNameSpace('pr0gramm-spoiler-tags');
    storage.set('test','yo');



});

