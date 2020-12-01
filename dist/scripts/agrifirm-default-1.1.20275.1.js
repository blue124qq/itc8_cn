$(document).ready(function () {
    filterFunctions.initFilters();

    agrifirmFunctions.searchInit();
    agrifirmFunctions.languageSwitcherInit();
    agrifirmFunctions.videoPlay();
    agrifirmFunctions.eventNavigation();
    agrifirmFunctions.homeSlidingBlocks();
    agrifirmFunctions.stickyNavInit();
    agrifirmFunctions.sectorGridBlocks();
    agrifirmFunctions.sectorSubsectorsBlocks();
    agrifirmFunctions.homeTabs();
    //agrifirmFunctions.homePageInit();
    agrifirmFunctions.footerSubscribe();
    agrifirmFunctions.contactTabs();
    agrifirmFunctions.popupSlider();

    //temp
    stickyMainNav();
    $('.home-latest-feed .scroll-btn').click(function () {
        var $self = $(this);
        $('html, body').animate({scrollTop: $self.parent().next().offset().top - 58}, 600);
    });

    commonFunctions.cookieBar();
    commonFunctions.searchFormHeader();
    commonFunctions.searchFromHeaderKeyPress();
    commonFunctions.faqAccordion();
    commonFunctions.navigationInit();
    commonFunctions.mobileSearchInit();
    commonFunctions.deviceNavigation();
    commonFunctions.responsiveTable();

    searchFunctions.init();
    agrifirmFunctions.jobSearch.init();

    searchFunctions.setSortClass();

    if ($('.event-details-page').length) {
        $(window).scroll(function () {
            agrifirmFunctions.handleStickyNav();
            agrifirmFunctions.eventnavigationScroll();
        });
    }

    if ($('.tag-section').length) {
        commonFunctions.tagSearch();
    }
});

$(window).load(function () {
    agrifirmFunctions.highlightSection();
    agrifirmFunctions.eventLocationHeight();
    agrifirmFunctions.eventSpeakersHeight();
    agrifirmFunctions.eventnavigationScroll();
    agrifirmFunctions.textEllipsis();
    agrifirmFunctions.faqCarouselHeight();
});

$(window).resize(function () {
    agrifirmFunctions.highlightSection();
    agrifirmFunctions.eventLocationHeight();
    agrifirmFunctions.eventSpeakersHeight();
    commonFunctions.popupPosition();
    agrifirmFunctions.textEllipsis();
    agrifirmFunctions.faqCarouselHeight();
});

$(window).scroll(function () {
    stickyMainNav();
});

function stickyMainNav() {
    if ($(window).scrollTop() >= 60) {
        $('.header').addClass('sticky');
        var loginWidth = $('.header.sticky .login-btn').outerWidth();
        $('.header.sticky .main-nav').css('padding-right', loginWidth - 10);
    } else {
        $('.header').removeClass('sticky');
        $('.header.sticky .main-nav').css('padding-right', '');
    }
}
