;
(function($, window, document, undefined){
    var pluginName = 'verticalTimeline',
    defaults   = {
        nav:                 'tl_nav',
        nav_class:           'jqvt_nav',
        
        tl_max_width:        '400px',
        tl_nav_border_width: '1px',
        tl_nav_border_style: 'solid',
        tl_nav_border_color: '#444',
        tl_nav_max_height:   '500px',
        tl_nav_overflow_y:   'scroll',
        tl_nav_padding:      '1em'
    };

    function Plugin(element, options) {
        this.element   = element;
        this.options   = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        this.options['navid'] = '#' + this.options['nav'];

        this.init();
    }

    Plugin.prototype.init = function() {
        this.setBaseStyles();

        this.createScrollingNav();

        this.parseDtElements();
        this.parseDdElements();

        this.addScrollingListener();
    };

    Plugin.prototype.setBaseStyles = function() {
        $(this.element).css('max-width', this.options['tl_max_width']);
    }

    Plugin.prototype.createScrollingNav = function() {
        $(this.element).before('<div id="' + this.options['nav'] + '"></div>');
        $('<ul></ul>').appendTo(this.options['navid']);

        var nav = $(this.options['navid']);
        nav.addClass(this.options['nav_class'])
            .css('border-width', this.options['tl_nav_border_width'])
            .css('border-style', this.options['tl_nav_border_style'])
            .css('border-color', this.options['tl_nav_border_color'])
            .css('float',        'right')
            .css('max-height',   this.options['tl_nav_max_height'])
            .css('overflow-y',   this.options['tl_nav_overflow_y'])
            .css('padding',      this.options['tl_nav_padding']);
    };

    Plugin.prototype.parseDtElements = function() {
        var options = this.options;

        $(this.element).find('dt').each(function(){
            var element = $(this);
            var content = element.html();

            element.html('<div class="jqvt_timeline_date_contents">' + content + '</div>');
            element.addClass('jqvt_timeline_date');

            var id = element.attr('id');
            if (!id) {
                id = uniqid('jqvt_');
            }
            element.attr('id', id);

            $(options['navid'] + ' ul').append('<li><a class="jqvt_slidenav" id="' + id + '_nav" href="#' + id + '">' + content + '</a></li>');
            $(options['navid'] + ' ul li a#' + id + '_nav').live('click', function(e){
                $(window).scrollTop($('#' + id).position().top - 10);

                e.preventDefault();
                e.stopPropagation();
            });
        });
    };

    Plugin.prototype.parseDdElements = function() {
        $(this.element).find('dd').each(function(){
            var content = $(this).html();
            $(this).html('<div class="jqvt_timeline_contents">' + content + '</div>');
            $(this).addClass('jqvt_timeline_contents');
        });
    };

    Plugin.prototype.addScrollingListener = function() {
        var nav     = $(this.options['navid']);
        var navtop  = nav.position().top;
        var el      = $(this.element);
        var options = this.options;

        $(window).scroll(function() {
            var scrollpos = $(window).scrollTop();
            if (scrollpos > navtop) {
                nav.stop().animate({
                    "marginTop": (scrollpos - navtop) + "px"
                }, "slow");
            } else {
                nav.stop().animate({
                    "marginTop": "0px"
                }, "slow");
            }

            el.find('dd').each(function(){
                var element    = $(this);
                var prevdd     = $(this).prev().prev();
                var elheight   = element.height();
                var elmid      = element.position().top + (elheight / 2);
                var prevheight = prevdd.height();
                var prevmid;
                if (prevdd.position() != null) {
                    prevmid    = prevdd.position().top + (prevheight / 2);
                } else {
                    prevmid    = element.position().top - 10;
                }

                if (scrollpos > prevmid && scrollpos < elmid) {
                    $(options['navid'] + ' ul li').removeClass('jqvt_active');

                    var id = $(this).prev().attr('id') + '_nav';
                    $(options['navid'] + ' ul li a#' + id).parent().addClass('jqvt_active');
                }
            });
        });
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

    /**
     * uniqid()
     *
     * This function courtesey of phpjs
     * http://phpjs.org/
     */
    function uniqid(prefix, more_entropy) {
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +    revised by: Kankrelune (http://www.webfaktory.info/)
        // %        note 1: Uses an internal counter (in php_js global) to avoid collision
        // *     example 1: uniqid();
        // *     returns 1: 'a30285b160c14'
        // *     example 2: uniqid('foo');
        // *     returns 2: 'fooa30285b1cd361'
        // *     example 3: uniqid('bar', true);
        // *     returns 3: 'bara20285b23dfd1.31879087'
        if (typeof prefix == 'undefined') {
            prefix = "";
        }

        var retId;
        var formatSeed = function (seed, reqWidth) {
            seed = parseInt(seed, 10).toString(16); // to hex str
            if (reqWidth < seed.length) { // so long we split
                return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) { // so short we pad
                return Array(1 + (reqWidth - seed.length)).join('0') + seed;
            }
            return seed;
        };

        // BEGIN REDUNDANT
        if (!this.php_js) {
            this.php_js = {};
        }
        // END REDUNDANT
        if (!this.php_js.uniqidSeed) { // init seed with big random int
            this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;

        retId = prefix; // start with prefix, add current milliseconds hex string
        retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
        if (more_entropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10).toFixed(8).toString();
        }

        return retId;
    }
})(jQuery, window, document);