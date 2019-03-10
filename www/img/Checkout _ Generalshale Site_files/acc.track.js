ACC.track = {
    trackAddToCart: function (productCode, quantity, cartData) {
        if (window.mediator) {
            window.mediator.publish('trackAddToCart', {
                productCode: productCode,
                quantity: quantity,
                cartData: cartData
            });
        }
    },
    trackRemoveFromCart: function (productCode, initialCartQuantity) {
        if (window.mediator) {
            window.mediator.publish('trackRemoveFromCart', {
                productCode: productCode,
                initialCartQuantity: initialCartQuantity
            });
        }
    },

    trackUpdateCart: function (productCode, initialCartQuantity, newCartQuantity) {
        if (window.mediator) {
            window.mediator.publish('trackUpdateCart', {
                productCode: productCode,
                initialCartQuantity: initialCartQuantity,
                newCartQuantity: newCartQuantity
            });
        }
    },

    trackShowReviewClick: function (productCode) {
        if (window.mediator) {
            window.mediator.publish('trackShowReviewClick', {});
        }
    }

};