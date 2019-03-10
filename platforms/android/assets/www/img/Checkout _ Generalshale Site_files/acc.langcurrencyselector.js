ACC.langcurrency = {

    _autoload: [
        "bindMobile",
        "bindForm",
        "bindToggle"
    ],

    bindToggle: function () {
        $('.js-language-selector-toggle').on('click', function () {
            $(this).toggleClass('show');
            $(this).find('ul').slideToggle(200);
        });
    },

    bindForm: function () {

        $('.js-lang-selector-item').on('click', function (e) {
            e.preventDefault();

            var lang = $(this).attr('data-lang'),
                $field = $('.js-lang-form-code-field'),
                $form = $('.js-lang-form');

            // set the correct lang code
            $field.val(lang);

            // submit the form
            $form.submit();
        });

    },

    bindMobile: function () {

        var $langSelector = $('.js-language-selector-toggle');

        // approach from accelerator
        $('.js-userAccount-Links').append($('<li>').addClass('auto').append($('<div>').addClass('js-lang-selector-container')));

        var langSelectorHook = $('<div>').addClass('sub-nav')
            .append($('<a>')
                .addClass('lang-selector-toggle collapsed js-language-selector-toggle-mobile')
                .text($langSelector.attr('data-title')));

        $('.js-lang-selector-container')
            .append(langSelectorHook)
            .append($('<ul>')       //add UL element for nested collapsing list
                .addClass('js-lang-selector-collapse collapse subNavList js-lang-selector-mobile-list'));

        // find all language selector options
        $langSelector.find('.js-lang-selector-item').each(function () {

            // generate list item
            var $listItem = $('<li>')
                .addClass('auto ')
                .append($('<a>')
                    .addClass('js-lang-selector-item')
                    .attr('data-lang', $(this).attr('data-lang'))
                    .attr('href', '#')
                    .text(ACC.common.encodeHtml(this.innerText)));

            // add it to the mobile list
            $('.js-lang-selector-mobile-list').append($listItem);
        });

        // handle toggle
        $('.js-language-selector-toggle-mobile').click(function () {
            $(this).toggleClass('show');
            $(".js-lang-selector-collapse").slideToggle(400);

            if ($(this).hasClass('show')) {
                // close my account/company
                $('#signedInAccountToggle, #signedInCompanyToggle')
                    .removeClass('show') // hide the other one
                    .find('span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                $('.offcanvasGroup2, .offcanvasGroup3').slideUp(400);
                // close navigation
                $('.js-custom-accordion.expanded').each(function () {
                    $(this).removeClass('expanded');
                    $($(this).attr('data-target')).slideUp(400);
                });

            }
        });
    },

    // note: old method, not used currently
    bindLangCurrencySelector: function () {
        $('#lang-selector').change(function () {
            $('#lang-form').submit();
        });

        $('#currency-selector').change(function () {
            $('#currency-form').submit();
        });
    }

};