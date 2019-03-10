'use strict';

/*
 * Quantity selector implementation
 */
ACC.qtySelector = {
    _autoload: [
        ['init', $('.js-qty-selector').is('*')]
    ],

    init: function () {
        $('.js-qty-selector').ecxQtySelector({
            onEnter: function () {
                var $form = $(this).closest('form');

                if ($form.hasClass('add_to_cart_form')) {
                    var $addToCartBtn = $form.find('.js-add-to-cart-btn');
                    // trigger submission of the form
                    $addToCartBtn.trigger('click');
                }
            },
            onChange: function () {
                var $form = $(this).closest('form');

                if ($form.hasClass('js-pdp-add-to-cart')) {
                    var value = $(this).find('.js-qty-selector-input').val(),
                        $addToCartBtn = $form.find('.js-add-to-cart-btn');

                    // disable/enable button depending on value
                    if (value > 0) {
                        $addToCartBtn.removeAttr('disabled');
                    }
                    else {
                        $addToCartBtn.attr('disabled', 'disabled');
                    }
                }
                else if ($form.hasClass('js-cart-update-form')) {
                    ACC.qtySelector.updateQuantityOnCartItem($(this), $form);
                }
            }
        });
    },

    updateQuantityOnCartItem: function ($input, $form) {
        var $item = $input.parents('.js-cart-item'),
            url = $form.data('update-async-url');

        // call async update
        $.post(url, $form.serialize())
            .done(function () {
                // add the dirty class to cart item to show the reload button
                $item.addClass('dirty');
                // disable checkout buttons
                $('.js-cart-checkout').addClass('disabled');
            })
            .fail(function (e) {
                console.error('Error while updating cart item.', e);
            });
    }
};