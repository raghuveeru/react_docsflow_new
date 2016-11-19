var MOMINTRANET = (function(app, $, window, undefined){

    'use strict';

    app.$document = $(document),
    app.$html = $('html'),
    app.$body = $('body');

    /**
     * User Interactions
     */

    app.UI = {
        initialize: function(){

            this.dropdown();

            app.$body.on('click.filters', '.link-toggle-filter', function(e){

                app.$body.toggleClass('filter-open')                

                e.preventDefault();
            })
        },
        dropdown: function(){

            var $dropdown = $('.ui-dropdown'),
                $dropcontent = $('.dropdown');

            app.$body.off('click.dropdown').on('click.dropdown', '.ui-dropdown', function(e){

                var $this = $(this);

                app.$body.find('.ui-dropdown')
                    .not($this)
                    .removeClass('dropdown-active');

                $(this).toggleClass('dropdown-active');

                e.preventDefault();
                e.stopPropagation();

            });

            app.$body.on('click', '.dropdown', function(e){
                e.stopPropagation();
            })

            app.$html.click(function(){
                app.$body.find('.ui-dropdown').removeClass('dropdown-active');
            })
        }
    };


    /**
     * On body load
     */

    $(function(){

        app.UI.initialize();

    });


    return app;

})(MOMINTRANET || {} , jQuery, window, undefined);