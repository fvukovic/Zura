ACC.global = {

    _autoload: [
        ["passwordStrength", $('.password-strength').length > 0],
        "bindToggleOffcanvas",
        "bindToggleXsSearch",
        "bindHoverIntentMainNavigation",
        "initImager",
        "backToHome",
        "bindDropdown",
        "closeAccAlert",
        "bindSelectBox",
        "bindTooltip",
        "bindAccordion"
    ],

    bindTooltip: function () {
        enquire.register("screen and (min-width:" + ACC.common.encodeHtml(screenMdMin) + ")", {
            match: function () {
                $('[data-toggle="tooltip"]').tooltip({position: { my: "center bottom", at: "center top-10px" }});
            },
            unmatch: function () {
                $('[data-toggle="tooltip"]').tooltip('disable');
            }
        });
    },

    bindSelectBox: function () {
        $('.js-selectbox').selectBoxIt({
            autoWidth: false,
            isMobile: function() {
                return false;
            }
        });
    },

    bindAccordion: function () {
        $(".js-accordion-toggle").on("click", function () {
            $(this).toggleClass('active');
        });

        $(".js-accordion-link").on("click", function (e) {
            e.stopPropagation();
        });
    },

    passwordStrength: function () {
        $('.password-strength').pstrength({
            verdicts: [ACC.pwdStrengthTooShortPwd,
                ACC.pwdStrengthVeryWeak,
                ACC.pwdStrengthWeak,
                ACC.pwdStrengthMedium,
                ACC.pwdStrengthStrong,
                ACC.pwdStrengthVeryStrong],
            minCharText: ACC.pwdStrengthMinCharText
        });
    },

    bindToggleOffcanvas: function () {
        $(document).on("click", ".js-toggle-sm-navigation", function () {
            ACC.global.toggleClassState($("main"), "offcanvas");
            ACC.global.toggleClassState($("html"), "offcanvas");
            ACC.global.toggleClassState($("body"), "offcanvas");
            ACC.global.resetXsSearch();
        });
    },

    bindToggleXsSearch: function () {
        $(document).on("click", ".js-toggle-xs-search", function () {
            ACC.global.toggleClassState($(".site-search"), "active");
            ACC.global.toggleClassState($(".js-mainHeader .navigation--middle"), "search-open");
        });
    },

    resetXsSearch: function () {
        $('.site-search').removeClass('active');
        $(".js-mainHeader .navigation--middle").removeClass("search-open");
    },

    toggleClassState: function ($e, c) {
        $e.hasClass(c) ? $e.removeClass(c) : $e.addClass(c);
        return $e.hasClass(c);
    },

    bindHoverIntentMainNavigation: function () {

        enquire.register("screen and (min-width:" + ACC.common.encodeHtml(screenMdMin) + ")", {

            match: function () {
                // on screens larger or equal screenMdMin (1024px) calculate position for .sub-navigation
                $(".js-enquire-has-sub").hoverIntent(function () {
                    var $this = $(this),
                        $subNav = $this.find('.js_sub__navigation'),
                        subNavWidth = $subNav.outerWidth(),
                        $mainNav = $('.js_navigation--bottom .container'),
                        mainNavWidth = $mainNav.width();

                    // get the left position for sub-navigation
                    var leftPos = $this.position().left;

                    // in case of second level navigation, calculate it differently
                    if ($this.hasClass('js-second-level')) {

                        // take the leftPos from the parent
                        var $parent = $this.parents('.js-enquire-has-sub');
                        leftPos = $parent.position().left;

                        // include 2 submenus in calculation (second and potential 3rd level)
                        if (leftPos + (2 * subNavWidth) <= mainNavWidth) {
                            $subNav.css({
                                "left": "100%",
                                "right": "auto"
                            });
                        }
                        else {
                            $subNav.css({
                                "left": "auto",
                                "right": "100%"
                            });
                        }
                    }
                    else {
                        // if there is space on the right side, show it there
                        if (leftPos + subNavWidth <= mainNavWidth) {
                            $subNav.css({
                                "left": 0,
                                "right": "auto"
                            });
                        }
                        else {
                            // otherwise, show it on the left side
                            $subNav.css({
                                "left": "auto",
                                "right": 0
                            });
                        }
                    }

                    $this.addClass("show-sub");

                }, function () {
                    $(this).removeClass("show-sub")
                });
            },

            unmatch: function () {
                // on screens smaller than screenMdMin (1024px) remove inline styles from .sub-navigation and remove hoverIntent
                $(".js_sub__navigation").removeAttr("style");
                $(".js-enquire-has-sub").hoverIntent(function () {
                    // unbinding hover
                });
            }

        });
    },

    initImager: function (elems) {
        elems = elems || '.js-responsive-image';
        this.imgr = new Imager(elems);
    },

    reprocessImages: function (elems) {
        elems = elems || '.js-responsive-image';
        if (this.imgr == undefined) {
            this.initImager(elems);
        } else {
            this.imgr.checkImagesNeedReplacing($(elems));
        }
    },

    // usage: ACC.global.addGoogleMapsApi("callback function"); // callback function name like "ACC.global.myfunction"
    addGoogleMapsApi: function (callback) {
        if (callback != undefined && $(".js-googleMapsApi").length == 0) {
            var googleApiSrc = "//maps.googleapis.com/maps/api/js?key=" + ACC.common.encodeHtml(ACC.config.googleApiKey) + '&sensor=false&callback=' + ACC.common.encodeHtml(callback);
            $('head').append($("<script>").addClass("js-googleMapsApi")
                .attr("type", "text/javascript")
                .attr("src", googleApiSrc));
        } else if (callback != undefined) {
            eval(callback + "()"); //NOSONAR
        }
    },

    backToHome: function () {
        $(".backToHome").on("click", function () {
            var sUrl = ACC.config.encodedContextPath;
            window.location = sUrl;
        });
    },

    bindDropdown: function () {
        $(document).on("click", ".dropdown-toggle", dropdownToggle);
    },

    closeAccAlert: function () {
        $(".closeAccAlert").on("click", function () {
            $(this).parent('.getAccAlert').remove();
        });
    }

};

// ***** Dropdown begins *****
function dropdownParent($this) {
    var selector = $this.attr('href')
    selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
};

function dropdownClearMenus(e) {
    // if right click, exit
    if (e && e.which === 3) return

    // remove class added on dropdownToggle
    $('.dropdown-backdrop').remove()

    $(".dropdown-toggle").each(function () {
        var $parent = dropdownParent($(this))
        var relatedTarget = {relatedTarget: this}

        if (!$parent.hasClass('open')) return

        if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

        $parent.removeClass('open')
    })
};

function dropdownToggle(e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent = dropdownParent($this)
    var isActive = $parent.hasClass('open')

    dropdownClearMenus()

    if (!isActive) {
        if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
            // if mobile we use a backdrop because click events don't delegate
            $(document.createElement('div'))
                .addClass('dropdown-backdrop')
                .insertAfter($(this))
                .on('click', dropdownClearMenus)
        }

        var relatedTarget = {relatedTarget: this}

        if (e.isDefaultPrevented()) return

        // expand the <ul> on the dropdown
        $this
            .trigger('focus')
            .attr('aria-expanded', 'true')

        // set parent to open
        $parent.toggleClass('open')
    }

    return false
};
//***** Dropdown ends *****