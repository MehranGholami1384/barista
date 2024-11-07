$(document).ready(function () {
    // global ---------------------------------------------------------------------------------------------------------

    String.prototype.toPersianDigit = function () {
        var find = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var replace = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        var replaceString = this;
        var regex;
        for (var i = 0; i < find.length; i++) {
            regex = new RegExp(find[i], "g");
            replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    };

    const searchParams = new URLSearchParams(window.location.search)
    const searchProductCategoryParam = searchParams.get('product-category')

    // index page -----------------------------------------------------------------------------------------------------
    // header ---------------------------------------------------------------------------------------------------------

    $('.nav-link').hover(function () {
        let icon = $(this).find('.nav-link-caret-down')[0]
        let subMenu = $(this).find('.sub-menu')[0]

        if (icon) {
            $(icon).toggleClass('deg180')
        }

        if (subMenu) {
            $(subMenu).toggleClass('invisible opacity-0')
        }
    })

    $('.open-side-nav-btn').click(function () {
        $('.side-nav').addClass('active-side-nav z-index-50')
        $('body').addClass('overflow-hidden')
        $('.blog-topic-badge').removeClass('z-1')
    })

    $('.close-side-nav-btn').click(function () {
        $('.side-nav').removeClass('active-side-nav z-index-50')
        $('body').removeClass('overflow-hidden')
        $('.blog-topic-badge').addClass('z-1')
    })

    $('.side-nav-sub-menu').slideUp(0)

    $('.side-nav-sub-menu-btn').click(function () {
        $('.side-nav-sub-menu').slideToggle(200)
    })

    $('.cart-btn').click(function () {
        $('.cart-off-canvas-overlay').removeClass('d-none').addClass('z-index-50')
        $('.cart-off-canvas').addClass('active z-index-50')
    })

    $('.cart-off-canvas-overlay, .close-cart-off-canvas-btn').click(function () {
        $('.cart-off-canvas-overlay').addClass('d-none').removeClass('z-index-50')
        $('.cart-off-canvas').removeClass('active z-index-50')
    })

    // main --------------------------------------------------------------------------------------------------------------

    $('.coffee-beans-preparation-steps-video').on('contextmenu', function (event) {
        event.preventDefault()
    })

    $('.play-video-btn').click(function () {
        $('.cart-off-canvas-overlay').removeClass('d-none').addClass('z-index-50')
    })

    // shop page ---------------------------------------------------------------------------------------------------------
    // product-category --------------------------------------------------------------------------------------------------

    if (searchProductCategoryParam === 'robusta') {
        $('.product-category-head-title-section').removeClass('d-none')
        $('.product-category-page-text').removeClass('d-none')
        $('title').html('قهوه روبوستا - باریستا')
        $('.shop-nav-link').removeClass('active-nav-link')
        $('.demo-pages-link').addClass('active-nav-link')
        $('.product-category-link').addClass('active')
    } else {
        $('.shop-head-title-section').removeClass('d-none')
    }

    // global ---------------------------------------------------------------------------------------------------------

    function formatPriceWithCommas() {
        $('.best-selling-products-price').each(function () {
            let price = parseInt($(this).text());
            $(this).text(price.toLocaleString('en-US'));
        });
    }

    function convertAllDigitsToPersian() {
        $("*:not(script):not(style):not(.product-category-number)").each(function () {
            if ($(this).children().length === 0) {
                $(this).text($(this).text().toPersianDigit());
            }
        });

        $("input").each(function () {
            $(this).val($(this).val().toPersianDigit());
        });
    }

    formatPriceWithCommas()
    convertAllDigitsToPersian()
});