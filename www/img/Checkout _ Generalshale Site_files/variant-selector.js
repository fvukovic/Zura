'use strict';

/*
 * Variant selector implementation
 */
ACC.variantSelector = {
    _autoload: [
        ['initVariantSelector', $('.js-variant-selector').is('*')]
    ],

    initVariantSelector: function () {
        $('.js-variant-selector-toggle').on('click', function () {
            $(this).parents('.js-variant-selector').toggleClass('active');
        });

        // change variant
        $('.js-variant-selector-input').on('change', ACC.variantSelector.handleVariantChange);
    },

    handleVariantChange: function () {
        var $selected = $(this).parents('.js-variant-selector').find('.js-variant-selector-selected'),
            code = $(this).data('code');

        // update name and code of selected variant display
        $('.js-name', $selected).text($(this).data('name'));
        $('.js-code', $selected).text(code);

        // reload to get the variant info
        location.href = ACC.config.encodedContextPath + '/p/' + code;
    }

};