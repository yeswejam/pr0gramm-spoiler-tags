

if(window.GEM !== undefined) {

    GEM.set('spoiler', {

        layer: [],
        storage : GEM.get('storage'),

        isActive: function () {
            return this.storage.exists();
        },
        activate: function () {
            this.getStorage().set();
            this.tags.triggerChange();
        },
        deactivate: function () {
            this.getStorage().delete();
            this.tags.removeLayer();
        },
        process: function (container) {

            var container = $(container);

            if (container.attr('class') && container.attr('class').equals('item-tags')) {

                this.tags.container = container.children('.tags');
                this.tags.clear();
                this.tags.setRelative();
                this.tags.setOverlays();
                this.tags.setTimeouts();
            }

        },
        tags: {
            container: null,
            layers: [],
            timeouts: [],
            clear: function () {
                var _layers = this.layers,
                    _timeouts = this.timeouts;

                _layers.foreach(function () {
                    this.removeFromArray(_layers);
                });

                _timeouts.foreach(function () {
                    clearTimeout(this);
                    this.removeFromArray(_timeouts);
                });

            },
            setTimeouts: function () {

                var _tags = this;

                if (_tags.layers.length) {
                    timeout(this.layers[0]);
                }

                function timeout(layer) {

                    _tags.timeouts.push(setTimeout(function () {

                        var layers = _this.spoiler.tags.layers,
                            next = layers[layers.indexOf(layer) + 1];

                        layer.animate({opacity: 0}, 1000, function () {

                            $(this).remove();
                        });

                        if (next !== undefined) {
                            timeout(next);
                        }
                    }, 250));
                }
            },
            setOverlays: function () {

                if (this.container.equals(null)) return;

                var _tags = this;

                this.container.children('span.tag').each(function () {

                    var _layer = new Layer({
                        id: $(this).attr('id'),
                        css: {
                            'border-radius': '10px',
                            'background': '#ee4d2e',
                        }
                    });
                    _tags.layers.push(_layer);
                    _layer.appendTo(this);
                });


            },
            setRelative: function () {
                $(this.container.children('span.tag')).css('position', 'relative');
            },
            removeLayer: function () {

                this.layers.foreach(function () {
                    this.remove();
                });
            },
            triggerChange: function () {

                $('.item-tags').trigger('DOMNodeInserted');
            }
        }
    });

}