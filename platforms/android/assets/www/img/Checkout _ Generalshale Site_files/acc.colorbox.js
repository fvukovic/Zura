//Makes Color Box Responsive
var cboxOptions = {
    width: '95%',
    height: '95%',
    maxWidth: '660px',
    maxHeight: '960px',
    reposition: true
};

$('.cbox-link').colorbox(cboxOptions);

// resize popup only on mobile
enquire.register("screen and (max-width:" + screenXsMax + ")", {
    match: function () {
        $(window).resize(function () {
            $.colorbox.resize({
                width: window.innerWidth > parseInt(cboxOptions.maxWidth) ? cboxOptions.maxWidth : cboxOptions.width
            });
        });
    }
});

ACC.colorbox = {
    config: {
        maxWidth: "100%",
        opacity: 0.7,
        width: "auto",
        transition: "none",
        close: '<span class="icon icon-close"></span>',
        title: '<div class="headline"><span class="headline-text">{title}</span></div>',
        onComplete: function () {
            $.colorbox.resize();
            ACC.common.refreshScreenReaderBuffer();
        },
        onClosed: function () {
            ACC.common.refreshScreenReaderBuffer();
        }
    },

    open: function (title, config) {
        var config = $.extend({}, ACC.colorbox.config, config);
        config.title = config.title.replace(/{title}/g, title);
        return $.colorbox(config);
    },

    resize: function () {
        $.colorbox.resize();
    },

    close: function () {
        $.colorbox.close();
    }
};

