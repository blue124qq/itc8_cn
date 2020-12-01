( function( $ ) {

    // if(!!('ontouchstart' in window)){
    // }
    // else{
    //     const mq = window.matchMedia( "(min-width: 1200px)" );
    //     if (mq.matches) {
    //         $(".site-header .sub-menu").hide();
    //         $('.site-header .menu-item-has-children').hover(function() {
    //             $(this).find('.sub-menu').first().stop(true, true).delay(250).slideDown();
    //         }, function() {
    //             $(this).find('.sub-menu').first().stop(true, true).delay(100).slideUp();
    //         });
    //     } else {
    //     }
    // }

    $('.header-search').prepend("<div class='button'></div>");

    $search = $('.search-wrapper');

    $(document).mouseup(e => {
        if (!$search.is(e.target) && $search.has(e.target).length === 0) {
            $search.removeClass('open');
            $('.header-bg-img').removeClass("search-bg");
        }
     });

    $('.header-search .button').click(function(){
        $search.toggleClass('open');
        $('.header-bg-img').toggleClass("search-bg");
    });

    $('#primary-menu > li.current-menu-parent').addClass('open');

    $('#primary-menu > li').on('click', function (e) {
        $(this).toggleClass('open');
        $(this).parent('#primary-menu').children().removeClass('open');
        $(this).addClass('open');
    });

}( jQuery ) );
