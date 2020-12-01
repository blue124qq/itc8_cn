/*eslint no-unused-vars: ["error", { "vars": "local" }], no-param-reassign: ["error", { "props": false }] */
/*global agrifirmFunctions */

var agrifirmFunctions = {
    toppset: 0,
    isWinScrolling: 0,
    languageSwitcherInit: function () {
        agrifirmFunctions.toppset = 0;
        // language swither
        $('.header .sec-nav .languages').click(function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).next().stop().slideUp();
            } else {
                $(this).addClass('open');
                $(this).next().stop().slideDown();
            }
        });

        $('.trigger-languages').click(function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).next().stop().slideUp();
            } else {
                $(this).addClass('open');
                $(this).next().stop().slideDown();
            }
        });
    },
    homePageInit: function () {
        var homepageContainer = $('.home-page');
        if (homepageContainer.length) {
            var sectorsContainer = homepageContainer.find('.sector-subsector-block');
            var sectorBlocks = sectorsContainer.find('.four-cols-wrap .col');

            if (sectorBlocks.length > 4) {
                var itemsToHide = sectorBlocks.slice(4, sectorBlocks.length).hide();
                itemsToHide.hide();

                var loadMoreSectorsButton = sectorsContainer.find('.btn');
                loadMoreSectorsButton.on('click', function () {
                    var sectorsToShow = $('.sector-subsector-block .col:hidden').slice(0, 4);

                    if (sectorsToShow.length < 4) {
                        $(this).hide();
                    }

                    sectorsToShow.show();
                });
            }
        }
    },
    searchInit: function () {
        // flyout search when website has been visited first time
        if (getCookie('searchShown') === '') {
            var search = $('.main-search .trigger-search');
            $(search).hide();
            if ($(window).width() > 1180) {
                $('.main-search').animate({
                    width: '+250'
                });
            } else if ($(window).width() < 1181 && $(window).width() > 1024) {
                $('.main-search').animate({
                    width: '+216'
                });
            } else {
                $('.main-search').animate({
                    width: '+160'
                });
            }
            $('.search-inner').animate({
                marginLeft: '0'
            });
            $(search).siblings('.overlay').show();
            setCookie('searchShown', 'true', 0);
        }
        // main search
        $('.main-search .trigger-search').click(function () {
            $(this).hide();
            if ($(window).width() > 1180) {
                $('.main-search').animate({
                    width: '+250'
                });
            } else if ($(window).width() < 1181 && $(window).width() > 1024) {
                $('.main-search').animate({
                    width: '+216'
                });
            } else {
                $('.main-search').animate({
                    width: '+160'
                });
            }
            $('.search-inner').animate({
                marginLeft: '0'
            });
            $(this).siblings('.overlay').show();
            $('.main-search .search-inner input').focus();
        });
        $('.main-search .overlay').click(function () {
            $(this).hide();
            $('.main-search').animate({
                width: '+35'
            });
            $('.search-inner').animate({
                marginLeft: '+50'
            });
            $(this).siblings('.trigger-search').show();
        });
    },
    eventNavigation: function () {
        // event navigation
        $('.event-navigation-bar ul a').not('.btn').click(function (e) {
            e.preventDefault();

            var activeSection = $('.' + $(this).data('section'));
            if ($(window).width() > 960) {
                $('html, body').animate({scrollTop: activeSection.offset().top - 128}, 600);
            } else {
                $('html, body').animate({scrollTop: activeSection.offset().top - 70}, 600);
            }
        });

        $('.event-navigation-bar ul .btn').click(function () {
            if ($(window).width() > 960) {
                $('html, body').animate({scrollTop: $('.event-location-wrap').offset().top - 128}, 600);
            } else {
                $('html, body').animate({scrollTop: $('.event-location-wrap').offset().top - 70}, 600);
            }
        });
    },
    homeSlidingBlocks: function () {
        //home sliding blocks
        if ($('.career-faq-block').length) {
            $('.career-faq-block .home-sliding-blocks .block-slider').on('afterChange', function () {
                commonFunctions.equalHeight($('.career-faq-block .home-sliding-blocks .block-item .text-holder'));
            });
        }
        if ($('.home-sliding-blocks').length) {
            $('.home-sliding-blocks .block-slider').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1599,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    },
    videoPlay: function () {
        $('.play-overlay').click(function () {
            $(this).parent().next().show();
        });
    },
    highlightSection: function () {
        // highlight section
        if ($('.highlight-section').length) {
            if ($(window).width() > 767) {
                $('.highlight-section').each(function () {
                    commonFunctions.equalHeight($(this).find('.highlight-inner > div'));
                });
            } else {
                $('.highlight-section .highlight-inner > div').css('height', '');
                $('.highlight-section .image-wrap img').css('min-height', '');
            }
        }
    },
    eventLocationHeight: function () {
        //event location
        if ($('.event-location-wrap').length) {
            if ($(window).width() > 767) {
                $('.event-location-wrap .item').each(function () {
                    commonFunctions.equalHeight($(this).find('.col'));
                });
            } else {
                $('.event-location-wrap .item .col').css('height', '');
            }
        }
    },
    eventSpeakersHeight: function () {
        //event speakers
        if ($('.event-speakers').length) {
            if ($(window).width() > 767) {
                commonFunctions.equalHeight($('.event-speakers .speaker-item .img-holder'), 3);
                commonFunctions.equalHeight($('.event-speakers .speaker-item .text-holder'), 3);
            } else {
                $('.event-speakers .speaker-item .img-holder').css('height', '');
                $('.event-speakers .speaker-item .text-holder').css('height', '');
            }
        }
    },
    textEllipsis: function () {
        //text ellipsis
        if ($(window).width() > 767) {
            if ($('.highlight-section').length) {
                $('.highlight-section .text-holder h3').dotdotdot();
                $('.highlight-section .text-holder p').dotdotdot();
            }
            if ($('.sector-grid-block .grid-item').length) {
                $('.sector-grid-block .grid-item h3').dotdotdot();
                $('.sector-grid-block .grid-item p').dotdotdot();
            }
            if ($('.article-event-block').length) {
                $('.article-event-block h3').dotdotdot();
                $('.article-event-block p').dotdotdot();
                $('.article-event-block .details span').dotdotdot();
            }
        }
        if ($('.listing-box').length) {
            $('.listing-box .text-holder h3').dotdotdot();
            $('.listing-box .text-holder p').dotdotdot();
        }
        if ($('.home-event-blocks').length) {
            $('.home-event-blocks .event-item .text-holder h3').dotdotdot();
            $('.home-event-blocks .event-item .text-holder p').dotdotdot();
        }
        if ($('.home-sliding-blocks').length) {
            $('.home-sliding-blocks .block-item .text-holder h3').dotdotdot();
            $('.home-sliding-blocks .block-item .text-holder p').dotdotdot();
        }
        if ($('.home-latest-feed').length) {
            $('.home-latest-feed .block h3').dotdotdot();
            $('.home-latest-feed .highlighted-block h3').dotdotdot();
        }
        if ($('.home-about-block').length) {
            $('.home-about-block .about-tabs .text-holder h3').dotdotdot();
            $('.home-about-block .about-tabs .text-holder p').dotdotdot();
        }
        if ($('.media-content-block').length) {
            $('.media-content-block .text-holder h3').dotdotdot();
            $('.media-content-block .text-holder p').dotdotdot();
        }
        if ($('.search-results-list').length) {
            $('.search-results-list .item p').dotdotdot();
            $('.search-results-list .item p').dotdotdot();
        }
    },
    eventnavigationScroll: function () {
        //event navigation
        if (agrifirmFunctions.isWinScrolling !== 1) {
            var link = $('.event-navigation-bar ul a');
            var offset = $(window).scrollTop();

            $('.event-details-page .scrolling-sections > div').each(function () {
                var top = $(this).offset().top - 200;
                var $section = $(this);

                if (offset >= top - 1) {
                    var fromTop = $(window).scrollTop();
                    var wholeHeight = $('.container').height();
                    var bodyHeight = $('body').height();
                    link.removeClass('active');
                    if (fromTop === (wholeHeight - bodyHeight)) {
                        link.last().addClass('active');
                    } else {
                        link.eq($section.index()).addClass('active');
                    }
                }
            });
        }
    },
    stickyNavInit: function () {
        // sticky section navigation
        var eventNavigationBar = $('.event-navigation-bar');

        if (eventNavigationBar.length) {
            if ($(window).width() > 960) {
                agrifirmFunctions.toppset = eventNavigationBar.offset().top - 58;
            } else {
                agrifirmFunctions.toppset = eventNavigationBar.offset().top + 38;
            }
        }
    },
    handleStickyNav: function () {
        $('.' + $(this).data('section'));
        if ($('.event-details-page').length) {
            var stickyNavigation = $('.event-navigation-bar');

            if ($(window).scrollTop() >= agrifirmFunctions.toppset) {
                stickyNavigation.addClass('fixed');

                if (!commonFunctions.headerExists()) {
                    stickyNavigation.css('top', '0');
                }
            } else {
                stickyNavigation.removeClass('fixed');
            }
        }
    },
    sectorGridBlocks: function () {
        if ($('.sector-grid-block').length) {
            $('.sector-grid-block .grid-wrap').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 3000,
                        settings: 'unslick'
                    },
                    {
                        breakpoint: 768,
                        settings: 'slick'
                    }
                ]
            });
        }
    },
    sectorSubsectorsBlocks: function () {
        var sectorPageHolder = $('.sector-page');
        if (sectorPageHolder.length) {
            if (sectorPageHolder.find('.sector-subsector-block .col').length > 3) {
                sectorPageHolder.find('.sector-subsector-block .col').slice(3).hide();

                var showMoreButton = sectorPageHolder.find('.sector-subsector-block a.js-show-more');
                var showLessButton = sectorPageHolder.find('.sector-subsector-block a.js-show-less');

                showMoreButton.on('click', function () {
                    sectorPageHolder.find('.sector-subsector-block .col').show();
                    showMoreButton.hide();
                    showLessButton.show();
                });

                showLessButton.on('click', function () {
                    sectorPageHolder.find('.sector-subsector-block .col').slice(3).hide();
                    showLessButton.hide();
                    showMoreButton.show();
                });
            }
        }
    },
    homeTabs: function () {
        //home tabs
        if ($('.home-about-block').length) {
            $('.home-about-block .tab-content').hide();
            $('.home-about-block .tabs li:first').addClass('selected').show();
            $('.home-about-block .tab-content:first').show();
            //On Click
            $('.home-about-block .tabs li').click(function (event) {
                event.preventDefault();

                $('.home-about-block .tabs li').removeClass('selected');
                $(this).addClass('selected');
                $('.home-about-block .tab-content').hide();
                var activeTab = $('.' + $(this).data('tab'));
                activeTab.stop().fadeIn();
                $('.home-about-block .about-tabs').find('.selected-tab').text($(this).find('span').text());

                if ($(window).width() < 768) {
                    $('.home-about-block .about-tabs .tabs').slideUp();
                    $('.home-about-block .about-tabs .selected-tab').removeClass('open');
                }
            });

            $('.home-about-block .about-tabs .selected-tab').click(function () {
                if (!$(this).hasClass('open')) {
                    $(this).addClass('open');
                    $(this).next('.tabs').slideDown();
                } else {
                    $(this).removeClass('open');
                    $(this).next('.tabs').slideUp();
                }
            });
        }
    },
    footerSubscribe: function () {
        $('.js-open-subscribe').click(function () {
            var dataTarget = '#' + $(this).attr('data-target');
            $(dataTarget).stop().fadeIn();
            commonFunctions.popupPosition();
        });
        $('.popup .popup-overlay, .popup .popup-close').click(function () {
            $('.popup').stop().fadeOut();
        });
    },
    faqCarouselHeight: function () {
        if ($('.career-faq-block').length) {
            commonFunctions.equalHeight($('.career-faq-block .home-sliding-blocks .block-item .text-holder'));
        }
    },
    getBottomIndexFromHlightedText: function (highlightedText) {
        var index = highlightedText.indexOf('<strong>');
        if (index < 0) {
            return 0;
        }
        var result = index;

        for (var i = index; i > 0; i -= 1) {
            if (highlightedText[i].trim() === '') {
                result = i + 1;
                break;
            }
        }

        return result;
    },
    getTopIndexFromHlightedText: function (highlightedText) {
        var highlightedTextWithCustomEnding = highlightedText + ';';
        var index = highlightedTextWithCustomEnding.indexOf('</strong>');
        if (index < 0) {
            return 0;
        }
        var result = index;

        for (var j = index; j <= highlightedTextWithCustomEnding.length; j += 1) {
            if (typeof (highlightedTextWithCustomEnding[j]) !== 'undefined' && (highlightedTextWithCustomEnding[j].trim() === '' || highlightedTextWithCustomEnding[j] === ';')) {
                result = j;
                break;
            }
        }

        return result;
    },
    highlightText: function (inputText, searchText) {
        if (inputText.length <= 0) {
            return '';
        }
        var searchTextLowerCase = searchText.toLocaleLowerCase();
        var reg = new RegExp(searchTextLowerCase, 'gi');
        var highlightedText = inputText.replace(reg, function (str) {
            return '<strong>' + str + '</strong>';
        });

        return highlightedText;
    },
    jobSearch: {
        highlightJobSubtitleText: function (inputText, searchText) {
            if (inputText.length <= 0) {
                return '';
            }

            var charactersOnSides = 25;
            var result = inputText.substr(0, charactersOnSides);
            if (searchText.length > 0) {
                var highlightedText = agrifirmFunctions.highlightText(inputText, searchText);

                var bottomIndex = agrifirmFunctions.getBottomIndexFromHlightedText(highlightedText) - charactersOnSides;
                if (bottomIndex < 0) {
                    bottomIndex = 0;
                }

                var topIndex = agrifirmFunctions.getTopIndexFromHlightedText(highlightedText) + charactersOnSides - bottomIndex;

                result = highlightedText.substr(bottomIndex, topIndex);
            }

            return result;
        },
        hideListItems: function () {
            $('.js-job-search-results').find('li').hide();
        },
        hasResultsTitleSearch: function () {
            return $('.js-job-search-results').get(0).getAttribute('data-search-by-title-has-results') === 'true';
        },
        prepopulateSearchInput: function (inpput, searchText) {
            var firstResult = inpput.siblings('ul[class="career-search-list js-job-search-results"]').find('li[style*="list-item"]:first a span[class="career-list-title js-job-search-job-title-updatable"]:first')[0];
            var firstResultText = firstResult.innerText;

            var highlightedSearchText = agrifirmFunctions.highlightText(firstResultText, searchText);
            var startIndex = highlightedSearchText.indexOf('<strong>');
            if (startIndex >= 0) {
                inpput.parent().addClass('populated');

                var bottomIndex = agrifirmFunctions.getBottomIndexFromHlightedText(highlightedSearchText);
                var topIndex = agrifirmFunctions.getTopIndexFromHlightedText(highlightedSearchText);

                var selectedWord = highlightedSearchText.substr(bottomIndex, topIndex - bottomIndex);

                inpput.siblings('.career-search-input-value').html(selectedWord.replace(new RegExp(searchText, 'gi'), searchText));
            } else {
                inpput.parent().removeClass('populated');
            }
        },
        highlightSearchedText: function (searchText, allJobItemsTitles, allJobItemsSubtitles, numberOfItemsToShow) {
            var listItemSortIndex = 0;
            var numberOfItemsToShowPom = numberOfItemsToShow;
            var jobSearchResults = $('.js-job-search-results');
            jobSearchResults.attr('data-search-by-title-has-results', false);

            // search by title
            $.each(allJobItemsTitles, function (index, element) {
                var titleTextIndex = element.innerText.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase());
                if (titleTextIndex > -1 && numberOfItemsToShowPom !== 0) {
                    var titleText = $(element).text();
                    var highlightedTitleText = agrifirmFunctions.highlightText(titleText, searchText);
                    $(element).siblings('.js-job-search-job-title-updatable').html(highlightedTitleText);

                    var subtitleText = $(element).siblings('.js-job-search-job-subtitle').text();
                    var highlightedSubtitleText = agrifirmFunctions.jobSearch.highlightJobSubtitleText(subtitleText, searchText);
                    $(element).siblings('.js-job-search-job-subtitle-updatable').html(highlightedSubtitleText);

                    listItemSortIndex += 1;
                    $(element).parents('li').attr('data-sort-index', listItemSortIndex);
                    jobSearchResults.attr('data-search-by-title-has-results', true);

                    $(element).parents('li').show();
                    numberOfItemsToShowPom -= 1;
                }
            });

            // search by subtitle
            if (numberOfItemsToShowPom !== 0) {
                $.each(allJobItemsSubtitles, function (index, element) {
                    var innerTextIndex = element.innerText.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase());
                    if (innerTextIndex > -1 && numberOfItemsToShowPom !== 0) {
                        var titleText = $(element).siblings('.js-job-search-job-title').text();
                        var highlightedTitleText = agrifirmFunctions.highlightText(titleText, searchText);
                        $(element).siblings('.js-job-search-job-title-updatable').html(highlightedTitleText);

                        var subtitleText = $(element).text();
                        var highlightedSubtitleText = agrifirmFunctions.jobSearch.highlightJobSubtitleText(subtitleText, searchText);
                        $(element).siblings('.js-job-search-job-subtitle-updatable').html(highlightedSubtitleText);

                        listItemSortIndex += 1;
                        $(element).parents('li').attr('data-sort-index', listItemSortIndex);

                        $(element).parents('li').show();
                        numberOfItemsToShowPom -= 1;
                    }
                });
            }
        },
        sortResults: function () {
            $('.js-job-search-results').find('li').sort(function (a, b) {
                return +a.getAttribute('data-sort-index') - +b.getAttribute('data-sort-index');
            }).appendTo($('.js-job-search-results'));
        },
        resetSortIndexes: function () {
            $('.js-job-search-results').find('li:not(:first):not(:last)').attr('data-sort-index', 0);
        },
        removePopulatedClass: function (input) {
            input.parent().removeClass('populated');
        },
        applyUserInputToTheSarchBox: function (input, searchText) {
            input.siblings('.career-search-input-value').html(searchText);
        },
        showNoResultsElement: function () {
            $('.js-job-search-no-results').show();
        },
        hideNoResultsElement: function () {
            $('.js-job-search-no-results').hide();
        },
        showViewAllButton: function () {
            $('.job-search-box-show-all-button').show();
        },
        hideViewAllButton: function () {
            $('.job-search-box-show-all-button').hide();
        },
        init: function () {
            var jobSearchInput = $('.js-job-search');
            var jobSearchResults = $('.js-job-search-results');

            var allJobItemsTitles = jQuery.makeArray(jobSearchResults.find('.js-job-search-job-title'));
            var allJobItemsSubtitles = jQuery.makeArray(jobSearchResults.find('.js-job-search-job-subtitle'));

            var minimumCharactersToApplySearch = 3;
            var numberOfItemsToShow = 4;

            jobSearchInput.on('input', function () {
                var self = $(this);
                var searchText = self.val();
                agrifirmFunctions.jobSearch.hideListItems();
                agrifirmFunctions.jobSearch.resetSortIndexes();

                if (searchText.length >= minimumCharactersToApplySearch) {
                    agrifirmFunctions.jobSearch.highlightSearchedText(searchText, allJobItemsTitles, allJobItemsSubtitles, numberOfItemsToShow);
                    if (agrifirmFunctions.jobSearch.hasResultsTitleSearch()) {
                        agrifirmFunctions.jobSearch.prepopulateSearchInput(self, searchText);
                    } else {
                        agrifirmFunctions.jobSearch.removePopulatedClass(self);
                        agrifirmFunctions.jobSearch.applyUserInputToTheSarchBox(self, searchText);
                    }

                    agrifirmFunctions.jobSearch.sortResults();
                    jobSearchResults.show();

                    var visibleSearchResults = jobSearchResults.find('li:visible');
                    if (visibleSearchResults.length) {
                        agrifirmFunctions.jobSearch.hideNoResultsElement();
                        agrifirmFunctions.jobSearch.showViewAllButton();
                    } else {
                        agrifirmFunctions.jobSearch.hideViewAllButton();
                        agrifirmFunctions.jobSearch.showNoResultsElement();
                    }
                } else {
                    jobSearchResults.hide();
                    agrifirmFunctions.jobSearch.removePopulatedClass(self);
                    agrifirmFunctions.jobSearch.applyUserInputToTheSarchBox(self, searchText);
                }
            });
        }
    },
    contactTabs: function () {
        //contact tabs
        if ($('.contact-tabs').length) {
            $('.contact-tabs .tab-content').hide();
            $('.contact-tabs .tabs li:first').addClass('selected').show();
            $('.contact-tabs .tab-content:first').show();
            //On Click
            $('.contact-tabs .tabs li').click(function (event) {
                event.preventDefault();

                $('.contact-tabs .tabs li').removeClass('selected');
                $(this).addClass('selected');
                $('.contact-tabs .tab-content').hide();
                var activeTab = $('.' + $(this).data('tab'));
                activeTab.stop().fadeIn();
                $('.contact-tabs').find('.selected-tab').text($(this).find('span').text());

                if ($(window).width() < 768) {
                    $('.contact-tabs .tabs').slideUp();
                    $('.contact-tabs .selected-tab').removeClass('open');
                }
            });
        }
        $('.contact-tabs .selected-tab').click(function () {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open');
                $(this).next('.tabs').slideDown();
            } else {
                $(this).removeClass('open');
                $(this).next('.tabs').slideUp();
            }
        });
    },
    popupSlider: function () {
        var $slider = $('.popup-slide-content');
        var $showTriggers = $('.popup-slide-trigger');
        // var $overlay = $('.popup-slide-overlay');
        var $closeButton = $('.popup-slide-close-button');

        $showTriggers.click(function () {
            $('.popup-slide-overlay').fadeIn();
            $slider.removeClass('popup-slide-out');
            $slider.addClass('popup-slide-in');
        });

        $closeButton.click(function () {
            $('.popup-slide-overlay').fadeOut();
            $slider.addClass('popup-slide-out');
            $slider.removeClass('popup-slide-in');
        });
    }
};

var nuscienceFunctions = {
    footerEqHeight: function () {
        nuscienceFunctions.toppset = 0;
        if ($(window).width() > 767) {
            commonFunctions.equalHeight($('.footer .top .eq-height'));
        } else {
            $('.footer .top .eq-height').css('height', '');
        }
    },
    newsAndEvents: {
        newsCurrentPage: 0,
        eventsCurrentPage: 0,
        init: function () {
            if ($('.news-page').length) {
                $('.news-latest-section .btn.btn-blue').on('click', nuscienceFunctions.newsAndEvents.onClickLoadMoreNews);

                var eventsSection = $('.news-events-section');

                if (eventsSection.length) {
                    var events = eventsSection.find('.col');
                    var itemsToShow = 4;

                    events.slice(4, events.length).hide();
                    eventsSection.find('.btn-blue').on('click', function () {
                        nuscienceFunctions.newsAndEvents.eventsCurrentPage += 1;

                        var newItemsToShow = events.slice(nuscienceFunctions.newsAndEvents.eventsCurrentPage * itemsToShow, (nuscienceFunctions.newsAndEvents.eventsCurrentPage + 1) * itemsToShow);
                        newItemsToShow.show();

                        if (newItemsToShow.length < itemsToShow) {
                            eventsSection.find('.btn-blue').hide();
                        }
                    });
                }
            }
        },
        onClickLoadMoreNews: function () {
            nuscienceFunctions.newsAndEvents.newsCurrentPage += 1;
            var isMobile = 0;

            if ($(window).width() < 961) {
                isMobile = 1;
            }

            var preferredCulture = $('#PreferredCulture').val();

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/ajax/NewsAndEventsPage/GetNewsItems',
                data: JSON.stringify({'currentPageNumber': nuscienceFunctions.newsAndEvents.newsCurrentPage, 'isMobile': isMobile, 'preferredCulture': preferredCulture}),
                success: function (resultData) {
                    var newsContainer = $('.news-latest-section .three-cols-wrap');

                    if (resultData !== '') {
                        var newItems = $(resultData);

                        if ((!isMobile && newItems.length < 6) || (isMobile && newItems.length < 3)) {
                            newsContainer.next().hide();
                        }

                        newsContainer.append(newItems);
                    } else {
                        newsContainer.next().hide();
                    }
                },
                error: function (e, a) {
                    console.log(e, a);
                }
            });
        }
    },
    customSelect: function () {
        //custom select
        $('.select-wrapper .selected-txt').click(function () {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open');
                $(this).siblings('.overlay').show();
                $(this).siblings('.dropdown-list').stop().slideDown();
            } else {
                $(this).removeClass('open');
                $(this).siblings('.overlay').hide();
                $(this).siblings('.dropdown-list').stop().slideUp();
            }
        });
        $('.select-wrapper .overlay').click(function () {
            $(this).hide();
            $(this).siblings('.dropdown-list').stop().slideUp();
            $(this).siblings('.selected-txt').removeClass('open');
        });
        $('.select-wrapper .dropdown-list label').click(function () {
            $(this).parent().parent().stop().slideUp();
            $(this).parent().parent().siblings('.overlay').hide();
            $(this).parent().parent().siblings('.selected-txt').removeClass('open');
            $(this).parent().parent().siblings('.selected-txt').text($(this).find('span').text());
        });
    },
    contactTabs: function () {
        //contact tabs
        if ($('.contact-page').length) {
            $('.contact-tabs .tab-content').hide();
            $('.contact-tabs .tabs li:first').addClass('selected').show();
            $('.contact-tabs .tab-content:first').show();
            //On Click
            $('.contact-tabs .tabs li').click(function (event) {
                event.preventDefault();

                $('.contact-tabs .tabs li').removeClass('selected');
                $(this).addClass('selected');
                $('.contact-tabs .tab-content').hide();
                var activeTab = $('.' + $(this).data('tab'));
                activeTab.stop().fadeIn();
                $('.contact-tabs').find('.selected-tab').text($(this).find('span').text());

                if ($(window).width() < 768) {
                    $('.contact-tabs .tabs').slideUp();
                    $('.contact-tabs .selected-tab').removeClass('open');
                }
            });
        }
        $('.contact-tabs .selected-tab').click(function () {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open');
                $(this).next('.tabs').slideDown();
            } else {
                $(this).removeClass('open');
                $(this).next('.tabs').slideUp();
            }
        });
    },
    homeSlidingBlocks: function () {
        //home sliding blocks
        if ($('.home-sliding-blocks').length) {
            $('.home-sliding-blocks .block-slider').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1599,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    },
    homeBannerArrow: function () {
        $('.banner-wrapper .arrow-down').click(function () {
            var $self = $(this);
            $('html, body').animate({scrollTop: $self.parent().next().offset().top}, 600);
        });
    },
    articleVideoBlockPlay: function () {
        $('.article-video-block .video-overlay').click(function () {
            $(this).parent().next('.video-holder').show();
        });
    },
    aboutVideoBlockPlay: function () {
        $('.about-video-block .video-overlay').click(function () {
            $(this).parent().next('.video-holder').show();
        });
    },
    homeTabs: function () {
        //home tabs
        if ($('.home-tabbed-section').length) {
            $('.home-tabbed-section .tab-content').hide();
            $('.home-tabbed-section .tabs li:first').addClass('selected').show();
            $('.home-tabbed-section .tab-content:first').show();
            //On Click
            $('.home-tabbed-section .tabs li').click(function (event) {
                event.preventDefault();

                $('.home-tabbed-section .tabs li').removeClass('selected');
                $(this).addClass('selected');
                $('.home-tabbed-section .tab-content').hide();
                var activeTab = $('.' + $(this).data('tab'));
                activeTab.stop().fadeIn();
            });
        }
    },
    highlightSection: function () {
        // highlight section
        if ($('.highlight-section').length) {
            if ($(window).width() > 767) {
                $('.highlight-section').each(function () {
                    commonFunctions.equalHeight($(this).find('.highlight-inner > div'));
                });
            } else {
                $('.highlight-section .highlight-inner > div').css('height', '');
            }
        }
    },
    threeColsHeight: function () {
        // three cols wrapper
        if ($('.three-cols-wrap').length) {
            if ($(window).width() > 767) {
                $('.three-cols-wrap').each(function () {
                    commonFunctions.equalHeight($(this).find('.listing-box .image-holder'), 3);
                    commonFunctions.equalHeight($(this).find('.listing-box .text-holder'), 3);
                    commonFunctions.equalHeight($(this).find('.col'), 3);
                });
            } else {
                $('.three-cols-wrap .listing-box .image-holder').css('height', '');
                $('.three-cols-wrap .listing-box .text-holder').css('height', '');
                $('.three-cols-wrap .col').css('height', '');
            }
        }
    },
    textEllipsis: function () {
        //text ellipsis
        if ($(window).width() > 767) {
            if ($('.home-sliding-blocks').length) {
                $('.home-sliding-blocks .block-item .text-holder h3').dotdotdot();
                $('.home-sliding-blocks .block-item .text-holder p').dotdotdot();
            }
            if ($('.home-image-text-section').length) {
                $('.home-image-text-section h3').dotdotdot();
                $('.home-image-text-section p').dotdotdot();
            }
            if ($('.business-unit-box').length) {
                $('.business-unit-box h4').dotdotdot();
                $('.business-unit-box p').dotdotdot();
            }
            if ($('.job-list.three-cols-wrap').length) {
                $('.job-list .listing-box .text-holder h3').dotdotdot();
                $('.job-list .listing-box .text-holder p').dotdotdot();
            }
        }
        if ($('.news-page .news-item').length) {
            $('.news-page .news-item .text-holder h4').dotdotdot();
            $('.news-page .news-item .text-holder h3').dotdotdot();
            $('.news-page .news-item .text-holder p').dotdotdot();
        }
        if ($('.article-event-block').length) {
            $('.article-event-block .text-holder h3').dotdotdot();
            $('.article-event-block .text-holder p').dotdotdot();
        }
    },
    productRelatedItems: function () {
        if ($('.product-details-wrap .three-cols-wrap').length) {
            $('.product-details-wrap .three-cols-wrap .cols-wrap').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 3000,
                        settings: 'unslick'
                    },
                    {
                        breakpoint: 768,
                        settings: 'slick'
                    }
                ]
            });
        }
    },
    newsUpcomingBlocks: function () {
        if ($('.news-events-section').length) {
            $('.news-events-section .two-cols-wrap').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 3000,
                        settings: 'unslick'
                    },
                    {
                        breakpoint: 768,
                        settings: 'slick'
                    }
                ]
            });
        }
    },
    careerContentHeight: function () {
        if ($('.career-content-wrap').length) {
            if ($(window).width() > 767) {
                $('.career-content-wrap .home-image-text-section').each(function () {
                    commonFunctions.equalHeight($(this).find('.wrapper > div'));
                });
            } else {
                $('.event-location-wrap .item .col').css('height', '');
            }
        }
    },
    eventBlockEqualHeight: function () {
        if ($('.home-sliding-blocks .block-item .event-details').length) {
            commonFunctions.equalHeight($('.home-sliding-blocks .block-item .event-details'));
        }
    },
    newsEventBlockEqualHeight: function () {
        if ($('.news-events-section .two-cols-wrap .news-item .event-details').length) {
            commonFunctions.equalHeight($('.news-events-section .two-cols-wrap .news-item .event-details'));
        }
    },
    customFileUpload: function () {
        $('.FormFileUpload__Input').customFileInput();
    },
    relatedProductsHeight: function () {
        if ($('.product-details-wrap .three-cols-wrap').length) {
            $('.product-details-wrap .three-cols-wrap').each(function () {
                commonFunctions.equalHeight($(this).find('.col'));
            });
        }
    }
};

var commonFunctions = {
    pagination: {
        currentPaginationPage: 0,
        init: function (start, numberItem, end) {
            var paginationWrapper = $('.pagination');

            paginationWrapper.on('click', 'a.start:not(.disabled)', function () {
                $('html, body').animate({scrollTop: 0}, 'slow');
                commonFunctions.pagination.currentPaginationPage = 0;
                commonFunctions.pagination.disableButtonsThatAreNotUsable();
                commonFunctions.pagination.setCurrentPageSelectedClass();
                start();
            });

            paginationWrapper.on('click', 'a.prev:not(.disabled)', function () {
                $('html, body').animate({scrollTop: 0}, 'slow');
                $('.pagination').find('.selected').parent().prev().find('a').click();
            });

            paginationWrapper.on('click', 'a:not(.next,.end,.start,.prev,.selected)', function () {
                $('html, body').animate({scrollTop: 0}, 'slow');
                commonFunctions.pagination.currentPaginationPage = parseInt(this.text, 10) - 1;
                commonFunctions.pagination.disableButtonsThatAreNotUsable();
                paginationWrapper.find('.selected').removeClass('selected');
                $(this).addClass('selected');
                numberItem();
            });

            paginationWrapper.on('click', 'a.next:not(.disabled)', function () {
                $('html, body').animate({scrollTop: 0}, 'slow');
                $('.pagination').find('.selected').parent().next().find('a').click();
            });

            paginationWrapper.on('click', 'a.end:not(.disabled)', function () {
                $('html, body').animate({scrollTop: 0}, 'slow');
                commonFunctions.pagination.currentPaginationPage = parseInt($(this).attr('data-last') - 1, 10);
                commonFunctions.pagination.disableButtonsThatAreNotUsable();
                commonFunctions.pagination.setCurrentPageSelectedClass();
                end();
            });
        },
        initNumbers: function () {
            var paginationWrapper = $('.pagination');
            var jobsToShow = filterFunctions.jobs.getJobsToShow();

            if (jobsToShow.length <= filterFunctions.jobs.itemsPerPage) {
                paginationWrapper.hide();
            } else {
                paginationWrapper.show();
            }

            // remove all page numbers
            var pages = paginationWrapper.find('a:not(".start, .prev, .next, .end")');
            pages.each(function (index, el) {
                $(el).parent().remove();
            });

            var numberOfPages = Math.ceil(jobsToShow.length / filterFunctions.jobs.itemsPerPage);
            paginationWrapper.find('.end').first().attr('data-last', numberOfPages);
            var liElements = paginationWrapper.find('li');

            for (var i = numberOfPages; i >= 1; i -= 1) {
                if (i === 1) {
                    liElements.eq(1).after('<li><a href="javascript:;" class="selected" >' + i + '</a></li>');
                } else {
                    liElements.eq(1).after('<li><a href="javascript:;" >' + i + '</a></li>');
                }
            }
        },
        disableButtonsThatAreNotUsable: function () {
            var paginationWrapper = $('.pagination');
            var startButton = paginationWrapper.find('a.start');
            var prevButton = paginationWrapper.find('a.prev');
            var nextButton = paginationWrapper.find('a.next');
            var endButton = paginationWrapper.find('a.end');
            var numberOfPages = parseInt(endButton.attr('data-last'), 10);

            if (commonFunctions.pagination.currentPaginationPage === 0) {
                commonFunctions.pagination.removeDisabledClass(startButton, prevButton, nextButton, endButton);
                startButton.addClass('disabled');
                prevButton.addClass('disabled');
            }

            if (commonFunctions.pagination.currentPaginationPage !== 0 && commonFunctions.pagination.currentPaginationPage !== numberOfPages) {
                commonFunctions.pagination.removeDisabledClass(startButton, prevButton, nextButton, endButton);
            }

            if (commonFunctions.pagination.currentPaginationPage === numberOfPages - 1) {
                commonFunctions.pagination.removeDisabledClass(startButton, prevButton, nextButton, endButton);
                nextButton.addClass('disabled');
                endButton.addClass('disabled');
            }
        },
        removeDisabledClass: function (s, p, n, e) {
            s.removeClass('disabled');
            p.removeClass('disabled');
            n.removeClass('disabled');
            e.removeClass('disabled');
        },
        setCurrentPageSelectedClass: function () {
            var paginationWrapper = $('.pagination');
            paginationWrapper.find('.selected').removeClass('selected');
            paginationWrapper.find('a:not(.next,.end,.start,.prev,.selected)').eq(commonFunctions.pagination.currentPaginationPage).addClass('selected');
        }
    },
    navigationInit: function () {
        // main navigation
        $('.header .main-nav > ul').find('> li').each(function () {
            if ($(this).children('.nav-dropdown').length > 0) {
                $(this).addClass('has-children');
            }
        });
        $('.header .main-nav > ul').find('.has-children').mouseenter(function () {
            $(this).addClass('open');
            $(this).children('.nav-dropdown').stop().slideDown();
        }).mouseleave(function () {
            $(this).removeClass('open');
            $(this).children('.nav-dropdown').stop().slideUp();
        });
    },
    mobileSearchInit: function () {
        // mobile search
        $('.mobile-search .trigger-search').click(function () {
            $(this).siblings('.search-inner').fadeIn('fast');
            $(this).next('.overlay').show();
            $('.mobile-search .search-inner input').focus();
        });
        $('.mobile-search .overlay').click(function () {
            $(this).hide();
            $(this).siblings('.search-inner').fadeOut('fast');
        });
        $('.mobile-search .search-inner a').click(function () {
            $(this).parent().parent().find('.overlay').hide();
            $(this).parent().fadeOut('fast');
            searchFunctions.pageUrl = $('#searchPageUrl').val();
            searchFunctions.rediretToSearchPage($('.mobile-search .search-inner input').val(), 1, '');
        });
    },
    faqAccordion: function () {
        //faq accordion
        $('.faq-item .faq-head').click(function () {
            if (!$(this).parent().hasClass('open')) {
                var $otherItems = $(this).parent().siblings().find('a');
                $otherItems.parent().removeClass('open');
                $otherItems.next().slideUp('fast');

                $(this).parent().addClass('open');
                $(this).next().slideDown('normal');
            } else {
                $(this).parent().removeClass('open');
                $(this).next().slideUp('normal');
            }
        });
        if ($('.faq-item').length) {
            if (window.location.search && window.location.search.length > 0) {
                var themeId = commonFunctions.getUrlParameter('t');
                var themeItemId = commonFunctions.getUrlParameter('ti');

                $('#' + themeId).addClass('open');
                $('#' + themeId).find('> .faq-content').slideDown();

                $('#' + themeItemId).addClass('open');
                $('#' + themeItemId).find('> .faq-content').slideDown();
            } else {
                $('.faq-wrap').each(function () {
                    $(this).find('.faq-item').first().addClass('open');
                    $(this).find('.faq-item').first().find('> .faq-content').slideDown();
                });
            }
        }
    },
    deviceNavigation: function () {
        // open menu
        $('.header .trigger-menu').click(function () {
            $(this).addClass('open');
            $('.device-navigation').addClass('show-nav');
            $('.device-navigation > ul').addClass('show-nav');
            $('body').addClass('overflow');
        });

        // close menu
        $('.device-navigation .close-menu').click(function () {
            $('.header .trigger-menu').removeClass('open');
            $('.device-navigation').removeClass('show-nav');
            $('.device-navigation ul').not('.mobile-sec-nav ul').removeClass('show-nav');
            $('.device-navigation ul').not('.mobile-sec-nav ul').removeClass('hide-right');
            $('.device-navigation ul').not('.mobile-sec-nav ul').removeClass('hide-left');
            $('.device-navigation ul li').removeClass('js-open');
            $('body').removeClass('overflow');
        });

        $('.device-navigation ul').find('li').each(function () {
            if ($(this).children('ul').length > 0) {
                $(this).addClass('has-children');
            }
        });

        $('.device-navigation ul').find('.has-children > .arrow').click(function () {
            if (!$(this).parent().hasClass('js-open')) {
                $(this).parent().addClass('js-open');
                $(this).parent().parent().addClass('hide-right');
                $(this).next().addClass('show-nav');
                $('.device-navigation ul').removeClass('show-nav');
                $(this).next().removeClass('hide-left');
                $(this).next().addClass('show-nav');
            }
        });
        $('.device-navigation ul li.back-item > a').click(function () {
            $(this).parent().parent().parent().parent().removeClass('hide-right');
            $(this).parent().parent().parent().parent().addClass('show-nav');
            $(this).parent().parent().removeClass('show-nav');
            $(this).parent().parent().addClass('hide-left');
            $(this).closest('.has-children').removeClass('js-open');
        });
    },
    /* eslint max-depth: [2, 6] */
    equalHeight: function (arrayItems, count) {
        if (arrayItems !== undefined && arrayItems.length > 0) {
            arrayItems.height('');

            var maxH = 0;

            if (count) {
                var arrays = [];
                while (arrayItems.length > 0) {
                    arrays.push(arrayItems.splice(0, count));
                }

                for (var i = 0; i < arrays.length; i += 1) {
                    var data = arrays[i];
                    maxH = 0;
                    for (var j = 0; j < data.length; j += 1) {
                        var currentH = $(data[j]).outerHeight(true);
                        if (currentH > maxH) {
                            maxH = currentH;
                        }
                    }

                    for (var k = 0; k < data.length; k += 1) {
                        $(data[k]).css('height', maxH);
                    }
                }
            } else {
                arrayItems.each(function () {
                    var currentH2 = $(this).outerHeight(true);
                    if (currentH2 > maxH) {
                        maxH = currentH2;
                    }
                });

                arrayItems.css('height', maxH);
            }
        }
    },
    popupPosition: function () {
        if ($('.popup').length) {
            $('.popup').each(function () {
                var $popBox = $(this).find('.popup-content');
                var popBoxMarginLeft = (-1) * $popBox.width() / 2;
                var popBoxMarginTop = (-1) * $popBox.height() / 2;

                $popBox.css({'margin-left': popBoxMarginLeft});
                $popBox.css({'margin-top': popBoxMarginTop});
            });
        }
    },
    formSelect: function () {
        if ($('.EPiServerForms').length) {
            $('.EPiServerForms select').selectric();
        }
    },
    getUrlParameter: function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        var sParameterName;
        var i;

        for (i = 0; i < sURLVariables.length; i += 1) {
            sParameterName = decodeURIComponent(sURLVariables[i]).split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }

        return '';
    },
    cookieBar: function () {
        if ($('.cookie-wrap'.length)) {
            $('.cookie-wrap').cookieBar({
                closeButton: '.close'
            });
        }
    },
    searchFormHeader: function () {
        if ($('#mainSearch').length > 0) {
            searchFunctions.pageUrl = $('#searchPageUrl').val();
            $('#mainSearch').on('click', function () {
                searchFunctions.rediretToSearchPage($('.main-search input').val(), 1, '');
            });
        }
    },
    searchFromHeaderKeyPress: function () {
        if ($('.main-search input, .mobile-search input, #SearchQuery').length > 0) {
            searchFunctions.pageUrl = $('#searchPageUrl').val();
            $('.main-search input, .mobile-search input, #SearchQuery').keypress(function (e) {
                if (e.which === 13) {
                    e.preventDefault();
                    searchFunctions.rediretToSearchPage($(this).val(), 1, '');
                }
            });
        }
    },
    responsiveTable: function () {
        if ($('.rte-content table').length) {
            for (var i = 0; i < $('.rte-content table').length; i += 1) {
                $($('.rte-content table')[i]).wrap('<div class="table-wrap"></div>');
            }
        }
    },
    headerExists: function () {
        return $('.header').length > 0;
    },
    tagSearch: function () {
        if ($('.tag').length) {
            $('.tag').click(function (e) {
                e.preventDefault();
                if ($('.search-page').length) {
                    searchFunctions.performSearch(e.target.innerText);
                } else {
                    searchFunctions.redirectToTagSearchPage(e.target.innerText);
                }
            });
        }
    }
};

var searchFunctions = {
    pageUrl: '',
    init: function () {
        if ($('.search-page').length > 0) {
            searchFunctions.searchKeyPress();
            searchFunctions.searchAgain();
            commonFunctions.tagSearch();
            commonFunctions.pagination.init(searchFunctions.performSearch, searchFunctions.performSearch, searchFunctions.performSearch);
            searchFunctions.searchToggle();
            searchFunctions.setSortClass();
        }
    },
    searchKeyPress: function () {
        $('#SearchQuery').keypress(function (e) {
            if (e.which === 13) {
                searchFunctions.performSearch();
            }
        });
    },
    searchAgain: function () {
        $('.search-again a').on('click', function () {
            searchFunctions.performSearch();
        });
    },
    searchToggle: function () {
        $('.search-page .results-overview .right a').click(function () {
            $(this).siblings('a').removeClass('active');

            if ($(this).hasClass('active')) {
                $(this).toggleClass('reversed');
            }
            $(this).addClass('active');

            searchFunctions.performSearch();
        });
    },
    performSearch: function (tag) {
        var searchQuery = $('#SearchQuery').val();
        var sortOrder = searchFunctions.resolveSortOrder();

        console.log('current page: ' + commonFunctions.pagination.currentPaginationPage);
        searchFunctions.rediretToSearchPage(searchQuery, commonFunctions.pagination.currentPaginationPage + 1, sortOrder, tag);  // do not show 0 in the URL
    },
    rediretToSearchPage: function (searchQuery, page, sort, tag) {
        var url = searchFunctions.pageUrl + '?term=' + searchQuery + '&page=' + page;

        if (sort !== null) {
            url += '&sort=' + sort;
        }

        if (tag !== null && tag !== undefined) {
            url += '&tag=' + tag;
        }

        window.location.href = url;
    },
    redirectToTagSearchPage: function (searchQuery) {
        var tagListUrl = $('#TagListUrl').val();
        window.location.href = tagListUrl + searchQuery;
    },
    resolveSortOrder: function () {
        var sortOrder;
        var activeFilter = $('.search-page .results-overview .right a.active');

        if (activeFilter === null || activeFilter === undefined || activeFilter.length === 0) {
            return null;
        }

        if (activeFilter.hasClass('date')) {
            sortOrder = 'date';
        } else {
            sortOrder = 'title';
        }

        if (activeFilter.hasClass('reversed')) {
            sortOrder += 'Desc';
        } else {
            sortOrder += 'Asc';
        }

        return sortOrder;
    },
    setSortClass: function () {
        var sort = commonFunctions.getUrlParameter('sort');
        if (sort === null || sort === undefined || sort === '') {
            return;
        }

        searchFunctions.setClass(sort, 'title');
        searchFunctions.setClass(sort, 'date');
    },
    setClass: function (sortValue, classValue) {
        if (sortValue.indexOf(classValue) >= 0) {
            var link = $('.search-page .results-overview .right a.' + classValue);
            link.addClass('active');
            if (sortValue.indexOf('Desc') >= 0) {
                link.addClass('reversed');
            }
        }
    }
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = '';
    if (exdays > 0) {
        expires = 'expires=' + d.toUTCString() + ';';
    }
    document.cookie = cname + '=' + cvalue + ';' + expires + 'path=/';
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i += 1) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
