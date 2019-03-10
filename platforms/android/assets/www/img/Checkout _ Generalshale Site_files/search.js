'use strict';

/*
 * Search component in header
 */
ACC.searchComponent = {
    _autoload: [
        'initSearch'
    ],

    initSearch: function () {
        $('.js_search_button').on('click', function (e) {

            var $searchBox = $(this).parents('.js-search-box'),
                $searchInput = $('.js-site-search-input', $searchBox),
                searchTerm = $searchInput.val().trim();

            if (!$searchBox.hasClass('is-expanded') || !searchTerm.length > 0) {
                // prevent submission
                e.preventDefault();
                // expand the field
                $searchInput.focus();
                $searchBox.addClass('is-expanded');
            }
        });

        // remove the expanded class after blur
        $('.js-site-search-input').on('blur', function () {
            var $container = $(this).parents('.js-search-box');
            // have a longer timeout than animation in order to allow submission
            setTimeout(function () {
                $container.removeClass('is-expanded');
            }, 350);
        });
    }

};