/************************
 ******* SUMMARY ********
 ************************

 1. HEADER INTERACTION
 *************************/

/* =CUSTOM CLICK EVENT
 ----------------------------------------------------------------------------------------------------------------------*/
var clickEventType = (document.ontouchstart!==null) ? 'click' : 'touchstart';
var clickEventEndType = (document.ontouchstart!==null) ? 'click' : 'touchend';

/* 1.   HEADER INTERACTION */
/* a)   Language submenu */
function language_menu(){

    // Ticket #1741
    // Binding the click/touchend on a button, and not on a div element
    $('.header__right__bloc.has-submenu').find('.header__right__bloc--controler').off( "click" ).click(function(){

        var $countryBloc = $(this).parent('.header__right__bloc.has-submenu'),
            $countryMenu = $countryBloc.children('.header__right__bloc__submenu'),
            $countryList = $countryMenu.children('ul'),
            $warning1 = $countryMenu.children('p'),
            $warning2 = $countryMenu.children('p:last-child()'),
            newHeight = 0;

        if($countryBloc.hasClass('active')){
            $countryBloc.removeClass('active');
        }else{
            $countryBloc.addClass('active');
            newHeight = $countryList.outerHeight(true) + $warning1.outerHeight(true) + $warning2.outerHeight(true);

        }

        $countryMenu.animate({
            height: newHeight
        }, 300);
    });

  $(window).click(function() {
    $('#language_switcher.active .btn-reset.header__right__bloc--controler').click();
  });

  $('#header').click(function(event){
    event.stopPropagation();
  });
}

/* b) Mobile Menu */
function mobileMenu(){
    $('.mobile-show-menu').on(clickEventEndType, function(e){
        e.preventDefault();

        if(isOnTouchMove) { return; }

        var $this = $(this),
            $menu = $('.header__menu'),
            $list = $menu.children().children('ul'),
            newHeight = 0;

        if ($this.hasClass('active')) {
            $this.removeClass('active');

            $menu.height(parseInt($menu.height()));

            $menu.animate({
                height: newHeight
            }, 500);
        } else {
            $this.addClass('active');
            newHeight = parseInt($list.height());

            $menu.animate({
                height: newHeight
            }, 500, 'swing', function () {
                $(this).height('auto');
            });
        }

        return false;
    });

    $('#headerNav li span').on(clickEventEndType, function(e){
        if(isMobile()){
            if(isOnTouchMove){ isOnTouchMove = false; return; }

            var $submenu = $(this).parent().children('.submenu');
            var height = 0;

            if($submenu.hasClass('active')) {
                //Close SubMenu
                $submenu.removeClass('active');
            }else {
                //Open SubMenu
                height = parseInt( $submenu.children().height() );
                $submenu.addClass('active');
            }

            $submenu.animate({
                height: height
            }, 500);

            return false;
        }
    })
}

/* c) Generic submenu */
function submenu(){
    if (isMobile()) {
        //DO NOTHING
    } else {
        if(BrowserDetect.OS === 'iPad' || BrowserDetect.OS === 'Android') {

            $('#headerNav li span').on(clickEventEndType, function(e){
                //e.preventDefault();

                var $this = $(this).parent();

                var $element = $('.submenu', $this);
                $element.stop(true, true);

                if($this.hasClass('active')) {
                    //CLOSE SUBMENU
                    var height = 0;
                    $this.removeClass('active');
                }else {
                    //CLOSE ALL OTHER MENU
                    $('#headerNav li').removeClass('active');
                    $('#headerNav li .submenu').animate({
                        height: 0
                    }, 300);

                    //OPEN SUBMENU
                    var height = $element.children('ul').outerHeight();
                    $this.addClass('active');
                }

                $element.animate({
                    height: height
                }, 300);
            })

        } else {
            var subMenuTimeout;
            $('#headerNav li').on('mouseenter',
                function () {
                    var $element = $('.submenu', this),
                        height = parseInt($element.children('ul').outerHeight());

                    subMenuTimeout = window.setTimeout(function(){

                        $element.stop(true, true).animate({
                            height: height
                        }, 300);

                    }, 200);

                    $(this).addClass('onHover');

                }
            ).on('mouseleave',
                function () {
                    var $element = $('.submenu', this),
                        height = 0;

                    window.clearTimeout(subMenuTimeout);

                    $element.stop(true, true).animate({
                        height: 0
                    }, 100);

                    $(this).removeClass('onHover');

                }
            );
        }
    }
}

function search_action(){


    //
    // DESKTOP + TABLET SEARCH
    //
    // $('.header__right__bloc--search').click(function(){
        //e.stopPropagation();
    // });

    $('.nav-search-controler').click(function(){

        //e.preventDefault();
        //e.sto pPropagation();

        var animate = true;

        if(isTablet()) { animate = false; }

        var $this = $(this),
            $searchForm = $(".search-form"),
            $input = $searchForm.find('input[type=text]'),
            height = parseInt($searchForm.find('.search-form__inner').height());

        if( $searchForm.hasClass('active'))
        {
            $searchForm.removeClass('active');
            height = 0;

        } else {
            $searchForm.addClass('active');
        }

        if(animate)
        {
            $searchForm.animate({height : height}, 300, function(){
                if( $searchForm.hasClass('active')){
                    $($input).focus();
                }
            });


        } else {
            $searchForm.height(height);
        }

    });

    $(document).click(function() {

        var $searchBlockClass = 'header__right__bloc--search',
            $searchBlock = $("."+$searchBlockClass),
            $searchForm = $searchBlock.find('.search-form');

        // Hide search nav when clicking outside the search block
        if ($searchForm.hasClass('active'))
        {
            $searchForm.height(0).removeClass('active');
            $searchBlock.find('.nav-search-controler').focus();
        }

    });
    //
    //

    //
    // MOBILE SEARCH
    //
    $('.mobile-search-controler').on(clickEventEndType, function(){

        var $searchForm = $(this).next('form'),
            $mobileNav = $(this).parent('.mobile_search_bloc'),
            $input = $searchForm.children().children('input'),
            $button = $searchForm.find('.btn-search');

        // Prevent the form's submit button to get clicked by mistake on iOS 8
        $button.on("click.mobilesearch", function(e){
            e.preventDefault();
        });

        $searchForm.addClass('active');

        setTimeout(function(){

            // give focus to the search input
            if(!$input.is(':focus')){
                $input.focus();
            }

            // re-enable the click on the form's submit button
            $button.off(".mobilesearch");

        }, 500);

    });

    $('.mobile_search_bloc input').on('focusout', function(){
        $(this).parent().parent().removeClass('active');
        $(this).parent('.mobile_search_bloc').removeClass('is-active');
    });
    //
    //
    //
}

/* 2.   HOME */
/* a)   Bloc image */
function home_bloc_image(animate){
    var $home = $('.home'),
        $blocImg = $('.home .bloc-deco--image'),
        $header =  $('#header'),
        $window = $(window);

    if(!$home.hasClass('.home--video')){
        var heightImg = parseInt($window.height()) - parseInt($header.height());

        if($blocImg.children('img').height() < heightImg){
            heightImg = parseInt($blocImg.children('img').height());
        }

        if(!isTablet()){
            if(animate){
                $blocImg.stop().animate({height: heightImg}, 500);
            }else{
                $blocImg.height(heightImg);
            }
        }else{
            $blocImg.height($blocImg.children('img').height());
        }

    }
}

function isTablet(){
    return ($(window).width() < 1010);
}

function isMobile(){
    return ($(window).width() < 720);
}

function scrollToTop(){
    var touchMove = false;

    $('.backtotop').on('touchmove', function(){
        touchMove = true;
    });

    $('.backtotop').click(function(){
        $('html,body').animate({scrollTop: 0}, 'normal');
        return false;
    });

    $('.backtotop').each(function() {
        $(this).on(clickEventEndType, function(e){
            e.preventDefault();

            if(touchMove){ touchMove = false; return false; }

            if(!touchMove) {
                $('html,body').animate({scrollTop: 0}, 'normal');
                return false;
            }
        });
    });
}

function scrollToAnchor(){

    var touchMove = false;

    $('.smooth-anchor').on('touchmove', function(){
        touchMove = true;
    });

    $('.smooth-anchor').each(function() {

        $(this).on(clickEventEndType, function(e){
            e.preventDefault();

            var anchorPos = $( $(this).attr('href') ).offset().top,
                navHeight = $('#header.fixed').height();

            if(touchMove){ touchMove = false; return false; }

            if(!touchMove) {

                // If the header is fixed, let's remove the header's height from the target coordinates
                if ($('#header.fixed').length)
                {
                    $('html,body').animate({scrollTop: anchorPos - navHeight}, 'normal');
                }

                // Else, go to the regular target coordinates
                else
                {
                    $('html,body').animate({scrollTop: anchorPos}, 'normal');

                }
                return false;
            }
        });
    });
}


//$('html, body').animate({ scrollTop: $tabActive.offset().top }, 2000); // on scroll

function link_glossary(){
    $('.ca_glossary').on(clickEventType, function(){
        return false;
    });
}

function questions_action(){
    $('.question .button-more').on(clickEventEndType, function(){
        var $answer = $(this).next('.hidden'),
            $inner = $answer.children('.inner'),
            height = 0;

        if(!$answer.hasClass('.active')){
            height = $inner.innerHeight();

            $answer.addClass('.active');
        }else{
            $answer.removeClass('.active');
        }

        $answer.height(height);
    });
}

/*
 * JOB LIST
 * */

function showJobList(){
    var touchMove = false;
    $('.job-type .inner').on('touchmove', function(){
        touchMove = true;
    });
    $('.job-type .inner').click(function(){
        //e.preventDefault();

        if(touchMove){ touchMove = false; return false; }

        var $this = $(this),
            $jobType = $this.parent(),
            $jobList = $jobType.children('.job-list'),
            $jobTypeDesc = $jobList.children('.job-type-desc'),
            jobs = $jobList.children('.job'),
            height = 0;

        if($jobType.hasClass('active')){
            $jobType.removeClass('active');
        }else{

            //FIND HEIGHT
            height = parseInt( $jobTypeDesc.outerHeight() );

            for(var i = 0; i < jobs.length; i++){
                var job = jobs[i];

                height += parseInt( $(job).outerHeight() );
            }

            $jobType.addClass('active');
        }

        $jobList.height(height);
    })
}

/*
 * JOBS
 * */
function initJobs(){
    var jobTable = {};

    //INIT VARIABLES
    jobTable.init = function(){
        var self = this;

        self.table = $('#jobsList');
        self.noResult = $('#jobsNoResult');

        self.jobs = [];
        self.currentPage = 0;
        self.nbPage = 0;
        self.totalOfVisibleJob = 0;

        var searchValueHTML = $('#job-title-filter').val();
        if(searchValueHTML !== ''){
            self.searchValue = searchValueHTML.toLowerCase();
        } else {
            self.searchValue = null;
        }

        self.updateCountry();
        self.updateSeniority();

        var $jobs = $('.jobs').children('tbody').find('tr');
        if($jobs.length){
            $.each($jobs, function(i, item){
                var job = {},
                    $item = $(item);

                job.id = i;
                job.type        = $item.children('.job-type');
                job.type        = job.type[0].innerHTML;
                job.location    = $item.children('.job-location');
                job.location    = job.location[0].innerHTML;
                job.domain      = $item.children('.job-domain');
                job.domain      = job.domain[0].innerHTML;
                job.title       = $item.children('.job-title').children('a');
                job.title       = job.title[0].innerHTML;

                job.href        = $item.children('.job-title').children('a').attr('href');

                job.country     = $item.data('country');
                job.seniority   = $item.data('seniority');

                jobTable.jobs.push(job);
            });

            //UPDATE VARIABLES
            self.updateNbJobToShow();

            //PRINT TABLE
            self.initPagination();
            self.updateNbPage();
            self.show();

            //ADD ACTIONS
            self.orderLinesActions();
            self.addSelectsChangeActions();
            self.addInputListener();
        }
    };

    jobTable.updateNbJobToShow = function(){
        var select = document.getElementById('number-of-job-to-show');
        this.nbJobToShow = select[select.selectedIndex].value;

        if(this.nbJobToShow == 'all'){ this.nbJobToShow = this.jobs.length; }
        this.nbJobToShow = parseInt(this.nbJobToShow);
    };

    jobTable.updateCountry = function(){
        var select = document.getElementById('job-country-filter');
        this.country = select[select.selectedIndex].value;
    };

    jobTable.updateSeniority = function(){
        var select = document.getElementById('job-seniority-filter');
        this.seniority = select[select.selectedIndex].value;
    };

    //SHOW
    jobTable.show = function(){
        var self = this,
            numberOfElement = 0,
            limitMin = self.currentPage * self.nbJobToShow,
            limitMax = self.nbJobToShow * (self.currentPage + 1),
            alternative = false;

        if(self.totalOfVisibleJob == 0){
            self.table.addClass('hide');
            self.noResult.removeClass('hide');

        }else{
            self.table.removeClass('hide');
            self.noResult.addClass('hide');
            for(var i = 0; i < self.jobs.length; i++){
                var $jobId = $('.job-id-' + i);
                if( $jobId.length && self.isToShow(i) ){
                    if(limitMin <= numberOfElement && numberOfElement < limitMax && self.nbJobToShow){
                        $jobId.children('.job-type').html(self.jobs[i]['type']);
                        $jobId.children('.job-location').html(self.jobs[i]['location']);
                        $jobId.children('.job-domain').html(self.jobs[i]['domain']);
                        $jobId.children('.job-title').html(self.jobs[i]['title']);
                        $jobId.attr('onclick', "document.location = '" + self.jobs[i]['href'] + "'");
                        $jobId.removeClass('hide');

                        if(alternative){
                            $jobId.addClass('alternative');
                            alternative = !alternative;
                        }else{
                            $jobId.removeClass('alternative');
                            alternative = !alternative;
                        }
                    }else{
                        $jobId.addClass('hide');
                    }

                    numberOfElement++;
                }else{
                    $jobId.addClass('hide');
                }

            }
        }

        CEVAzebra();

    };
    //END SHOW

    jobTable.isToShow = function(ident){
        var self = this,
            titleWithoutDiacritics = removeDiacritics(self.jobs[ident].title),
            job = self.jobs[ident],
            domain = job.domain.toLowerCase(),
            city = job.location.toLowerCase(),
            type = job.type.toLowerCase();

        //console.log(job.domain.toLowerCase(), self.searchValue);

        return (
            (self.country == 'all' || self.country == job.country)
            && (self.seniority == 'all' || self.seniority == job.seniority)
            && (
                self.searchValue == null
                || titleWithoutDiacritics.indexOf(self.searchValue) != -1
                || domain.indexOf(self.searchValue) != -1
                || city.indexOf(self.searchValue) != -1
                || type.indexOf(self.searchValue) != -1
            )
        );
    };

    //PAGINATION
    jobTable.updateNbPage = function(){
        this.updateTotalOfVisibleJob();

        if(this.nbJobToShow == 0){
            this.nbPage = 1;
        }else{
            this.nbPage = Math.ceil(this.totalOfVisibleJob / this.nbJobToShow);
        }

        this.generateNewPagination();
    };

    jobTable.updateTotalOfVisibleJob = function(){
        var self = this;
        self.totalOfVisibleJob = 0;

        for(var i = 0; i < self.jobs.length; i ++){
            if( self.isToShow(i) ){
                self.totalOfVisibleJob++;

            }
        }
    };

    jobTable.initPagination = function(){
        var self = this,
            $prev = $('.pagination .prev'),
            $next = $('.pagination .next');

        //PRECEDENT
        $prev.on('click', function(){
            var $this = $(this);
            if((self.currentPage - 1) <= 0){
                self.currentPage = 0;
                $this.addClass('inactive');
            }else{
                self.currentPage--;
                $next.removeClass('inactive');
            }

            $('.pagination li.current').removeClass('current');
            $('.pagination li.page-' + self.currentPage).addClass('current');

            self.show();
        });

        $next.on(clickEventType, function(){
            var $this = $(this);
            if((self.currentPage + 1) >= (self.nbPage - 1)){
                self.currentPage = self.nbPage - 1;
                $this.addClass('inactive');
            }else{
                self.currentPage++;
                $prev.removeClass('inactive');
            }

            $('.pagination li.current').removeClass('current');
            $('.pagination li.page-' + self.currentPage).addClass('current');

            self.show();
        });
    };

    jobTable.generateNewPagination = function(){
        var self = this,
            $pagination = $('.pagination ul');
        $pagination.empty();

        var $prev = $('.pagination .prev'),
            $next = $('.pagination .next');

        self.currentPage = 0;
        if(self.nbPage > 1){
            for(var i = 0; i < self.nbPage; i++){
                if(i == self.currentPage){
                    $pagination.append('<li class="page-' + i + ' current" data-page="' + i + '"><a href="#">' + (i + 1) + '</a></li>');
                }else{
                    $pagination.append('<li class="page-' + i + ' "data-page="' + i + '"><a href="#">' + (i + 1) + '</a></li>');
                }
            }

            $prev.removeClass('hide').addClass('inactive');
            $next.removeClass('hide');

            $pagination.children('li').on(clickEventType, function(e){
                e.preventDefault();
                var $this = $(this);

                if(!$this.hasClass('current')){
                    self.currentPage = parseInt($this.data('page'));
                    $('.pagination li.current').removeClass('current');
                    $this.addClass('current');
                }

                if($this.hasClass('page-0')){
                    $('.pagination .prev').addClass('inactive');
                }else{
                    $('.pagination .prev').removeClass('inactive');
                }

                if(($this.hasClass('page-' + (self.nbPage - 1)) && self.nbPage > 1)
                    || (self.nbPage == 1 && self.currentPage == 0)
                ){
                    $('.pagination .next').addClass('inactive');
                }else{
                    $('.pagination .next').removeClass('inactive');
                }

                self.show();

                return false;
            });

            $pagination.removeClass('hide');
        }else{
            $pagination.addClass('hide');
            $prev.addClass('hide');
            $next.addClass('hide');
        }
    };


    jobTable.orderLinesActions = function(){

        $("#jobsList").tablesorter();

        var self = this,
            $jobs = $('.jobs'),
            $orderAction = $jobs.find('.order-action');

        $.each($orderAction, function(){
            $(this).on('click', function(){
                var $this = $(this);

                if($this.hasClass('asc')){
                    $this.removeClass('asc');
                }else{
                    $this.addClass('asc');
                }

                //ORDER JOB TABLE BY TARGET
                self.show();
            });
        });
    };

    jobTable.addSelectsChangeActions = function(){
        var self = this,
            select = document.getElementById('number-of-job-to-show');

        select.addEventListener('change', function(){
            self.currentPage = 0;
            self.updateNbJobToShow();
            self.updateNbPage();
            self.show();
        });

        select = document.getElementById('job-country-filter');
        select.addEventListener('change', function(){
            self.updateCountry();
            self.updateNbPage();
            self.show();
        });

        select = document.getElementById('job-seniority-filter');
        select.addEventListener('change', function(){
            self.updateSeniority();
            self.updateNbPage();
            self.show();
        });
    };

    jobTable.addInputListener = function(){
        var self = this,
            input = document.getElementById('job-title-filter');

        input.addEventListener('keyup', function(){
            if(this.value.length >= 2){
                self.searchValue = removeDiacritics(this.value);
            }else{
                self.searchValue = null;
            }

            self.updateNbPage();
            self.show();
        });
    };

    //////////////////////////////
    //  RUN JOBTABLE FUNCTIONS  //
    //////////////////////////////
    var jobList = document.getElementById('jobsList');
    if(jobList){ jobTable.init(); }
    //////////////////////////////
}

var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];
var changes;
function removeDiacritics (str) {
    if(!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for(var i=0; i<changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str.toLowerCase();
}

function fileUploadButton(){
    var fileIploadBtn = $('.fileUploadBtn');

    $.each(fileIploadBtn, function(){
        $(this).parent().prev().val($(this).val());
    });

    fileIploadBtn.on('change', function(){
        $(this).parent().prev().val($(this).val());
    });
}

function initTabs(){
    if(typeof($.easytabs) !== 'undefined'){
        $('#productTabs').easytabs();
    }
}

function filtersProductList(){
    var $filterBox = $('.bloc--filters__box');

    $filterBox.each(function(i, item){
        var $box = $(item),
            $title = $box.children('.box-title'),
            $inner = $box.children('.inner');


        if (isTablet())
        {
            $('.bloc--filters__box').removeClass('active');
            $inner.height(0);
        }
        else
        {
            if($box.hasClass('active')){
                $inner.height( $inner.children('.elements').outerHeight() );
            }else{
                $inner.height(0);
            }
        }



        var filtersTouchMove = false;
        $title.on('touchmove', function(e){
            filtersTouchMove = true;
        });

        $title.on(clickEventEndType, function(e){
            e.preventDefault();

            if(filtersTouchMove){ filtersTouchMove = false; return false; }

            var $this = $(this),
                $filterBox = $this.parent(),
                $innerBox = $filterBox.children('.inner'),
                height = 0;

            if($filterBox.hasClass('active')){
                height = 0;
                $filterBox.removeClass('active');
            }else{
                height = $innerBox.children('.elements').outerHeight();
                $filterBox.addClass('active');
            }

            $innerBox.height(height);

            return false;
        });
    });
}

function runHeaderFixed(){
    var $header = $('header');
    if(!isTablet() && $header.length == 1){
        var doc = document.documentElement, body = document.body,
            top = ((doc && doc.scrollTop  || body && body.scrollTop  || 0));

        if(top > heightToChange){
            $header.addClass('fixed');
            $(body).css('margin-top', baseHeight);

        }else{
            $header.removeClass('fixed');
            $(body).css('margin-top', 0);
        }
    }else{
        $header.removeClass('fixed');
        $(body).css('margin-top', 0);
    }
}

/**
 * CHANGE `SRC` ATTRIBUTE ON HOVER
 * @author mhguillaumet
 * View example on the Downloads page, on the `delete` button. Add a `data-hover-img` attribute to the element you want to switch the `src` attribute of.
 * @params void

 */
function CEVAswitchSrc()
{

    if (!Modernizr.touch)
    {
        var jNodes = $("[data-hover-img]");

        jNodes.each(function(){

            var jNode       = $(this),
                srcDefault  = jNode.attr('src'),
                srcHover    = jNode.data('hover-img');

            // Preload images
            $.preloadImages = function() {
                for (var i = 0; i < arguments.length; i++) {
                    $("<img />").attr("src", arguments[i]);
                }
            }

            $.preloadImages(srcHover);

            jNode
                .on('mouseenter.switch', function(){
                    jNode.attr('src', srcHover);
                })
                .on('mouseleave.switch', function (e) {
                    jNode.attr('src', srcDefault);

                });

        });
    }

}

/**
 * ODD/EVEN CSS CLASSES ON TABLE ROWS
 * @author vvalentin
 * @link http://codepen.io/vincent-valentin/pen/dPyrZz
 * View example on the Jobs List page.
 * @params void

 */
function CEVAzebra()
{

    var even = true;

    $('tr').removeClass('even').each(function(){

        if($(this).is(':visible'))
        {
            if(even)
            {
                $(this).addClass('even');

                even = false;
            }
            else
            {
                even = true;
            }
        }
    });

}

function contentLinksHeightFix()
{
    $('.content-links .content-links__content').each(function() {
        var tallestBlock = 0;
        $(this).find('ul li').each(function(index) {
            if ((index % 2) == 0)
            {
                tallestBlock = 0;
            }
            currentHeight = $(this).height();
            if(currentHeight > tallestBlock)
            {
                tallestBlock  = currentHeight;
            }
            $(this).height(tallestBlock);
        });
        tallestBlock = 0;
    });
}

function initJplayer() {
    if ($('.jp-jplayer').length) {
        $('.jp-jplayer').each(function() {
            $(this).jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: $(this).data('title'),
                        mp3: $(this).data('audio')
                    });
                },
                cssSelectorAncestor: '#jp_container_'+$(this).data('id'),
                supplied: "mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });
        });
        //console.log('jplayer: init');
    }
    else {
        //console.log('jplayer: not present');
    }
}


var jobs, baseHeight, heightToChange;
$(function(){
    //GLOBAL VARIABLES
    jobs = [];
    baseHeight = $('header').height();
    heightToChange = $('.header__top').height();

    //INIT Function
    language_menu();
    mobileMenu();
    submenu();
    search_action();

    scrollToTop();
    scrollToAnchor();
    link_glossary();
    questions_action();

    //home_bloc_image(false);
    showJobList();


    CEVAswitchSrc();
    CEVAzebra();

    //JOBS Actions
    initJobs();
    initTabs();

    filtersProductList();

    //INPUT FILES
    fileUploadButton();

    //FIX CONTENT LINKS HEIGHT ON SAME LINE
    contentLinksHeightFix();

    //Jplayer
    initJplayer();

    $(window).resize(function(){
        home_bloc_image(true);
        //scrollToAnchor();

        if (isTablet())
        {
            $('.bloc--filters__box').each(function(){

                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).children('.inner').height(0);
                }

            });
        }
    });

    $(window).bind('orientationchange', function(){
        home_bloc_image(true);
    });
});

var isOnTouchMove = false
var firstTouch = {};

$('window').ready(function(){

    $(document).on('touchstart', function(e){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        firstTouch.pageY = touch.pageY;
        isOnTouchMove = false;
    });

    $(document).on('touchmove', function(e){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        if(Math.abs(firstTouch.pageY - touch.pageY) > 5) {
            isOnTouchMove = true;
        }
    });

    //HEADER FIXED
    if(BrowserDetect.OS !== 'iPad' && BrowserDetect.OS !== 'Android') {
        runHeaderFixed();

        $(window).scroll(function(){
            runHeaderFixed();
        });

        $(window).resize(function(){
            home_bloc_image(true);
            runHeaderFixed();
        });
    }

    //login redriect
    var login_url = $('.login-button').attr('href');
    var current_url = $(location).attr('href');
    var url_def = login_url+"?redirect="+current_url;
    $('.login-button').attr('href', url_def);

    $(".scroll-down--link").click(function(){
       $(this).blur();
    });

    //OWL CAROUSEL
    if(typeof $.fn.owlCarousel !== 'undefined') {
      var $owlCarousel = $('.owl-carousel');

      if($owlCarousel.length > 0) {
        $owlCarousel.owlCarousel({
          items: 1,
          dots: true,
          nav: true,
          navText: false
        });
      }
    }

    //RESIZE IFRAME
    var ratio = $("#html5-video-embedded").width() / $("#html5-video-embedded").height();

    function redimmVideo(ratio) {
        var elt = $("#html5-video-embedded");
        var largeur = elt.width();
        var height = largeur / ratio;
        elt.css('height',height);
    }

    $("#html5-video-embedded").attr('width', '100%');
    redimmVideo(ratio);

    $(window).resize(function () {
        redimmVideo(ratio);
    });

});




function home_stories_bloc_image(animate) {
    var $home = $('.home_stories'),
        $blocImg = $('.home_stories .bloc-deco--image'),
        $header = $('#header'),
        $window = $(window);

    var heightImg = parseInt($window.height()) - parseInt($header.height());

    if (!isTablet()) {
        if (animate) {
            $blocImg.stop().animate({height: heightImg}, 500);
        } else {
            $blocImg.height(heightImg);
        }
    } else {
        $blocImg.height($blocImg.children('img').height());
    }
}

function fix_fixed_background_image() {
    var $blocImg = $('.home_stories .bloc-deco--image'),
        $header = $('#header'),
        scrolledY = $(window).scrollTop(),
        headerHeight = $header.height();

    var topPosition = headerHeight > 46 ? 0 : scrolledY - (headerHeight * 2);

    $blocImg.css('background-position', 'left ' + topPosition + 'px');
}

function full_image_height(animate) {
    var $blocImg = $('.bloc-deco--image--full'),
        $header = $('#header'),
        $window = $(window);

    var heightImg = parseInt($window.height()) - parseInt($header.height());

    if (!isTablet()) {
        if (animate) {
            $blocImg.stop().animate({height: heightImg}, 500);
        } else {
            $blocImg.height(heightImg);
        }
    } else {
        $blocImg.height($blocImg.children('img').height());
    }

    $blocImg.addClass('loaded');
}

function defineScrollDownClick(selector, div) {
    if (typeof $(selector) === 'undefined') {
        return;
    }

    if (typeof $(div) === 'undefined') {
        return;
    }

    $(selector).on('click', function(e) {
        e.preventDefault();

        var $header = $('#header'),
            $page = $('html,body'),
            $div = $(div);

        $page.animate({scrollTop: parseInt($div.height()) + parseInt($header.height())}, 1000);
    });
}

function defineClickableBlock(container) {
    if (typeof container === 'undefined') {
        return;
    }

    container.click(function(){
        window.location = $(this).find("a:first").attr("href");
        return false;
    });

    // Show URL on Mouse Hover
    container.hover(function () {
        window.status = $(this).find("a:first").attr("href");
        $(this).css('cursor','pointer');
    }, function () {
        window.status = "";
    });
}

function replaceSVG() {
    /*
     * Replace all SVG images with inline SVG
     */
    $('img.twitter--icon').each(function(){
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
}

$('window').ready(function () {
    $(window).resize(function () {
        home_stories_bloc_image(true);
        full_image_height(false);
    });

    $(window).bind('orientationchange', function () {
        home_stories_bloc_image(true);
        full_image_height(false);
    });

    $(window).scroll(function() {
        fix_fixed_background_image();
    });

    home_stories_bloc_image(false);
    full_image_height(false);
    fix_fixed_background_image();

    defineScrollDownClick('.home_stories .scroll-down--link', '.home_stories .bloc-deco--image');

    $('.latest_stories_link .block').each(function() {
        defineClickableBlock($(this));
    });

    replaceSVG();
});

$(document).ready()
{
    var openTag = "<strong class='head-label'>";
    var closeTag = " : </strong>";

    $('#page .content table').each(function( index, table )
    {
        $(table).each(function( indexTable, table )
        {
            var th = $(table).find('th p');
            var td = $(table).find('td p');

            var thArray = jQuery.makeArray( th );
            var tdArray = jQuery.makeArray( td );

            var modulo = "";
            for ( var j = 0; j < tdArray.length; j++ )
            {
                modulo = j % thArray.length;
                if (thArray[modulo] !== undefined)
                {
                    tdArray[j].innerHTML = openTag + thArray[modulo].innerHTML + closeTag + tdArray[j].innerHTML;
                }
            }
        })
    });


    $(".legal_notice_article .close img").on('click', function() {
        $('#legal_notice_article').hide(250,'linear');;
    });

    document.querySelector(".OpenCookieConsent").addEventListener('click', function(e){
        e.preventDefault();
        this.classList.remove("hidden");
    });


  // $('.header__right').prepend( $('#header__user').html() );

    // var basketContainer = $('#header__user .header__right__bloc--basket').size();
    // if ( basketContainer )
    // {
    //     $('.header__bottom .l-content').prepend(
    //         '<a href="' + $('#header__user .header__right__bloc--basket').attr('href') + '" class="mobile_basket_bloc">'
    //         + '<span class="inner">'
    //         + $('#header__user .header__right__bloc--basket .inner').html()
    //         + '</span>'
    //         + '</a>'
    //     );
    // }
}


$(document).ready(function() {

    $(".embed-html5_animation-link").fancybox({
        maxWidth	: 800,
        maxHeight	: 600,
        fitToView	: false,
        width		: '70%',
        height		: '70%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none'
    });

});

var player;
function onYouTubeIframeAPIReady() {
    if (typeof video_identifier != 'undefined')
    {
        player = new YT.Player('player', {
            playerVars: { 'autoplay': 0, 'showinfo': 0, 'wmode': 'opaque' },
            videoId: video_identifier,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    var runtime = "", totalSec = player.getDuration();
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = totalSec % 60;

    if (hours > 0) {
        runtime += hours + ":";
    }
    if (minutes > 0) {
        runtime += minutes + ":";
    }
    if (seconds > 0) {
        runtime += seconds;
    }

    if (runtime != "") {
        $('.bloc--youtube .duration p').text(runtime);
        $('.bloc--youtube .duration').css("display", "block");
    }

    resizeYoutubeVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        $('.bloc--youtube .duration').css("display", "none");
    }
}

function resizeYoutubeVideo()
{
    // Find all YouTube videos
    var $allVideos = $(".youtube-container iframe"),

    // The element that is fluid width
        $fluidEl = $(".youtube-container");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    // (You'll probably want to debounce this)
    $(window).resize(function() {

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));
            $el
                .parent()
                .height(newWidth * $el.data('aspectRatio'));

        });

        // Kick off one resize to fix all videos on page load
    }).resize();
}

$(document).ready(function(){

    if (typeof video_identifier != 'undefined')
    {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var youTubeURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+video_identifier+'&key='+api_key;
        var json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': youTubeURL,
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });
            return json;
        })();

        if (typeof json != 'undefined' && json != "")
        {
            var description = $.trim(json.items[0].snippet.description),
                $contentInner = $('.bloc--youtube .content .inner');

            /*Set the block*/
            $('.bloc--youtube .title').text(json.items[0].snippet.title);
            if (!description) {
                $contentInner.hide();
            } else {
                $contentInner.text('"' + description.substring(0, 100).split(" ").slice(0, -1).join(" ") + '..."');
            }
            $('.bloc--youtube').css("display", "block");
        }
    }

    if (typeof block_facebook != 'undefined' && block_facebook)
    {
        $.ajax({
            url: "/block/facebook",
            context: document.body
        }).done(function(data) {
                setContentFacebookBlock(data);
            });
    }

    function setContentFacebookBlock(data)
    {
        var obj = jQuery.parseJSON(data);
        var display_button = true;

        $(".bloc--facebook .content .inner").text(obj['content_message']);
        $(".read-it").attr("href",obj['link']);
        $(".fb-like").attr("data-href",obj['link']);
        $(".bloc--facebook").css('visibility', 'visible');
        $(".fb-like").css('visibility', 'visible');

    }

    if (typeof block_linkedin != 'undefined' && block_linkedin)
    {
        $.ajax({
            url: "/block/linkedin",
            context: document.body
        }).done(function(data) {
                setContentLinkedinBlock(data);
            });
    }

    function setContentLinkedinBlock(data)
    {
        var objLinkedin = jQuery.parseJSON(data);

        $(".bloc--likedin .bloc__image #image-linkedin-article").attr( "src", objLinkedin['image_url'] );
        $(".bloc--likedin .title").text( objLinkedin['title'] );
        $(".bloc--likedin .content .inner").text( objLinkedin['description'] );
        $(".bloc--likedin .read-it").attr( "href", objLinkedin['url_origin'] );
        $(".bloc--likedin #script-button").html('<script src="//platform.linkedin.com/in.js" type="text/javascript">en_US</script><script type="IN/FollowCompany" data-id="'+objLinkedin['company_id']+'" data-counter="none"></script>');
        $(".bloc--likedin").css('visibility', 'visible');
    }

})
