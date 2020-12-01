$(document).ready(function () {
    // gallery section on event page
    $('.gallery-popup .gallery-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    $('.gallery-popup .gallery-slider')
        .on('init', function () {
            commonFunctions.popupPosition();
        })
        .on('afterChange', function () {
            commonFunctions.popupPosition();
            $(this).find('img').addClass('image');
        });
    $('.event-gallery .thumb-item.slide').click(function () {
        $('.popup.gallery-popup').stop().fadeIn();
        commonFunctions.popupPosition();
        var index = $(this).index();
        $('.gallery-popup .gallery-slider').slick('slickGoTo', index);
        commonFunctions.popupPosition();
    });

    $('.event-gallery .thumb-item.view-all').click(function () {
        $('.popup.gallery-popup').stop().fadeIn();
        commonFunctions.popupPosition();
        $('.gallery-popup .gallery-slider').slick('slickGoTo', 0);
    });

    $('.popup .popup-overlay, .popup .popup-close').click(function () {
        $('.popup').stop().fadeOut();
    });

    $('.play-overlay').click(function () {
        $(this).parent().next().show();
    });
});
