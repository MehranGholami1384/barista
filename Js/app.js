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

    function openOverlay() {
        $('.cart-off-canvas-overlay').removeClass('d-none').addClass('z-index-50')
    }

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
        openOverlay()
        $('.cart-off-canvas').addClass('active z-index-50')
    })

    $('.cart-off-canvas-overlay, .close-cart-off-canvas-btn').click(function () {
        $('.cart-off-canvas-overlay').addClass('d-none').removeClass('z-index-50')
        $('.cart-off-canvas').removeClass('active z-index-50')
        $('.coffee-beans-preparation-steps-container').removeClass('active z-index-50')
    })

    // main --------------------------------------------------------------------------------------------------------------

    $('.coffee-beans-preparation-steps-video').on('contextmenu', function (event) {
        event.preventDefault()
    })

    $('.play-video-btn').click(function () {
        openOverlay()
        $('.coffee-beans-preparation-steps-container').addClass('active z-index-50')
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

    // auth page ---------------------------------------------------------------------------------------------------------

    $('.toggle-show-password-btn').click(function (event) {
        let showPasswordIcon = $(this).find($('.bi.bi-eye-fill'))[0]
        event.preventDefault()

        $(this).empty()
        if (showPasswordIcon) {
            $('#password-input').attr('type', 'text')
            $(this).append(`<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" class="bi bi-eye-slash-fill color-gray10" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/></svg>`)
        } else {
            $('#password-input').attr('type', 'password')
            $(this).append(`<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" class="bi bi-eye-fill color-gray10" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path></svg>`)
        }
    })

    const searchPageParam = searchParams.get('page')

    if (searchPageParam === 'lost-password') {
        $('.auth-head-title').html('فراموشی گذرواژه')
        
        $('.auth-content-area').empty()
        $('.auth-content-area').load('auth.html .forget-password-form', function (xhr, status, error) {
            if (status == 'error') {
                console.log("Error: " + xhr.status + " " + xhr.statusText);
            } else {
                $('.forget-password-form').removeClass('d-none')
            }
        })
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