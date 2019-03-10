var oDoc = document;

ACC.navigation = {

    _autoload: [
        "offcanvasNavigation",
        "myAccountNavigation",
        "orderToolsNavigation"
    ],

    offcanvasNavigation: function () {

        enquire.register("screen and (max-width:" + ACC.common.encodeHtml(screenSmMax) + ")", {

            match: function () {

                $(document).on("click", ".js-enquire-offcanvas-navigation .js-enquire-has-sub .js_nav__link--drill__down", function (e) {
                    e.preventDefault();
                    $(".js-userAccount-Links").hide();
                    $(".js-enquire-offcanvas-navigation ul.js-offcanvas-links").addClass("active");
                    $(".js-enquire-offcanvas-navigation .js-enquire-has-sub").removeClass("active");
                    $(this).parent(".js-enquire-has-sub").addClass("active");
                });


                $(document).on("click", ".js-enquire-offcanvas-navigation .js-enquire-sub-close", function (e) {
                    e.preventDefault();
                    $(".js-userAccount-Links").show();
                    $(".js-enquire-offcanvas-navigation ul.js-offcanvas-links").removeClass("active");
                    $(".js-enquire-offcanvas-navigation .js-enquire-has-sub").removeClass("active");
                });


                // init the custom accordion
                $(document).on('click', '.js-custom-accordion', function () {
                    var $this = $(this);

                    // if this is expanded, close it
                    if ($this.hasClass('expanded')) {
                        $this.removeClass('expanded');
                        $($this.attr('data-target')).slideUp(400);
                    }
                    else {
                        // otherwise, show current and close others on same level

                        // hide others which are expanded from the same list
                        $this.parents('ul').first().find('.js-custom-accordion.expanded').each(function () {
                            var $el = $(this);
                            $el.removeClass('expanded');
                            $($el.attr('data-target')).slideUp(400);
                        });

                        // close myAccount/myCompany/language selector if opened
                        if ($('.js-myAccount-toggle.collapsed').hasClass('show')) {
                            $('.js-myAccount-toggle.collapsed').removeClass('show');
                            $('.js-myAccount-root').slideUp(400);
                        }
                        if ($('.js-myCompany-toggle.collapsed').hasClass('show')) {
                            $('.js-myCompany-toggle.collapsed').removeClass('show');
                            $('.js-myCompany-root').slideUp(400);
                        }
                        if ($('.js-language-selector-toggle-mobile').hasClass('show')) {
                            $('.js-language-selector-toggle-mobile').removeClass('show');
                            $('.js-lang-selector-collapse').slideUp(400);
                        }

                        // show clicked one
                        $this.addClass('expanded');
                        $($this.attr('data-target')).slideToggle(400);
                    }

                    return false;
                });

                // close main navigation and language selector on myAccount/myCompany open
                $(document).on('click', '.js-myCompany-toggle, .js-myAccount-toggle', function () {
                    if ($('.js-custom-accordion.expanded').is('*')) {
                        $('.js-custom-accordion.expanded').each(function () {
                            var $el = $(this);
                            $el.removeClass('expanded');
                            $($el.attr('data-target')).slideUp(400);
                        });
                    }
                    if ($('.js-language-selector-toggle-mobile').hasClass('show')) {
                        $('.js-language-selector-toggle-mobile').removeClass('show');
                        $('.js-lang-selector-collapse').slideUp(400);
                    }
                });

            },

            unmatch: function () {

                $(".js-userAccount-Links").show();
                $(".js-enquire-offcanvas-navigation ul.js-offcanvas-links").removeClass("active");
                $(".js-enquire-offcanvas-navigation .js-enquire-has-sub").removeClass("active");

                $(document).off("click", ".js-enquire-offcanvas-navigation .js-enquire-has-sub > a");
                $(document).off("click", ".js-enquire-offcanvas-navigation .js-enquire-sub-close");
                $(document).off("click", ".js-custom-accordion");
                // hide any visible nav items when going on desktop
                $('.js_sub__navigation').hide();


            }


        });

    },

    myAccountNavigation: function () {

        //copy the site logo
        $('.js-mobile-logo').html($('.js-site-logo a').clone());

        //Add the order form img in the navigation
        $('.nav-form').append($("<span>").addClass("glyphicon glyphicon-list-alt"));

        // copy search to mobile nav
        var $search = $('.js-search-box').clone();
        $search
            .removeClass('hidden-sm')
            .removeClass('hidden-xs')
            .addClass('search-box--mobile')
            .addClass('is-expanded');
        $('.js-mobile-nav-header').after($search);

        var aAcctData = [];
        var sSignBtn = "";

        //my account items
        var oMyAccountData = $(".accNavComponent");

        //the my Account hook for the desktop
        var oMMainNavDesktop = $(".js-secondaryNavAccount ul");

        //offcanvas menu for tablet/mobile
        var oMainNav = $(".navigation--bottom > ul.nav__links.nav__links--products");

        if (oMyAccountData) {
            var aLinks = oMyAccountData.find("a");
            for (var i = 0; i < aLinks.length; i++) {
                aAcctData.push({link: aLinks[i].href, text: aLinks[i].title});
            }
        }

        var navClose = $("<div>").addClass("close-nav")
            .append($("<button>").attr("type", "button")
                .addClass("js-toggle-sm-navigation btn")
                .append($("<span>").addClass("glyphicon glyphicon-remove")));

        //create Sign In/Sign Out Button
        if ($(".liOffcanvas a") && $(".liOffcanvas a").length > 0) {
            sSignBtn = $("<a>").addClass("userSign")
                .attr("href", $(".liOffcanvas a")[0].href)
                .text($(".liOffcanvas a")[0].innerHTML);
        }

        $('.js-sign-in-out-container').append(sSignBtn);

        //create Welcome User + expand/collapse and close button
        //This is for mobile navigation. Adding html and classes.
        var oUserInfo = $(".nav__right ul li.logged_in");
        //Check to see if user is logged in
        if (oUserInfo && oUserInfo.length === 1) {

            // $('.js-userAccount-Links').append(sSignBtn);
            $('.js-userAccount-Links').append($("<li>").addClass("auto").append($("<div>").addClass("myAccountLinksContainer js-myAccountLinksContainer")));


            //FOR DESKTOP
            var myAccountHook = $("<div>").addClass("myAccountLinksHeader js-myAccount-toggle")
                .attr("data-toggle", "collapse")
                .attr("data-parent", ".nav__right")
                .text(oMyAccountData.data("title"));

            myAccountHook.insertBefore(oMyAccountData);

            //*For toggling collapse myAccount on Desktop instead of with Bootstrap.js
            $('.myAccountLinksHeader').click(function () {
                $(this).toggleClass('show');
                $(".js-secondaryNavAccount").slideToggle(400);
                if ($(this).hasClass('show')) {
                    $('.myCompanyLinksHeader').removeClass('show'); // hide the other one
                    $('.js-secondaryNavCompany').slideUp(400);
                }
                return false;
            });

            //FOR MOBILE
            //create a My Account Top link for desktop - in case more components come then more parameters need to be passed from the backend
            var myAccountHook = $("<div>").addClass("sub-nav")
                .append($("<a>").attr("id", "signedInUserAccountToggle")
                    .addClass("myAccountLinksHeader collapsed js-myAccount-toggle")
                    .attr("data-toggle", "collapse")
                    .attr("data-target", ".offcanvasGroup2")
                    .text(oMyAccountData.data("title"))
                    .append($("<span>").addClass("glyphicon glyphicon-chevron-down myAcctExp")));

            $('.js-myAccountLinksContainer').append(myAccountHook);

            //add UL element for nested collapsing list
            $('.js-myAccountLinksContainer').append($("<ul>")
                .attr("data-trigger", "#signedInUserAccountToggle")
                .addClass("offcanvasGroup2 offcanvasNoBorder collapse js-nav-collapse-body subNavList js-myAccount-root sub-nav"));

            //*For toggling collapse on Mobile instead of with Bootstrap.js
            $('#signedInUserAccountToggle').click(function () {
                $(this).toggleClass('show');
                $(".offcanvasGroup2").slideToggle(400);
                if ($(this).hasClass('show')) {
                    $(this).find('span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
                    $('#signedInCompanyToggle').removeClass('show'); // hide the other one
                    $('#signedInCompanyToggle').find('span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                    $('.offcanvasGroup3').slideUp(400);
                }
                else {
                    $(this).find('span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                }
            });

            //offcanvas items
            for (var i = 0; i < aAcctData.length; i++) {
                var oLink = oDoc.createElement("a");
                oLink.title = aAcctData[i].text;
                oLink.href = aAcctData[i].link;
                oLink.innerHTML = ACC.common.encodeHtml(aAcctData[i].text);

                var oListItem = oDoc.createElement("li");
                oListItem.appendChild(oLink);
                oListItem = $(oListItem);
                oListItem.addClass("auto ");
                $('.js-myAccount-root').append(oListItem);
            }

        }

        //desktop
        for (var i = 0; i < aAcctData.length; i++) {
            var oLink = oDoc.createElement("a");
            oLink.title = aAcctData[i].text;
            oLink.href = aAcctData[i].link;
            oLink.innerHTML = ACC.common.encodeHtml(aAcctData[i].text);

            var oListItem = oDoc.createElement("li");
            oListItem.appendChild(oLink);
            oListItem = $(oListItem);
            oListItem.addClass("auto col-md-4");
            oMMainNavDesktop.get(0).appendChild(oListItem.get(0));
        }

        //hide and show content areas for desktop
        $('.js-secondaryNavAccount').on('shown.bs.collapse', function () {

            if ($('.js-secondaryNavCompany').hasClass('in')) {
                $('.js-myCompany-toggle').click();
            }

        });

        $('.js-secondaryNavCompany').on('shown.bs.collapse', function () {

            if ($('.js-secondaryNavAccount').hasClass('in')) {
                $('.js-myAccount-toggle').click();
            }

        });

        //change icons for up and down
        $('.js-nav-collapse-body').on('hidden.bs.collapse', function (e) {

            var target = $(e.target);
            var targetSpanSelector = target.attr('data-trigger') + ' > span';
            if (target.hasClass('in')) {
                $(document).find(targetSpanSelector).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            }
            else {
                $(document).find(targetSpanSelector).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            }
        });

        $('.js-nav-collapse-body').on('show.bs.collapse', function (e) {
            var target = $(e.target);
            var targetSpanSelector = target.attr('data-trigger') + ' > span';
            if (target.hasClass('in')) {
                $(document).find(targetSpanSelector).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            }
            else {
                $(document).find(targetSpanSelector).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            }
        });

    },

    orderToolsNavigation: function () {
        $('.js-nav-order-tools').on('click', function (e) {
            $(this).toggleClass('js-nav-order-tools--active');
        });
    }
};
