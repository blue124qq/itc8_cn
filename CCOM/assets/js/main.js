/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),n=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-a))<=o?r[r.length-1]=s.add(e):r.push(e),n=a}),r},n=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=n(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=i,r._parseOptions=n,r._apply=function(e,o){var s=n(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var a={
display:i};a[s.property]="",e.css(a),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,n-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,a){if(a&&"resize"===a.type){var n=t(window).width();if(n===e)return;e=n;
}i?-1===o&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});

var windowWidth = $(window).width();
var mobileBreakpoint = 765;
var tabletBreakpoint = 1280;
var mobileMenuOpen = false;
var mobileSearchOpen = false;
var isMobile = false;
var mobilMenuOffset = 0;
var	expandedMenuOffset = 0;

/*change viewpart if mobile*/
if (screen.width < mobileBreakpoint) {
    //var mvp = document.getElementById('viewport');
    //mvp.setAttribute('content','width=750, user-scalable=no');
	
}
/*check if mobile*/
if(windowWidth<=mobileBreakpoint){
	isMobile = true;
}else{
	isMobile = false;
}

(function(){
  "use strict";
	(function ($) {
	  var mobileScreen = $(window).width() < 768;
	  var navBackBtn, navCloseBtn, navLevelPrimary, navLevelChild;

	  $(function () {
		navLevelPrimary = $('#main-menu li.parent.primary-level');
		navLevelChild = $('#main-menu li.parent.child');
		navBackBtn = $('#main-menu .back-button');
		navCloseBtn = $('.close-nav-section');
		var timer;

		// Disable input focus on mobile devices
		$('input').blur();

		$(window).on("resize", function () {
		  clearTimeout(timer);
		  //call the function after half second
		  timer = setTimeout(function () {
			navComponents.default();
		  }, 200);

		  mobileScreen = $(window).width() < 768;
		  // Adjust dropdown height
		  if (mobileScreen) {
			$('.primary-level > .nav-section').css("height", "inherit");
		  } else {
			var desktopNavHeight = $('.parent.active > .nav-section').last().outerHeight();
			$('.primary-level > .nav-section').css("height",desktopNavHeight);
		  }

		  // Set desktop menu to fixed if user scrolled down on page
		  if ($(document).scrollTop() > 0 && !mobileScreen) {
			$(".main-menu-contain").addClass('active');
		  }
		});

		// Close menu if you click anywhere
		$(document).on('click', function (event) {
		  if (!mobileScreen) {
			if ($(event.target).closest('.nav-section').length === 0) {
			  $('#main-menu > ul > li.active').removeClass('active');
			}
		  }
		});

		// Enable default navigation components
		navComponents.default();
		$('.search').on('click', function (e) {
			navComponents.mobileSearch();
		});
		// First level navigation links
		navLevelPrimary.off('click');
		navLevelPrimary.on('click', '> a', function (e) {
		  if(!$(this).parent('li').hasClass("active")){
		  e.preventDefault();
		  }
		  e.stopPropagation();

		  var navHeight = $(this).parent('li').find('> .nav-section').outerHeight();
		  navComponents.adjustHeight($(this), navHeight);

		  $(this).parent('li').siblings().removeClass('active');
		  $(this).parent('li').toggleClass('active');

		  // Set classes for mobile screen
		  if (!mobileScreen) {
			if ($(this).parent('li').hasClass('active')) {
			  $('html').addClass('no-scroll');
			  $('nav#main-menu').addClass('active');
			} else {
			  $('html').removeClass('no-scroll');
			  $('nav#main-menu').removeClass('active');
			}
		  }
		  
		  var navHeight = $(this).parent('li').find('.active > .nav-section').last().outerHeight();
		  navComponents.adjustHeight($(this).parent('li').find('> .nav-section'), navHeight);
		});

		// Close mega menu
		navCloseBtn.on('click', function (e) {
		  $(this).parents('li').toggleClass('active');
		});

		// Desktop Search
		$('.search-submit').on('click', function (e) {
		  console.log('submit');
		  $(this).parent('.search-contain').find('.search-input').toggleClass('active');
		});
	  });

	  // Navigation Components
	  var navComponents = {
		default: function _default(e) {
		  // Mobile Functionlity
		  if (mobileScreen) {

			// Unbind From Desktop
			navLevelChild.unbind('click');
			$('.menuToggle').unbind('click');

			navLevelChild.on('click', function (e) {

			  e.stopPropagation();
			  var target = $(e.target);
			  if ($(this).hasClass('sub-list')) {
				e.offsetX = e.offsetX + 40;
			  }
			  var noLink = false;
			  if ( target.is( "a" ) && target.attr('href') == "#" ) {
				noLink = true;
			  }
			  
			  // Check to see if '+' or '-' is clicked
			  if (e.offsetX > target.outerWidth() || noLink) {
				e.preventDefault();
				$(this).toggleClass('active');

				var navSection = $('.parent.active > .nav-section');
				var navHeight = $(this).find('> .nav-section').outerHeight();
				
				navComponents.adjustHeight($(this), navHeight);

				// Check to see user outside the first level of menus
				if (navSection.length > 1) {

				  $('.primary-level.active .nav-section .back-button span').addClass('active');

				  // Remove any deeper opened nav sections
				  if ($(this).find('.parent.active').length > 0) {
					$(this).find('.parent.active').removeClass('active');
				  }

				  // Remove arrow from back button
				  if (navSection.length == 2) {
					$('.primary-level.active .nav-section .back-button span').addClass('active');
				  }
				}
			  }
			});

			// Mobile Menu Toggle
			$('.menuToggle').on('click', function (e) {
			  $('.mobile-search').removeClass('active');
			  navComponents.disableScroll();
			  navComponents.mobileActive();
			});

			// Mobile Search
			$('.search').on('click', function (e) {
			  $('nav#main-menu').removeClass('active');
			  $('html').removeClass('no-scroll');
			  //navComponents.mobileSearch();
			});
		  }
		  // Desktop Functionality
		  else {
			  // Unbind From Mobile Functions
			  navLevelChild.unbind('click');
			  navBackBtn.unbind('click');
			  
			  navLevelChild.on('click', '> a', function (e) {
				if(!($(this).parent('li')).is(".sub-list"))
				{
					var navHeight = $(this).parent('li').find('> .nav-section').outerHeight();
					
					navComponents.activate($(this), e, navHeight);
					navComponents.adjustHeight($(this), navHeight);
					$(this).parents('.nav-section').find('.back-button span').addClass('active');
				}
			  });

			  // Navigation child section back button
			  navBackBtn.on('click', 'span', function (e) {
				var navSectionFirst = $('.parent.active > .nav-section');
				$('.parent.active > .nav-section').last().parent('.parent.active').removeClass('active');
				navComponents.adjustHeight($(this), "auto");
				var navSectionSecond = $('.parent.active > .nav-section');
				console.log(navSectionSecond[navSectionSecond.length - 1]);
				var navHeight = navSectionSecond.last().outerHeight();
				
				navComponents.adjustHeight($(this), navHeight);

				// Check to see user outside the first level of menus
				if (navSectionFirst.length > 1) {

				  // Remove arrow from back button
				  if (navSectionFirst.length == 2) {
					$(this).removeClass('active');
				  }
				}
			  });
			}
		},
		activate: function activate($this, e, navHeight) {
		  e.preventDefault();
		  e.stopPropagation();
		  $this.parent('li').addClass('active');
		},
		adjustHeight: function adjustHeight($this, navHeight) {
		  if (!mobileScreen) {
			//$this.parents('.primary-level > .nav-section').css("height", navHeight);
			$this.parents('.primary-level').find('.nav-section').first().css("height", navHeight);
		  }
		},
		disableScroll: function disableScroll() {
		  $('html').toggleClass('no-scroll');
		},
		mobileActive: function mobileActive() {
		  $('nav#main-menu').toggleClass('active');

		  // Setup mobile scroll to parent menu when use opens navigation
		  if ($('.primary-level.active').length > 0) {
			var activeMenu = $('.primary-level.active');
			var activeMenuTop = activeMenu.position().top;
			localStorage.setItem('menuTopPosition', activeMenuTop);

			$('#main-menu').animate({
			  scrollTop: localStorage.getItem('menuTopPosition')
			}, '200');
		  }
		},
		mobileSearch: function mobileSearch() {
		  $('.mobile-search').toggleClass('active');
		}
	  };
	})(jQuery);
  // Define your library strictly...
})();

window.addEventListener("resize", function(e) {
	windowWidth = $(window).width();
	mobilMenuOffset = $('.header').outerHeight();
	// console.log("height: "+mobilMenuOffset);
	$(".main-menu-contain .logo-bar").hide();
	if(windowWidth<=mobileBreakpoint){
		isMobile = true;
		menufixed = false;
		$(".main-menu-contain").removeClass('active');
	}else{
		isMobile = false;
		if(menufixed && windowWidth > (tabletBreakpoint-150)){
			$(".main-menu-contain .logo-bar").show();
		}
	}
});

var menufixed = false;
window.addEventListener("scroll", function(e) {
	if(windowWidth>mobileBreakpoint){
		var headerheight = $(".header").outerHeight();
		var top  = window.pageYOffset || document.documentElement.scrollTop;
		if(menufixed && top < headerheight){
			menufixed = false;
			$(".main-menu-contain").removeClass('active');
			$(".main-menu-contain .logo-bar").fadeOut(300);
		}else if(!menufixed && top > headerheight){
			menufixed = true;
			$(".main-menu-contain").addClass('active');
			if(windowWidth > (tabletBreakpoint-150)){
				$(".main-menu-contain .logo-bar").fadeIn(800);
			}
		}
	}
});

window.addEventListener("orientationchange", function() {
	var mvp = document.getElementById('viewport');
    if((window.orientation == 0 || window.orientation == 180) && screen.width < mobileBreakpoint){
		//mvp.setAttribute('content','width=750, user-scalable=no');
	}else{
		//mvp.setAttribute('width=device-width, minimum-scale=1.0, user-scalable=no');
	}
}, false);



/*************** 
	FUNCTIONS
***************/
function isMobileDevice() {
	"use strict";
	try {
		if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		}
		return false;
	}
	catch(e){ console.log("Error in isMobile"); 
		return false; 
	}
}

function getUrlParameter(sParam){
	"use strict";
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam)
        {
            return sParameterName[1];
        }
    }
}
/* Image Picker
 by Rodrigo Vera

 Version 0.3.1
 Full source at https://github.com/rvera/image-picker
 MIT License, https://github.com/rvera/image-picker/blob/master/LICENSE
 Image Picker
 by Rodrigo Vera

 Version 0.3.0
 Full source at https://github.com/rvera/image-picker
 MIT License, https://github.com/rvera/image-picker/blob/master/LICENSE
*/
(function(){var ImagePicker,ImagePickerOption,both_array_are_equal,sanitized_options,bind=function(fn,me){return function(){return fn.apply(me,arguments)}},indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};jQuery.fn.extend({imagepicker:function(opts){if(opts==null){opts={}}return this.each(function(){var select;select=jQuery(this);if(select.data("picker")){select.data("picker").destroy()}select.data("picker",new ImagePicker(this,sanitized_options(opts)));if(opts.initialized!=null){return opts.initialized.call(select.data("picker"))}})}});sanitized_options=function(opts){var default_options;default_options={hide_select:true,show_label:false,initialized:void 0,changed:void 0,clicked:void 0,selected:void 0,limit:void 0,limit_reached:void 0,font_awesome:false};return jQuery.extend(default_options,opts)};both_array_are_equal=function(a,b){var i,j,len,x;if(!a||!b||a.length!==b.length){return false}a=a.slice(0);b=b.slice(0);a.sort();b.sort();for(i=j=0,len=a.length;j<len;i=++j){x=a[i];if(b[i]!==x){return false}}return true};ImagePicker=function(){function ImagePicker(select_element,opts1){this.opts=opts1!=null?opts1:{};this.sync_picker_with_select=bind(this.sync_picker_with_select,this);this.select=jQuery(select_element);this.multiple=this.select.attr("multiple")==="multiple";if(this.select.data("limit")!=null){this.opts.limit=parseInt(this.select.data("limit"))}this.build_and_append_picker()}ImagePicker.prototype.destroy=function(){var j,len,option,ref;ref=this.picker_options;for(j=0,len=ref.length;j<len;j++){option=ref[j];option.destroy()}this.picker.remove();this.select.off("change",this.sync_picker_with_select);this.select.removeData("picker");return this.select.show()};ImagePicker.prototype.build_and_append_picker=function(){if(this.opts.hide_select){this.select.hide()}this.select.on("change",this.sync_picker_with_select);if(this.picker!=null){this.picker.remove()}this.create_picker();this.select.after(this.picker);return this.sync_picker_with_select()};ImagePicker.prototype.sync_picker_with_select=function(){var j,len,option,ref,results;ref=this.picker_options;results=[];for(j=0,len=ref.length;j<len;j++){option=ref[j];if(option.is_selected()){results.push(option.mark_as_selected())}else{results.push(option.unmark_as_selected())}}return results};ImagePicker.prototype.create_picker=function(){this.picker=jQuery("<ul class='thumbnails image_picker_selector'></ul>");this.picker_options=[];this.recursively_parse_option_groups(this.select,this.picker);return this.picker};ImagePicker.prototype.recursively_parse_option_groups=function(scoped_dom,target_container){var container,j,k,len,len1,option,option_group,ref,ref1,results;ref=scoped_dom.children("optgroup");for(j=0,len=ref.length;j<len;j++){option_group=ref[j];option_group=jQuery(option_group);container=jQuery("<ul></ul>");container.append(jQuery("<li class='group_title'>"+option_group.attr("label")+"</li>"));target_container.append(jQuery("<li class='group'>").append(container));this.recursively_parse_option_groups(option_group,container)}ref1=function(){var l,len1,ref1,results1;ref1=scoped_dom.children("option");results1=[];for(l=0,len1=ref1.length;l<len1;l++){option=ref1[l];results1.push(new ImagePickerOption(option,this,this.opts))}return results1}.call(this);results=[];for(k=0,len1=ref1.length;k<len1;k++){option=ref1[k];this.picker_options.push(option);if(!option.has_image()){continue}results.push(target_container.append(option.node))}return results};ImagePicker.prototype.has_implicit_blanks=function(){var option;return function(){var j,len,ref,results;ref=this.picker_options;results=[];for(j=0,len=ref.length;j<len;j++){option=ref[j];if(option.is_blank()&&!option.has_image()){results.push(option)}}return results}.call(this).length>0};ImagePicker.prototype.selected_values=function(){if(this.multiple){return this.select.val()||[]}else{return[this.select.val()]}};ImagePicker.prototype.toggle=function(imagepicker_option,original_event){var new_values,old_values,selected_value;old_values=this.selected_values();selected_value=imagepicker_option.value().toString();if(this.multiple){if(indexOf.call(this.selected_values(),selected_value)>=0){new_values=this.selected_values();new_values.splice(jQuery.inArray(selected_value,old_values),1);this.select.val([]);this.select.val(new_values)}else{if(this.opts.limit!=null&&this.selected_values().length>=this.opts.limit){if(this.opts.limit_reached!=null){this.opts.limit_reached.call(this.select)}}else{this.select.val(this.selected_values().concat(selected_value))}}}else{if(this.has_implicit_blanks()&&imagepicker_option.is_selected()){this.select.val("")}else{this.select.val(selected_value)}}if(!both_array_are_equal(old_values,this.selected_values())){this.select.change();if(this.opts.changed!=null){return this.opts.changed.call(this.select,old_values,this.selected_values(),original_event)}}};return ImagePicker}();ImagePickerOption=function(){function ImagePickerOption(option_element,picker,opts1){this.picker=picker;this.opts=opts1!=null?opts1:{};this.clicked=bind(this.clicked,this);this.option=jQuery(option_element);this.create_node()}ImagePickerOption.prototype.destroy=function(){return this.node.find(".thumbnail").off("click",this.clicked)};ImagePickerOption.prototype.has_image=function(){return this.option.data("img-src")!=null};ImagePickerOption.prototype.is_blank=function(){return!(this.value()!=null&&this.value()!=="")};ImagePickerOption.prototype.is_selected=function(){var select_value;select_value=this.picker.select.val();if(this.picker.multiple){return jQuery.inArray(this.value(),select_value)>=0}else{return this.value()===select_value}};ImagePickerOption.prototype.mark_as_selected=function(){return this.node.find(".thumbnail").addClass("selected")};ImagePickerOption.prototype.unmark_as_selected=function(){return this.node.find(".thumbnail").removeClass("selected")};ImagePickerOption.prototype.value=function(){return this.option.val()};ImagePickerOption.prototype.label=function(){if(this.option.data("img-label")){return this.option.data("img-label")}else{return this.option.text()}};ImagePickerOption.prototype.clicked=function(event){this.picker.toggle(this,event);if(this.opts.clicked!=null){this.opts.clicked.call(this.picker.select,this,event)}if(this.opts.selected!=null&&this.is_selected()){return this.opts.selected.call(this.picker.select,this,event)}};ImagePickerOption.prototype.create_node=function(){var image,imgAlt,imgClass,thumbnail;this.node=jQuery("<li/>");if(this.option.data("font_awesome")){image=jQuery("<i>");image.attr("class","fa-fw "+this.option.data("img-src"))}else{image=jQuery("<img class='image_picker_image'/>");image.attr("src",this.option.data("img-src"))}thumbnail=jQuery("<div class='thumbnail'>");imgClass=this.option.data("img-class");if(imgClass){this.node.addClass(imgClass);image.addClass(imgClass);thumbnail.addClass(imgClass)}imgAlt=this.option.data("img-alt");if(imgAlt){image.attr("alt",imgAlt)}thumbnail.on("click",this.clicked);thumbnail.append(image);if(this.opts.show_label){thumbnail.append(jQuery("<p/>").html(this.label()))}this.node.append(thumbnail);return this.node};return ImagePickerOption}()}).call(this);
/*--rotators--*/
    /*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: false,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.hidden = 'hidden';
            _.paused = false;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, dataSettings, settings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);
            _.checkResponsive(true);

        }

        return Slick;

    }());

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options.slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options.slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="' + _.options.dotsClass + '">';

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
            }

            dotString += '</ul>';

            _.$dots = $(dotString).appendTo(
                _.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.html(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.target),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide);

            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

                $('li', _.$dots)
                    .off('mouseenter.slick', $.proxy(_.setPaused, _, true))
                    .off('mouseleave.slick', $.proxy(_.setPaused, _, false));

            }

        }

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.$list.off('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.html(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut(); 
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.setPaused, _, true))
                .on('mouseleave.slick', $.proxy(_.setPaused, _, false));
        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        _.$list.on('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.on('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {
                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                        });
                };

                imageToLoad.src = imageSource;

            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.paused = false;
        _.autoPlay();

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        _.$slider.trigger('afterChange', [_, index]);

        _.animating = false;

        _.setPosition();

        _.swipeLeft = null;

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }
        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function() {

        var _ = this,
            imgCount, targetImage;

        imgCount = $('img[data-lazy]', _.$slider).length;

        if (imgCount > 0) {
            targetImage = $('img[data-lazy]', _.$slider).first();
            targetImage.attr('src', null);
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();

                    if (_.options.adaptiveHeight === true) {
                        _.setPosition();
                    }
                })
                .error(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();
                });
        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, firstVisible;

        firstVisible = _.slideCount - _.options.slidesToShow;

        // check that the new breakpoint can actually accept the
        // "current slide" as the current slide, otherwise we need
        // to set it to the closest possible value.
        if ( !_.options.infinite ) {
            if ( _.slideCount <= _.options.slidesToShow ) {
                _.currentSlide = 0;
            } else if ( _.currentSlide > firstVisible ) {
                _.currentSlide = firstVisible;
            }
        }

         currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === "array" && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(0);

        _.setPosition();

        _.$slider.trigger('reInit', [_]);

        if (_.options.autoplay === true) {
            _.focusHandler();
        }

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function(option, value, refresh) {

        var _ = this, l, item;

        if( option === "responsive" && $.type(value) === "array" ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== "array" ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        } else {
            _.options[option] = value;
        }

        if (refresh === true) {
            _.unload();
            _.reinit();
        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.setPaused = function(paused) {

        var _ = this;

        if (_.options.autoplay === true && _.options.pauseOnHover === true) {
            _.paused = paused;
            if (!paused) {
                _.autoPlay();
            } else {
                _.autoPlayClear();
            }
        }
    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'left';
            } else {
                return 'right';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount;

        _.dragging = false;

        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            switch (_.swipeDirection()) {
                case 'left':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 0;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'left']);
                    break;

                case 'right':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 1;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'right']);
                    break;
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if (document[_.hidden]) {
            _.paused = true;
            _.autoPlayClear();
        } else {
            if (_.options.autoplay === true) {
                _.paused = false;
                _.autoPlay();
            }
        }

    };
    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.on('focus.slick blur.slick', '*', function(event) {
            event.stopImmediatePropagation();
            var sf = $(this);
            setTimeout(function() {
                if (_.isPlay) {
                    if (sf.is(':focus')) {
                        _.autoPlayClear();
                        _.paused = true;
                    } else {
                        _.paused = false;
                        _.autoPlay();
                    }
                }
            }, 0);
        });
    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

/*--end rotators--*/
	
/*--mod-heroslider--*/
$(document).ready(function(){
	/****************
	 MODULE - Hero Slider
	*****************/
	var slider = $('.mod-heroslider .slider').slick({
		accessibility:false,
		adaptiveHeight: true,
		arrows: true,
		autoplay: false,
		dots: true,
 	 	fade: true,
 	 	swipe: true,
		responsive: [
			{
			  breakpoint: 990,
			  settings: {
				dots: true,
				arrows: false
			  }
			}
		]
	}).on('swipe', function(event, slick, direction){
		$(window).scroll();
	});
	
	
	// needed for IE, flexbox
	/*$('.mod-heroslider').each(function(){
		var sliderHeight = $(this).find(".slider").height();
		var tempheight = sliderHeight;
		$(this).find('.slick-slide').each(function(){
			tempheight = $(this).outerHeight();
			if(sliderHeight > tempheight){ tempheight = sliderHeight;}
			$(this).find(".slider-image, .hero-video").css("height",tempheight);
		});
	});
	window.addEventListener("resize", function(e) {
		$(".slider-image, .hero-video").css("height","");
		if(!isMobile){
			$('.mod-heroslider').each(function(){
				var sliderHeight = $(this).find(".slider").height();
				var tempheight = sliderHeight;
				$(this).find('.slick-slide').each(function(){
					tempheight = $(this).outerHeight();
					if(sliderHeight > tempheight){ tempheight = sliderHeight;}
					if(isMobile){ tempheight = tempheight-180;}
					$(this).find(".slider-image, .hero-video").css("height",tempheight);
				});
			});
		}
	});*/
	
	/*paralax videos*/
	/*window.addEventListener("scroll", function(e) {
		$(".hero-video iframe").css("top",$(window).scrollTop()-0);
	});
	*/
	
	$(document.documentElement).on('keyup',function(event) {
		var tempSliderSelector  = $('.mod-heroslider .slider:hover').first();
		if(tempSliderSelector.length){
			if (event.keyCode == 37) {
				tempSliderSelector.slick("slickPrev");
			} else if (event.keyCode == 39) {
				tempSliderSelector.slick("slickNext");
			}
		}
	});
	
	
});
/*end document.ready*/
/*--end mod-heroslider--*/

/*--mod-tabs--*/
 $(document).ready(function(){
	
	$(window).resize(function(e){
		updateUI();
	});
	updateUI();
	 
});
/*end document.ready*/

// event handler for window resize
function updateUI(){
	if(isMobile){
		tabsToAccordions();
	} else {
		accordionsToTabs();
	}
}
 
// changes tabs to accordions (jquery ui)
function tabsToAccordions(){
	$('.mod-tabs .tabs').each(function(){
		var a = $('<div class="accordion">');
		var b = new Array();
		$(this).find('>ul>li').each(function(){
			var linktext = $(this).html();
			linktext = linktext.replace("<a","<span class='showhide-header'");
			linktext = linktext.replace("/a>","/span>");
			b.push('<h3>'+linktext+'</h3>');
		});
		var c = new Array();
		$(this).find('>div').each(function(){
			c.push('<div>'+$(this).html()+'</div>');
		});
		for(var i = 0; i < b.length; i++){
			a.append(b[i]).append(c[i]);
		}
		$(this).before(a);
		$(this).remove();
	})
	$('.mod-tabs .accordion').accordion({
		heightStyle: "content", 
		collapsible: true,
		active:false
	});
	$('.mod-tabs .accordion h3.ui-accordion-header').off('click').click(function(){
        $(this).next().stop(true, false).slideToggle(500);
		$(this).toggleClass("open");
    });
}

// changes accordions to tabs (jquery ui)
function accordionsToTabs(){
	$('.mod-tabs .accordion').each(function(){
		var a = $('<div class="tabs">');
		var count = 0;
		var b = $('<ul>');
		$(this).find('>h3').each(function(){
			count++;
			var linktext = $(this).text();
			b.append('<li><a href="#tabs-'+count+'">'+linktext+'</a></li>');
		});
		var count = 0;
		var c = $('');
		$(this).find('>div').each(function(){
			count++;
			c=c.add('<div id="tabs-'+count+'">'+$(this).html()+'</div>');
		});
		a.append(b).append(c);
		$(this).before(a);
		$(this).remove();
	});
	$('.mod-tabs .tabs').tabs();
}
/*--end mod-tabs--*/
	
/*--mod-contentpreview--*/


$(document).ready(function(){
	/****************
	 MODULE - contentpreview
	*****************/
	var isSlider = false;
	var previewLimitMobile = 2;
		
	//toggle
    $('.mod-contentpreview .load-more').click(function () {
		var loadCount = $(this).parents(".mod-contentpreview").attr("data-load-count")?$(this).parents(".mod-contentpreview").attr("data-load-count"):1;
		loadCount++;
		$(this).parents(".mod-contentpreview").attr("data-load-count",parseInt(loadCount));
		var slideritems = $(this).parents(".mod-contentpreview").find(".slider > div");
		var slideritemscount = slideritems.length;
		$(this).parents(".mod-contentpreview").find(".slider > div:lt("+(previewLimitMobile*loadCount)+")").show();
		if(previewLimitMobile*loadCount >= slideritemscount){
			//$(this).css("opacity",0);
			$(this).hide();
			$(this).next().show();
		}
		//$(this).next().show();  //disabling "view less" for now
    });
    $('.mod-contentpreview .show-less').click(function () {
		$(this).hide();
		$(this).prev().show();
		$(this).parents(".mod-contentpreview").attr("data-load-count","");
		 setPreviewRows();
		 $("body").animate({'scrollTop':$(this).parents(".mod-contentpreview").offset().top-$(".header").outerHeight()},500);
    });


	var videoDivSetTimeout = null;
	function videoDivSet(isReset){
		clearTimeout(videoDivSetTimeout);
		videoDivSetTimeout = setTimeout(function(){
			$('.mod-contentpreview .videoContain').stop(true,false);
			$(".mod-contentpreview .slick-slide").stop(true,false).height("");
			$(".mod-contentpreview .slider-item-content").stop(true,false).css("min-height","");
			$(".mod-contentpreview .slick-track").each(function(){
				var maxhalf = 0;
				$(this).find(".slider-item").each(function(){
					var thisHeight = $(this).height();
					if(!$(this).hasClass("half-height")){
						thisHeight = thisHeight*0.5;
					}
					if(maxhalf<thisHeight){
						maxhalf=thisHeight;
					}
				});
				$(this).find(".slick-slide").height(maxhalf*2);
				$(this).find(".pos-bottom .slider-item-content").css("min-height",maxhalf);
			});
			
			if(isReset){
				$('.mod-contentpreview .videoContain').css('height',"");
				$('.mod-contentpreview .videoContain').css('width',"");
			}else{
				$('.mod-contentpreview .videoContain:visible').each(function(){
					var parentObj = $(this).parent();
					if(parentObj.hasClass("half-height")){
						var parentWidth = parentObj.width();
						var contentWidth = $(this).next().outerWidth();
						if(parentWidth-contentWidth){
							$(this).width(1+parentWidth-contentWidth);
						}else{
							$(this).width("100%");
						}
					}else{
						var parentHeight = parentObj.height();
						var contentHeight = $(this).next().outerHeight();
						if(parentHeight-contentHeight){
							$(this).height(parentHeight-contentHeight);
						}else{
							$(this).height("auto");
						}
					}
				});
			}
		},100);
	}
	
	
	function setPreviewRows(){
		
		$('.mod-contentpreview').each(function(){
			$(this).find(".show-less").hide();
			$(this).find('.slider > div').hide();
			$(this).find('.slider > div:lt('+previewLimitMobile+')').show();
			$(this).each(function(){			
				if($(this).find(".slider > div").length>previewLimitMobile){ 
					$(this).find(".load-more").show();
				}else{
					$(this).find(".load-more").hide();
				}
			});
		});
		
	}
	
	
	function slickify(){
		$(".slider > div").show();
		$('.mod-contentpreview').each(function(){
			if($(this).parents(".narrow").length){
				$(this).find('.slider').not('.slick-initialized').slick({
					accessibility:false,
					arrows: true,
					dots: true,
					slidesToShow: 2,
					slidesToScroll: 2,
					touchThreshold:30,
					infinite: false,
					responsive: [
						{
						  breakpoint: 1280,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true,
							arrows: true
						  }
						},
						{
						  breakpoint: 990,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true,
							arrows: false
						  }
						}
					]
				});
			}else{
				$(this).find('.slider').not('.slick-initialized').slick({
					accessibility:false,
					arrows: true,
					dots: true,
					slidesToShow: 2,
					slidesToScroll: 2,
					touchThreshold:30,
					infinite: false,
					responsive: [
						{
						  breakpoint: 990,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true,
							arrows: false
						  }
						}
					]
				});
			}
		});
		
		$('.mod-contentpreview .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			videoDivSet();
		});
		$('.mod-contentpreview .slider').addClass("slickOn");
	}
	
	
	if (!isMobile) {
		isSlider = true;
		slickify();   
		videoDivSet();
	}else if (isMobile) {
		setPreviewRows();
		videoDivSet('reset');
	}
	
	
	window.addEventListener("resize", function(e) {
		//$(".mod-contentpreview").find(".show-less").hide();
		//$(".mod-contentpreview").find(".load-more").hide();
			
		if (!isSlider && !isMobile) {
			$(".mod-contentpreview").find(".show-less").hide();
			$(".mod-contentpreview").find(".load-more").hide();
			isSlider = true;
			slickify();   
		}
		else if (isSlider && isMobile) {
			isSlider = false;
			$('.mod-contentpreview .slider').each(function(){
				if($(this).hasClass("slickOn")){
					$(this).slick("unslick");
					$(this).removeClass("slickOn");
					//console.log("unslick");
				}
			});
			setPreviewRows();
		}else{
			videoDivSet();
		}
		
	});
	
	
	$(document.documentElement).on('keyup',function(event) {
		var tempSliderSelector = $('.mod-contentpreview .slider:hover').first();
		if(tempSliderSelector.length){
			if (event.keyCode == 37) {
				if(!tempSliderSelector.find(".slick-prev.slick-disabled").length){
					tempSliderSelector.slick("slickPrev");
				}
			} else if (event.keyCode == 39) {
				if(!tempSliderSelector.find(".slick-next.slick-disabled").length){
					tempSliderSelector.slick("slickNext");
				}
			}
		}
	});
	
	
});
/*end document.ready*/
/*--end mod-contentpreview--*/	

/*--mod-results--*/
/*var resultsIsMobile = false;
var resultsLimitDesktop = 8;
var resultsLimitMobile = 4;
var resultsLimit = resultsLimitDesktop;*/

$(document).ready(function(){
	
	/*
	function setResultRows(){
		if(isMobile){
			resultsLimit = resultsLimitMobile;
			resultsIsMobile = true; 
		}else{
			resultsLimit = resultsLimitDesktop;
			resultsIsMobile = false; 
		}
		$('.mod-results').each(function(){
			$(this).find('.result').hide();
			$(this).find('.result:lt('+resultsLimit+')').show();
			$(this).each(function(){
				$(this).find(".showLess").hide();
				if($(this).find(".result").length>resultsLimit){ 
					$(this).find(".load-more").show();
				}else{
					$(this).find(".load-more").show();
				}
			});
		});
	}
	
	$(window).resize(function(e){
		var tempResultLimit = resultsLimit;
		if(!isMobile){
			resultsLimit = resultsLimitDesktop;
		}else{
			resultsLimit = resultsLimitMobile;
		}
		if(tempResultLimit !== resultsLimit){
			setResultRows();
		}else{
			if (resultsIsMobile && !isMobile) {
				setResultRows();
			}if (!resultsIsMobile && isMobile) {
				setResultRows();
			}
		}
	});
	setResultRows();
	
	
	//toggle
    $('.mod-results .load-more').click(function () {
		var loadCount = $(this).parents(".mod-results").attr("data-load-count")?$(this).parents(".mod-results").attr("data-load-count"):1;
		loadCount++;
		$(this).parents(".mod-results").attr("data-load-count",parseInt(loadCount));
		
		var resultitems = $(this).parents(".mod-results").find(".result");
		var resultitemscount = resultitems.length;
		$(this).parents(".mod-results").find(".result:lt("+(resultsLimit*loadCount)+")").show();
		if(resultsLimit*loadCount >= resultitemscount){
			//$(this).css("opacity",0);
			$(this).hide();
			$(this).next().show();
		}
    });
    $('.mod-results .show-less').click(function () {
		$(this).parents(".mod-results").attr("data-load-count","");
		$(this).hide();
		$(this).prev().show();
		setResultRows();
		$("body").animate({'scrollTop':$(this).parents(".mod-results").offset().top-$(".header").outerHeight()},500);
    });
	*/
});
/*end document.ready*/
/*--end mod-results--*/	

/*--mod-sectionlisting--*/
    
/*--end mod-sectionlisting--*/	

/*--mod-testimonial--*/
$(document).ready(function(){

	
	if(windowWidth > mobileBreakpoint ){

		var testimonialHeight = $('.testimonial').height();
		var rolloverHeight = $('.rollover-content').height();
		if (testimonialHeight<rolloverHeight){
			$('.testimonial').height(rolloverHeight+60);
		}

		var rollover = null;
		var testimoialtimeout = null;
		$(".testimonial-content").on("mouseenter",function(){
			clearTimeout(testimoialtimeout);
			$(this).parents('.mod-testimonial').find(".rollover").animate({"opacity":"0","top":'220px'},50);
			$(this).find(".rollover").css("top",0);
			$(this).find(".rollover").stop(true,false).animate({"opacity":"1","top":0},100);
		}).on("mouseleave",function(){
			$(this).find(".rollover").stop(true,false).animate({"opacity":"0"},100);
			rollover = $(this).find(".rollover");
			testimoialtimeout = setTimeout(function(){
				rollover.css("top",'220px');
			},100);
		});
	}
	
});
/*end document.ready*/
/*--end mod-testimonial--*/	

/*--mod-showhide--*/
$(document).ready(function(){
	$('.mod-showhide .accordion').accordion({
		heightStyle: "content", 
		collapsible: true,
		active:false
	});
	$('.mod-showhide .accordion h3.ui-accordion-header').off('click').click(function(){
        $(this).next().stop(true, false).slideToggle(500);
		if( $(this).hasClass("open") ){
			$(this).removeClass("open");
		} else {
			$(this).addClass("open");
		}
    });
});
/*end document.ready*/
/*--end mod-showhide--*/	

/*--mod-morestories--*/
   
/*--end mod-morestories--*/	

/*--mod-cta--*/

/*--end mod-cta--*/	

/*--mod-callout--*/
    
/*--end mod-callout--*/	

/*--mod-filter--*/
$(document).ready(function(){
	$('.form-accordian').accordion({
		heightStyle: "content", 
		collapsible: true,
		active:true
	});
	
	/*accordians only on mobile*/
	$('.mod-filter .form-accordian .form-header').off('click').click(function(){
		if($(window).width() <= mobileBreakpoint){
			$(this).next().stop(true, false).slideToggle(500);
			$(this).toggleClass("open");
		}
    });
	
});
/*end document.ready*/
/*--end mod-filter--*/

/*--mod-form--*/
    $(document).ready(function(){

		// $(".mod-form label").click(function(){
		// 	$(this).find("input[type='checkbox']").click();
		// });

	// checkboxes
	$("input[type='checkbox']").change(function(){
		var labelId = $(this).parent();
		if ( labelId.attr("class")==="checkbox-off" ) {
			labelId.addClass("checkbox-on");
			labelId.removeClass("checkbox-off");
		} else {
			labelId.removeClass("checkbox-on");
			labelId.addClass("checkbox-off");
		}
	}); // end checkbox.each

	//form validation
	$(".mod-form form").submit(function(event){
		event.preventDefault();
		event.stopPropagation();
		
		if($(this).valid()){		
			$('.top-error-msg').stop(true,false).slideUp();	
			$(this).find(".formFields").fadeOut(function(){
				$('.mod-form .form-confirm').fadeIn();			
			});			
		} else {
			$('.pagecontain .content-header p').hide();
			$('.top-error-msg').slideDown();
			//$('html, body').animate({
//				scrollTop: $("input.error").first().offset().top-100
//			}, 1000);
		}
		return false;
		
	});
	
	$(".mod-form form").validate({
		wrapper: 'span',
		rules: {
			firstName: {
				required: true
			},
			lastName: {
				required: true
			},
			company: {
				required: true
			},
			country: {
				required: true
			},
			state: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		}
	});
	$.extend(jQuery.validator.messages, {
		required: "<b>ERROR:</b> Error specific message to go here"		
//		remote: "Please fix this field.",
//		email: "Please enter a valid email address.",
//		url: "Please enter a valid URL.",
//		date: "Please enter a valid date.",
//		dateISO: "Please enter a valid date (ISO).",
//		number: "Please enter a valid number.",
//		digits: "Please enter only digits.",
//		creditcard: "Please enter a valid credit card number.",
//		equalTo: "Please enter the same value again.",
//		accept: "Please enter a value with a valid extension.",
//		maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
//		minlength: jQuery.validator.format("Please enter at least {0} characters."),
//		rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
//		range: jQuery.validator.format("Please enter a value between {0} and {1}."),
//		max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
//		min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
	});
	


	
}); /*end document.ready*/
/*--end mod-form--*/	

/*--mod-content blocks--*/
/**********************
	MODULE - CONTENT BLOCKS
**********************/


var blocksLimitDesktop = 6;
var blocksLimitMobile = 3;
var blocksIsMobile = false;

var blocksLimit = blocksLimitDesktop;

$(document).ready(function(){

	/*if(!isMobileDevice()){
		$('.mod-contentblocks .block-item .block-image').on('mouseenter',function(){	
			$(this).find('.block-content').stop().fadeOut(300);
			$(this).find('.block-hover').stop().css("opacity",1).fadeIn(300);
		}).on('mouseleave',function(){	
			$(this).find('.block-hover').stop().fadeOut(300);;
			$(this).find('.block-content').stop().fadeIn(300);
		})
	}*/
	if(!isMobile){
		blocksLimit = blocksLimitDesktop;
	}else{
		blocksLimit = blocksLimitMobile;
	}
	
	//toggle
	$('.mod-contentblocks .load-more').click(function () {
		var loadCount = $(this).parents(".mod-contentblocks").attr("data-load-count")?$(this).parents(".mod-contentblocks").attr("data-load-count"):1;
		loadCount++;
		$(this).parents(".mod-contentblocks").attr("data-load-count",parseInt(loadCount));
		var slideritems = $(this).parents(".mod-contentblocks").find(".block-item");
		var slideritemscount = slideritems.length;
		$(this).parents(".mod-contentblocks").find(".block-item:lt("+(blocksLimit*loadCount)+")").show();
		if(blocksLimit*loadCount >= slideritemscount){
			$(this).hide();
			$(this).next().show();
		}
	});
	$('.mod-contentblocks .show-less').click(function () {
		$(this).parents(".mod-contentblocks").attr("data-load-count","");
		$(this).hide();
		$(this).prev().show();
		setBlockRows();
		$("body").animate({'scrollTop':$(this).parents(".mod-contentblocks").offset().top-$(".header").outerHeight()},500);
	});
		
	window.addEventListener("resize", function(e) {
		var tempLimit = blocksLimit;
		if(!isMobile){
			blocksLimit = blocksLimitDesktop;
		}else{
			blocksLimit = blocksLimitMobile;
		}
		if(tempLimit !== blocksLimit){
			setBlockRows();
		}
	});
		
	function setBlockRows(){
		$('.mod-contentblocks').each(function(){
			$(this).find(".show-less").hide();
			$(this).find('.block-item').hide();
			$(this).find('.block-item:lt('+blocksLimit+')').show();
			$(this).each(function(){			
				if($(this).find(".block-item").length>blocksLimit){ 
					$(this).find(".load-more").show();
				}else{
					$(this).find(".load-more").hide();
				}
			});
		});
	}
	
	setBlockRows();

}); /*end document.ready*/
/*--end mod-content blocks--*/	

/*Components for Modal*/
/*! formstone v1.2.1 [core.js] 2016-08-02 | GPL-3.0 License | formstone.it */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){m.Plugins[a].initialized||(m.Plugins[a].methods._setup.call(document),m.Plugins[a].initialized=!0)}function c(a,b,c,d){var e,f={raw:{}};d=d||{};for(e in d)d.hasOwnProperty(e)&&("classes"===a?(f.raw[d[e]]=b+"-"+d[e],f[d[e]]="."+b+"-"+d[e]):(f.raw[e]=d[e],f[e]=d[e]+"."+b));for(e in c)c.hasOwnProperty(e)&&("classes"===a?(f.raw[e]=c[e].replace(/{ns}/g,b),f[e]=c[e].replace(/{ns}/g,"."+b)):(f.raw[e]=c[e].replace(/.{ns}/g,""),f[e]=c[e].replace(/{ns}/g,b)));return f}function d(){var a,b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"},c=["transition","-webkit-transition"],d={transform:"transform",MozTransform:"-moz-transform",OTransform:"-o-transform",msTransform:"-ms-transform",webkitTransform:"-webkit-transform"},e="transitionend",f="",g="",h=document.createElement("div");for(a in b)if(b.hasOwnProperty(a)&&a in h.style){e=b[a],m.support.transition=!0;break}p.transitionEnd=e+".{ns}";for(a in c)if(c.hasOwnProperty(a)&&c[a]in h.style){f=c[a];break}m.transition=f;for(a in d)if(d.hasOwnProperty(a)&&d[a]in h.style){m.support.transform=!0,g=d[a];break}m.transform=g}function e(){m.windowWidth=m.$window.width(),m.windowHeight=m.$window.height(),q=l.startTimer(q,r,f)}function f(){for(var a in m.ResizeHandlers)m.ResizeHandlers.hasOwnProperty(a)&&m.ResizeHandlers[a].callback.call(window,m.windowWidth,m.windowHeight)}function g(){if(m.support.raf){m.window.requestAnimationFrame(g);for(var a in m.RAFHandlers)m.RAFHandlers.hasOwnProperty(a)&&m.RAFHandlers[a].callback.call(window)}}function h(a,b){return parseInt(a.priority)-parseInt(b.priority)}var i="undefined"!=typeof window?window:this,j=i.document,k=function(){this.Version="1.2.1",this.Plugins={},this.DontConflict=!1,this.Conflicts={fn:{}},this.ResizeHandlers=[],this.RAFHandlers=[],this.window=i,this.$window=a(i),this.document=j,this.$document=a(j),this.$body=null,this.windowWidth=0,this.windowHeight=0,this.fallbackWidth=1024,this.fallbackHeight=768,this.userAgent=window.navigator.userAgent||window.navigator.vendor||window.opera,this.isFirefox=/Firefox/i.test(this.userAgent),this.isChrome=/Chrome/i.test(this.userAgent),this.isSafari=/Safari/i.test(this.userAgent)&&!this.isChrome,this.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(this.userAgent),this.isIEMobile=/IEMobile/i.test(this.userAgent),this.isFirefoxMobile=this.isFirefox&&this.isMobile,this.transform=null,this.transition=null,this.support={file:!!(window.File&&window.FileList&&window.FileReader),history:!!(window.history&&window.history.pushState&&window.history.replaceState),matchMedia:!(!window.matchMedia&&!window.msMatchMedia),pointer:!!window.PointerEvent,raf:!(!window.requestAnimationFrame||!window.cancelAnimationFrame),touch:!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),transition:!1,transform:!1}},l={killEvent:function(a,b){try{a.preventDefault(),a.stopPropagation(),b&&a.stopImmediatePropagation()}catch(c){}},startTimer:function(a,b,c,d){return l.clearTimer(a),d?setInterval(c,b):setTimeout(c,b)},clearTimer:function(a,b){a&&(b?clearInterval(a):clearTimeout(a),a=null)},sortAsc:function(a,b){return parseInt(a,10)-parseInt(b,10)},sortDesc:function(a,b){return parseInt(b,10)-parseInt(a,10)},decodeEntities:function(a){var b=m.document.createElement("textarea");return b.innerHTML=a,b.value},parseQueryString:function(a){for(var b={},c=a.slice(a.indexOf("?")+1).split("&"),d=0;d<c.length;d++){var e=c[d].split("=");b[e[0]]=e[1]}return b}},m=new k,n=a.Deferred(),o={base:"{ns}",element:"{ns}-element"},p={namespace:".{ns}",beforeUnload:"beforeunload.{ns}",blur:"blur.{ns}",change:"change.{ns}",click:"click.{ns}",dblClick:"dblclick.{ns}",drag:"drag.{ns}",dragEnd:"dragend.{ns}",dragEnter:"dragenter.{ns}",dragLeave:"dragleave.{ns}",dragOver:"dragover.{ns}",dragStart:"dragstart.{ns}",drop:"drop.{ns}",error:"error.{ns}",focus:"focus.{ns}",focusIn:"focusin.{ns}",focusOut:"focusout.{ns}",input:"input.{ns}",keyDown:"keydown.{ns}",keyPress:"keypress.{ns}",keyUp:"keyup.{ns}",load:"load.{ns}",mouseDown:"mousedown.{ns}",mouseEnter:"mouseenter.{ns}",mouseLeave:"mouseleave.{ns}",mouseMove:"mousemove.{ns}",mouseOut:"mouseout.{ns}",mouseOver:"mouseover.{ns}",mouseUp:"mouseup.{ns}",panStart:"panstart.{ns}",pan:"pan.{ns}",panEnd:"panend.{ns}",resize:"resize.{ns}",scaleStart:"scalestart.{ns}",scaleEnd:"scaleend.{ns}",scale:"scale.{ns}",scroll:"scroll.{ns}",select:"select.{ns}",swipe:"swipe.{ns}",touchCancel:"touchcancel.{ns}",touchEnd:"touchend.{ns}",touchLeave:"touchleave.{ns}",touchMove:"touchmove.{ns}",touchStart:"touchstart.{ns}"};k.prototype.NoConflict=function(){m.DontConflict=!0;for(var b in m.Plugins)m.Plugins.hasOwnProperty(b)&&(a[b]=m.Conflicts[b],a.fn[b]=m.Conflicts.fn[b])},k.prototype.Plugin=function(d,e){return m.Plugins[d]=function(b,d){function e(c){var e,f,h,i="object"===a.type(c),j=this,k=a();for(c=a.extend(!0,{},d.defaults||{},i?c:{}),f=0,h=j.length;h>f;f++)if(e=j.eq(f),!g(e)){var l="__"+d.guid++,m=d.classes.raw.base+l,n=e.data(b+"-options"),o=a.extend(!0,{$el:e,guid:l,rawGuid:m,dotGuid:"."+m},c,"object"===a.type(n)?n:{});e.addClass(d.classes.raw.element).data(r,o),d.methods._construct.apply(e,[o].concat(Array.prototype.slice.call(arguments,i?1:0))),k=k.add(e)}for(f=0,h=k.length;h>f;f++)e=k.eq(f),d.methods._postConstruct.apply(e,[g(e)]);return j}function f(a){d.functions.iterate.apply(this,[d.methods._destruct].concat(Array.prototype.slice.call(arguments,1))),this.removeClass(d.classes.raw.element).removeData(r)}function g(a){return a.data(r)}function i(b){if(this instanceof a){var c=d.methods[b];return"object"!==a.type(b)&&b?c&&0!==b.indexOf("_")?d.functions.iterate.apply(this,[c].concat(Array.prototype.slice.call(arguments,1))):this:e.apply(this,arguments)}}function j(b){var c=d.utilities[b]||d.utilities._initialize||!1;return c?c.apply(window,Array.prototype.slice.call(arguments,"object"===a.type(b)?0:1)):void 0}function k(b){d.defaults=a.extend(!0,d.defaults,b||{})}function n(b){for(var c=this,d=0,e=c.length;e>d;d++){var f=c.eq(d),h=g(f)||{};"undefined"!==a.type(h.$el)&&b.apply(f,[h].concat(Array.prototype.slice.call(arguments,1)))}return c}var q="fs-"+b,r="fs"+b.replace(/(^|\s)([a-z])/g,function(a,b,c){return b+c.toUpperCase()});return d.initialized=!1,d.priority=d.priority||10,d.classes=c("classes",q,o,d.classes),d.events=c("events",b,p,d.events),d.functions=a.extend({getData:g,iterate:n},l,d.functions),d.methods=a.extend(!0,{_setup:a.noop,_construct:a.noop,_postConstruct:a.noop,_destruct:a.noop,_resize:!1,destroy:f},d.methods),d.utilities=a.extend(!0,{_initialize:!1,_delegate:!1,defaults:k},d.utilities),d.widget&&(m.Conflicts.fn[b]=a.fn[b],a.fn[r]=i,m.DontConflict||(a.fn[b]=a.fn[r])),m.Conflicts[b]=a[b],a[r]=d.utilities._delegate||j,m.DontConflict||(a[b]=a[r]),d.namespace=b,d.namespaceClean=r,d.guid=0,d.methods._resize&&(m.ResizeHandlers.push({namespace:b,priority:d.priority,callback:d.methods._resize}),m.ResizeHandlers.sort(h)),d.methods._raf&&(m.RAFHandlers.push({namespace:b,priority:d.priority,callback:d.methods._raf}),m.RAFHandlers.sort(h)),d}(d,e),n.then(function(){b(d)}),m.Plugins[d]};var q=null,r=20;return m.$window.on("resize.fs",e),e(),g(),a(function(){m.$body=a("body"),n.resolve(),m.support.nativeMatchMedia=m.support.matchMedia&&!a("html").hasClass("no-matchmedia")}),p.clickTouchStart=p.click+" "+p.touchStart,d(),window.Formstone=m,m});

/*! formstone v1.2.1 [lightbox.js] 2016-08-02 | GPL-3.0 License | formstone.it */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./touch","./transition"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(){da=b.$body,ea=a("html, body"),fa=b.window.location.hash.replace("#","")}function d(){ha&&i()}function e(a){this.on(_.click,a,h);var b=this.data(X+"-gallery");!ga&&fa&&b===fa&&(ga=!0,this.trigger(_.click))}function f(a){j(),this.off(_.namespace)}function g(b,c){b instanceof a&&h.apply(ba,[{data:a.extend(!0,{},{$object:b},Y,c||{})}])}function h(c){if(!ha){var d=c.data;ha=a.extend({},{visible:!1,gallery:{active:!1},isMobile:b.isMobile||d.mobile,isTouch:b.support.touch,isAnimating:!0,oldContentHeight:0,oldContentWidth:0,metaHeight:0,thumbnailHeight:0,captionOpen:!1,thumbnailsOpen:!1},d);var e=d.$el,f=d.$object,g=e&&e[0].href?e[0].href||"":"",h=e&&e[0].hash?e[0].hash||"":"",i=(g.toLowerCase().split(".").pop().split(/\#|\?/),e?e.data(X+"-type"):""),k="image"===i||g.match(d.fileTypes)||"data:image"===g.substr(0,10),l=U(g),n="url"===i||!k&&!l&&"http"===g.substr(0,4)&&!h,p="element"===i||!k&&!l&&!n&&"#"===h.substr(0,1),q="undefined"!=typeof f;if(p&&(g=h),!(k||l||n||p||q))return void(ha=null);if(aa.killEvent(c),ha.touch=d.touch&&ha.isMobile&&ha.isTouch,ha.margin*=2,k?ha.type="image":l?ha.type="video":ha.type="element",k||l){var s=e.data(X+"-gallery");s&&(ha.gallery.active=!0,ha.gallery.id=s,ha.gallery.$items=a("a[data-lightbox-gallery= "+ha.gallery.id+"], a[rel= "+ha.gallery.id+"]"),ha.gallery.index=ha.gallery.$items.index(ha.$el),ha.gallery.total=ha.gallery.$items.length-1)}ha.thumbnails&&(k||l)&&ha.gallery.active||(ha.thumbnails=!1);var u="";ha.isMobile||(u+='<div class="'+[$.overlay,ha.theme,ha.customClass].join(" ")+'"></div>');var v=[$.base,$.loading,$.animating,ha.theme,ha.customClass];if(ha.fixed&&v.push($.fixed),ha.isMobile&&v.push($.mobile),ha.isTouch&&v.push($.touch),n&&v.push($.iframed),(p||q)&&v.push($.inline),ha.thumbnails&&v.push($.thumbnailed),u+='<div class="'+v.join(" ")+'" role="dialog" aria-label="lightbox" tabindex="-1">',u+='<button type="button" class="'+$.close+'">'+ha.labels.close+"</button>",u+='<span class="'+$.loading_icon+'"></span>',u+='<div class="'+$.container+'">',ha.gallery.active&&ha.thumbnails){u+='<div class="'+[$.thumbnails]+'">',u+='<div class="'+[$.thumbnail_container]+'">';for(var w,x,y=0,z=ha.gallery.$items.length;z>y;y++)w=ha.gallery.$items.eq(y),x=w.data("lightbox-thumbnail"),x||(x=w.find("img").attr("src")),u+='<button class="'+[$.thumbnail_item]+'">',u+='<img src="'+x+'" alt="">',u+="</button>";u+="</div></div>"}u+='<div class="'+$.content+'"></div>',(k||l)&&(u+='<div class="'+$.tools+'">',u+='<div class="'+$.controls+'">',ha.gallery.active&&(u+='<button type="button" class="'+[$.control,$.control_previous].join(" ")+'">'+ha.labels.previous+"</button>",u+='<button type="button" class="'+[$.control,$.control_next].join(" ")+'">'+ha.labels.next+"</button>"),ha.isMobile&&ha.isTouch&&(u+='<button type="button" class="'+[$.toggle,$.caption_toggle].join(" ")+'">'+ha.labels.captionClosed+"</button>",ha.gallery.active&&ha.thumbnails&&(u+='<button type="button" class="'+[$.toggle,$.thumbnail_toggle].join(" ")+'">'+ha.labels.thumbnailsClosed+"</button>")),u+="</div>",u+='<div class="'+$.meta+'">',u+='<div class="'+$.meta_content+'">',ha.gallery.active&&(u+='<p class="'+$.position+'"',ha.gallery.total<1&&(u+=' style="display: none;"'),u+=">",u+='<span class="'+$.position_current+'">'+(ha.gallery.index+1)+"</span> ",u+=ha.labels.count,u+=' <span class="'+$.position_total+'">'+(ha.gallery.total+1)+"</span>",u+="</p>"),u+='<div class="'+$.caption+'">',u+=ha.formatter.call(e,d),u+="</div></div></div>",u+="</div>"),u+="</div></div>",da.append(u),ha.$overlay=a(Z.overlay),ha.$lightbox=a(Z.base),ha.$close=a(Z.close),ha.$container=a(Z.container),ha.$content=a(Z.content),ha.$tools=a(Z.tools),ha.$meta=a(Z.meta),ha.$metaContent=a(Z.meta_content),ha.$position=a(Z.position),ha.$caption=a(Z.caption),ha.$controlBox=a(Z.controls),ha.$controls=a(Z.control),ha.$thumbnails=a(Z.thumbnails),ha.$thumbnailContainer=a(Z.thumbnail_container),ha.$thumbnailItems=a(Z.thumbnail_item),ha.isMobile?(ha.paddingVertical=ha.$close.outerHeight(),ha.paddingHorizontal=0,ha.mobilePaddingVertical=parseInt(ha.$content.css("paddingTop"),10)+parseInt(ha.$content.css("paddingBottom"),10),ha.mobilePaddingHorizontal=parseInt(ha.$content.css("paddingLeft"),10)+parseInt(ha.$content.css("paddingRight"),10)):(ha.paddingVertical=parseInt(ha.$lightbox.css("paddingTop"),10)+parseInt(ha.$lightbox.css("paddingBottom"),10),ha.paddingHorizontal=parseInt(ha.$lightbox.css("paddingLeft"),10)+parseInt(ha.$lightbox.css("paddingRight"),10),ha.mobilePaddingVertical=0,ha.mobilePaddingHorizontal=0),ha.contentHeight=ha.$lightbox.outerHeight()-ha.paddingVertical,ha.contentWidth=ha.$lightbox.outerWidth()-ha.paddingHorizontal,ha.controlHeight=ha.$controls.outerHeight(),m(),ha.gallery.active&&(ha.$lightbox.addClass($.has_controls),L()),ca.on(_.keyDown,M),da.on(_.click,[Z.overlay,Z.close].join(", "),j).on([_.focus,_.focusIn].join(" "),V),ha.gallery.active&&ha.$lightbox.on(_.click,Z.control,G),ha.thumbnails&&ha.$lightbox.on(_.click,Z.thumbnail_item,H),ha.isMobile&&ha.isTouch&&ha.$lightbox.on(_.click,Z.caption_toggle,o).on(_.click,Z.thumbnail_toggle,r),ha.$lightbox.fsTransition({property:"opacity"},function(){k?t(g):l?D(g):n?P(g):p?N(g):q&&Q(ha.$object)}).addClass($.open),ha.$overlay.addClass($.open)}}function i(a){"object"!=typeof a&&(ha.targetHeight=arguments[0],ha.targetWidth=arguments[1]),"element"===ha.type?R(ha.$content.find("> :first-child")):"image"===ha.type?z():"video"===ha.type&&E(),l()}function j(a){aa.killEvent(a),ha&&(ha.$lightbox.fsTransition("destroy"),ha.$content.fsTransition("destroy"),u(),ha.$lightbox.addClass($.animating).fsTransition({property:"opacity"},function(a){"undefined"!=typeof ha.$inlineTarget&&ha.$inlineTarget.length&&O(),ha.$lightbox.off(_.namespace),ha.$container.off(_.namespace),ca.off(_.keyDown),da.off(_.namespace),da.off(_.namespace),ha.$overlay.remove(),ha.$lightbox.remove(),ha.$el.focus(),ha=null,ca.trigger(_.close)}),ha.$lightbox.removeClass($.open),ha.$overlay.removeClass($.open),ha.isMobile&&ea.removeClass($.lock))}function k(){var a=n();ha.isMobile?0:ha.duration;ha.isMobile||ha.$controls.css({marginTop:(ha.contentHeight-ha.controlHeight-ha.metaHeight+ha.thumbnailHeight)/2}),""===ha.$caption.html()?(ha.$caption.hide(),ha.$lightbox.removeClass($.has_caption),ha.gallery.active||ha.$tools.hide()):(ha.$caption.show(),ha.$lightbox.addClass($.has_caption)),ha.$lightbox.fsTransition({property:ha.contentHeight!==ha.oldContentHeight?"height":"width"},function(){ha.$content.fsTransition({property:"opacity"},function(){ha.$lightbox.removeClass($.animating),ha.isAnimating=!1}),ha.$lightbox.removeClass($.loading).addClass($.ready),ha.visible=!0,ca.trigger(_.open),ha.gallery.active&&(F(),I(),J()),ha.$lightbox.focus()}),ha.isMobile||ha.$lightbox.css({height:ha.contentHeight+ha.paddingVertical,width:ha.contentWidth+ha.paddingHorizontal,top:ha.fixed?0:a.top});var b=ha.oldContentHeight!==ha.contentHeight||ha.oldContentWidth!==ha.contentWidth;!ha.isMobile&&b||ha.$lightbox.fsTransition("resolve"),ha.oldContentHeight=ha.contentHeight,ha.oldContentWidth=ha.contentWidth,ha.isMobile&&ea.addClass($.lock)}function l(){if(ha.visible&&!ha.isMobile){var a=n();ha.$controls.css({marginTop:(ha.contentHeight-ha.controlHeight-ha.metaHeight+ha.thumbnailHeight)/2}),ha.$lightbox.css({height:ha.contentHeight+ha.paddingVertical,width:ha.contentWidth+ha.paddingHorizontal,top:ha.fixed?0:a.top}),ha.oldContentHeight=ha.contentHeight,ha.oldContentWidth=ha.contentWidth}}function m(){var a=n();ha.$lightbox.css({top:ha.fixed?0:a.top})}function n(){if(ha.isMobile)return{left:0,top:0};var a={left:(b.windowWidth-ha.contentWidth-ha.paddingHorizontal)/2,top:ha.top<=0?(b.windowHeight-ha.contentHeight-ha.paddingVertical)/2:ha.top};return ha.fixed!==!0&&(a.top+=ca.scrollTop()),a}function o(a){if(aa.killEvent(a),ha.captionOpen)p();else{s();var b=parseInt(ha.$metaContent.outerHeight(!0));b+=parseInt(ha.$meta.css("padding-top")),b+=parseInt(ha.$meta.css("padding-bottom")),ha.$meta.css({height:b}),ha.$lightbox.addClass($.caption_open).find(Z.caption_toggle).text(ha.labels.captionOpen),ha.captionOpen=!0}}function p(){ha.$lightbox.removeClass($.caption_open).find(Z.caption_toggle).text(ha.labels.captionClosed),ha.captionOpen=!1}function q(){var a=this.attr("title"),b=void 0!==a&&a?a.replace(/^\s+|\s+$/g,""):!1;return b?'<p class="caption">'+b+"</p>":""}function r(a){aa.killEvent(a),ha.thumbnailsOpen?s():(p(),ha.$lightbox.addClass($.thumbnails_open).find(Z.thumbnail_toggle).text(ha.labels.thumbnailsOpen),ha.thumbnailsOpen=!0)}function s(){ha.$lightbox.removeClass($.thumbnails_open).find(Z.thumbnail_toggle).text(ha.labels.thumbnailsClosed),ha.thumbnailsOpen=!1}function t(b){ha.hasScaled=!1,ha.$imageContainer=a('<div class="'+$.image_container+'"><img></div>'),ha.$image=ha.$imageContainer.find("img"),ha.$image.one(_.load,function(){var a=T(ha.$image);ha.naturalHeight=a.naturalHeight,ha.naturalWidth=a.naturalWidth,ha.retina&&(ha.naturalHeight/=2,ha.naturalWidth/=2),ha.$content.prepend(ha.$imageContainer),z(),k(),ha.touch&&(v(),x({scale:1,deltaX:0,deltaY:0}),y(),ha.$content.fsTouch({pan:!0,scale:!0}).on(_.scaleStart,w).on(_.scaleEnd,y).on(_.scale,x))}).error(S).attr("src",b).addClass($.image),(ha.$image[0].complete||4===ha.$image[0].readyState)&&ha.$image.trigger(_.load)}function u(){ha.$image&&ha.$image.length&&ha.$content.fsTouch("destroy")}function v(){ha.scalePosition=ha.$imageContainer.position(),ha.scaleY=ha.scalePosition.top,ha.scaleX=ha.scalePosition.left,ha.scaleHeight=ha.$image.outerHeight(),ha.scaleWidth=ha.$image.outerWidth()}function w(a){v(),ha.$lightbox.addClass($.scaling)}function x(a){ha.targetContainerY=ha.scaleY+a.deltaY,ha.targetContainerX=ha.scaleX+a.deltaX,ha.targetImageHeight=ha.scaleHeight*a.scale,ha.targetImageWidth=ha.scaleWidth*a.scale,ha.targetImageHeight<ha.scaleMinHeight&&(ha.targetImageHeight=ha.scaleMinHeight),ha.targetImageHeight>ha.scaleMaxHeight&&(ha.targetImageHeight=ha.scaleMaxHeight),ha.targetImageWidth<ha.scaleMinWidth&&(ha.targetImageWidth=ha.scaleMinWidth),ha.targetImageWidth>ha.scaleMaxWidth&&(ha.targetImageWidth=ha.scaleMaxWidth),ha.hasScaled=!0,ha.isScaling=!0,ha.$imageContainer.css({top:ha.targetContainerY,left:ha.targetContainerX}),ha.$image.css({height:ha.targetImageHeight,width:ha.targetImageWidth,top:-(ha.targetImageHeight/2),left:-(ha.targetImageWidth/2)})}function y(a){v(),ha.isScaling=!1;var b=ha.$container.outerHeight()-ha.metaHeight,c=ha.$container.outerWidth();ha.scaleMinY=b-ha.scaleHeight/2,ha.scaleMinX=c-ha.scaleWidth/2,ha.scaleMaxY=ha.scaleHeight/2,ha.scaleMaxX=ha.scaleWidth/2,ha.scaleHeight<b?ha.scalePosition.top=b/2:(ha.scalePosition.top<ha.scaleMinY&&(ha.scalePosition.top=ha.scaleMinY),ha.scalePosition.top>ha.scaleMaxY&&(ha.scalePosition.top=ha.scaleMaxY)),ha.scaleWidth<c?ha.scalePosition.left=c/2:(ha.scalePosition.left<ha.scaleMinX&&(ha.scalePosition.left=ha.scaleMinX),ha.scalePosition.left>ha.scaleMaxX&&(ha.scalePosition.left=ha.scaleMaxX)),ha.$lightbox.removeClass($.scaling),ha.$imageContainer.css({left:ha.scalePosition.left,top:ha.scalePosition.top})}function z(){if(ha.$image){var a=0;for(ha.windowHeight=ha.viewportHeight=b.windowHeight-ha.mobilePaddingVertical-ha.paddingVertical,ha.windowWidth=ha.viewportWidth=b.windowWidth-ha.mobilePaddingHorizontal-ha.paddingHorizontal,ha.contentHeight=1/0,ha.contentWidth=1/0,ha.imageMarginTop=0,ha.imageMarginLeft=0;ha.contentHeight>ha.viewportHeight&&2>a;)ha.imageHeight=0===a?ha.naturalHeight:ha.$image.outerHeight(),ha.imageWidth=0===a?ha.naturalWidth:ha.$image.outerWidth(),ha.metaHeight=0===a?0:ha.metaHeight,ha.spacerHeight=0===a?0:ha.spacerHeight,ha.thumbnailHeight=0===a?0:ha.thumbnailHeight,0===a&&(ha.ratioHorizontal=ha.imageHeight/ha.imageWidth,ha.ratioVertical=ha.imageWidth/ha.imageHeight,ha.isWide=ha.imageWidth>ha.imageHeight),ha.imageHeight<ha.minHeight&&(ha.minHeight=ha.imageHeight),ha.imageWidth<ha.minWidth&&(ha.minWidth=ha.imageWidth),ha.isMobile?(ha.isTouch?(ha.$controlBox.css({width:b.windowWidth}),ha.spacerHeight=ha.$controls.outerHeight(!0)):(ha.$tools.css({width:b.windowWidth}),ha.spacerHeight=ha.$tools.outerHeight(!0)),ha.spacerHeight+=ha.$thumbnails.outerHeight(!0)+10,ha.contentHeight=ha.viewportHeight,ha.contentWidth=ha.viewportWidth,A(),ha.imageMarginTop=(ha.contentHeight-ha.targetImageHeight-ha.spacerHeight)/2,ha.imageMarginLeft=(ha.contentWidth-ha.targetImageWidth)/2):(0===a&&(ha.viewportHeight-=ha.margin+ha.paddingVertical,ha.viewportWidth-=ha.margin+ha.paddingHorizontal),ha.viewportHeight-=ha.metaHeight,ha.thumbnails&&(ha.viewportHeight-=ha.thumbnailHeight),A(),ha.contentHeight=ha.targetImageHeight,ha.contentWidth=ha.targetImageWidth),ha.isMobile||ha.isTouch||ha.$meta.css({width:ha.contentWidth}),ha.hasScaled||(ha.$image.css({height:ha.targetImageHeight,width:ha.targetImageWidth}),ha.touch?ha.$image.css({top:-(ha.targetImageHeight/2),left:-(ha.targetImageWidth/2)}):ha.$image.css({marginTop:ha.imageMarginTop,marginLeft:ha.imageMarginLeft})),ha.isMobile||(ha.metaHeight=ha.$meta.outerHeight(!0),ha.contentHeight+=ha.metaHeight),ha.thumbnails&&(ha.thumbnailHeight=ha.$thumbnails.outerHeight(!0),ha.contentHeight+=ha.thumbnailHeight),a++;ha.touch&&(ha.scaleMinHeight=ha.targetImageHeight,ha.scaleMinWidth=ha.targetImageWidth,ha.scaleMaxHeight=ha.naturalHeight,ha.scaleMaxWidth=ha.naturalWidth)}}function A(){var a=ha.isMobile?ha.contentHeight-ha.spacerHeight:ha.viewportHeight,b=ha.isMobile?ha.contentWidth:ha.viewportWidth;ha.isWide?(ha.targetImageWidth=b,ha.targetImageHeight=ha.targetImageWidth*ha.ratioHorizontal,ha.targetImageHeight>a&&(ha.targetImageHeight=a,ha.targetImageWidth=ha.targetImageHeight*ha.ratioVertical)):(ha.targetImageHeight=a,ha.targetImageWidth=ha.targetImageHeight*ha.ratioVertical,ha.targetImageWidth>b&&(ha.targetImageWidth=b,ha.targetImageHeight=ha.targetImageWidth*ha.ratioHorizontal)),(ha.targetImageWidth>ha.imageWidth||ha.targetImageHeight>ha.imageHeight)&&(ha.targetImageHeight=ha.imageHeight,ha.targetImageWidth=ha.imageWidth),(ha.targetImageWidth<ha.minWidth||ha.targetImageHeight<ha.minHeight)&&(ha.targetImageWidth<ha.minWidth?(ha.targetImageWidth=ha.minWidth,ha.targetImageHeight=ha.targetImageWidth*ha.ratioHorizontal):(ha.targetImageHeight=ha.minHeight,ha.targetImageWidth=ha.targetImageHeight*ha.ratioVertical))}function B(a){return"//www.youtube.com/embed/"+a[1]}function C(a){return"//player.vimeo.com/video/"+a[3]}function D(b){var c=U(b),d=b.split("?");c?(d.length>=2&&(c+="?"+d.slice(1)[0].trim()),ha.$videoWrapper=a('<div class="'+$.video_wrapper+'"></div>'),ha.$video=a('<iframe class="'+$.video+'" frameborder="0" seamless="seamless" allowfullscreen></iframe>'),ha.$video.attr("src",c).addClass($.video).prependTo(ha.$videoWrapper),ha.$content.prepend(ha.$videoWrapper),E(),k()):S()}function E(){ha.windowHeight=ha.viewportHeight=b.windowHeight-ha.mobilePaddingVertical-ha.paddingVertical,ha.windowWidth=ha.viewportWidth=b.windowWidth-ha.mobilePaddingHorizontal-ha.paddingHorizontal,ha.videoMarginTop=0,ha.videoMarginLeft=0,ha.isMobile?(ha.isTouch?(ha.$controlBox.css({width:b.windowWidth}),ha.spacerHeight=ha.$controls.outerHeight(!0)+10):(ha.$tools.css({width:b.windowWidth}),ha.spacerHeight=ha.$tools.outerHeight(!0),ha.spacerHeight+=ha.$thumbnails.outerHeight(!0)+10),ha.viewportHeight-=ha.spacerHeight,ha.targetVideoWidth=ha.viewportWidth,ha.targetVideoHeight=ha.targetVideoWidth*ha.videoRatio,ha.targetVideoHeight>ha.viewportHeight&&(ha.targetVideoHeight=ha.viewportHeight,ha.targetVideoWidth=ha.targetVideoHeight/ha.videoRatio),ha.videoMarginTop=(ha.viewportHeight-ha.targetVideoHeight)/2,ha.videoMarginLeft=(ha.viewportWidth-ha.targetVideoWidth)/2):(ha.viewportHeight=ha.windowHeight-ha.margin,ha.viewportWidth=ha.windowWidth-ha.margin,ha.targetVideoWidth=ha.videoWidth>ha.viewportWidth?ha.viewportWidth:ha.videoWidth,ha.targetVideoWidth<ha.minWidth&&(ha.targetVideoWidth=ha.minWidth),ha.targetVideoHeight=ha.targetVideoWidth*ha.videoRatio,ha.contentHeight=ha.targetVideoHeight,ha.contentWidth=ha.targetVideoWidth),ha.isMobile||ha.isTouch||ha.$meta.css({width:ha.contentWidth}),ha.$videoWrapper.css({height:ha.targetVideoHeight,width:ha.targetVideoWidth,marginTop:ha.videoMarginTop,marginLeft:ha.videoMarginLeft}),ha.isMobile||(ha.metaHeight=ha.$meta.outerHeight(!0),ha.contentHeight+=ha.metaHeight),ha.thumbnails&&(ha.thumbnailHeight=ha.$thumbnails.outerHeight(!0),ha.contentHeight+=ha.thumbnailHeight)}function F(b){var c="";ha.gallery.index>0&&(c=ha.gallery.$items.eq(ha.gallery.index-1).attr("href"),U(c)||a('<img src="'+c+'">')),ha.gallery.index<ha.gallery.total&&(c=ha.gallery.$items.eq(ha.gallery.index+1).attr("href"),U(c)||a('<img src="'+c+'">'))}function G(b){aa.killEvent(b);var c=a(b.currentTarget);ha.isAnimating||c.hasClass($.control_disabled)||(ha.isAnimating=!0,u(),p(),ha.gallery.index+=c.hasClass($.control_next)?1:-1,ha.gallery.index>ha.gallery.total&&(ha.gallery.index=ha.infinite?0:ha.gallery.total),ha.gallery.index<0&&(ha.gallery.index=ha.infinite?ha.gallery.total:0),I(),ha.$lightbox.addClass($.animating),ha.$content.fsTransition({property:"opacity"},K),ha.$lightbox.addClass($.loading))}function H(b){aa.killEvent(b);var c=a(b.currentTarget);ha.isAnimating||c.hasClass($.active)||(ha.isAnimating=!0,u(),p(),ha.gallery.index=ha.$thumbnailItems.index(c),I(),ha.$lightbox.addClass($.animating),ha.$content.fsTransition({property:"opacity"},K),ha.$lightbox.addClass($.loading))}function I(){if(ha.thumbnails){var a=ha.$thumbnailItems.eq(ha.gallery.index);ha.$thumbnailItems.removeClass($.active),a.addClass($.active)}}function J(){if(ha.thumbnails){var a=ha.$thumbnailItems.eq(ha.gallery.index),b=a.position().left+a.outerWidth(!1)/2-ha.$thumbnailContainer.outerWidth(!0)/2;ha.$thumbnailContainer.stop().animate({scrollLeft:b},200,"linear")}}function K(){"undefined"!=typeof ha.$imageContainer&&ha.$imageContainer.remove(),"undefined"!=typeof ha.$videoWrapper&&ha.$videoWrapper.remove(),ha.$el=ha.gallery.$items.eq(ha.gallery.index),ha.$caption.html(ha.formatter.call(ha.$el,ha)),ha.$position.find(Z.position_current).html(ha.gallery.index+1);var a=ha.$el.attr("href"),b=U(a);b?(ha.type="video",D(a)):(ha.type="image",t(a)),L()}function L(){ha.$controls.removeClass($.control_disabled),ha.infinite||(0===ha.gallery.index&&ha.$controls.filter(Z.control_previous).addClass($.control_disabled),ha.gallery.index===ha.gallery.total&&ha.$controls.filter(Z.control_next).addClass($.control_disabled))}function M(a){!ha.gallery.active||37!==a.keyCode&&39!==a.keyCode?27===a.keyCode&&ha.$close.trigger(_.click):(aa.killEvent(a),ha.$controls.filter(37===a.keyCode?Z.control_previous:Z.control_next).trigger(_.click))}function N(b){ha.$inlineTarget=a(b),ha.$inlineContents=ha.$inlineTarget.children().detach(),Q(ha.$inlineContents)}function O(){ha.$inlineTarget.append(ha.$inlineContents.detach())}function P(b){b+=b.indexOf("?")>-1?"&"+ha.requestKey+"=true":"?"+ha.requestKey+"=true";var c=a('<iframe class="'+$.iframe+'" src="'+b+'"></iframe>');Q(c)}function Q(a){ha.$content.append(a),R(a),k()}function R(a){ha.windowHeight=b.windowHeight-ha.mobilePaddingVertical-ha.paddingVertical,ha.windowWidth=b.windowWidth-ha.mobilePaddingHorizontal-ha.paddingHorizontal,ha.objectHeight=a.outerHeight(!0),ha.objectWidth=a.outerWidth(!0),ha.targetHeight=ha.targetHeight||(ha.$el?ha.$el.data(X+"-height"):null),ha.targetWidth=ha.targetWidth||(ha.$el?ha.$el.data(X+"-width"):null),ha.maxHeight=ha.windowHeight<0?ha.minHeight:ha.windowHeight,ha.isIframe=a.is("iframe"),ha.objectMarginTop=0,ha.objectMarginLeft=0,ha.isMobile||(ha.windowHeight-=ha.margin,ha.windowWidth-=ha.margin),ha.contentHeight=ha.targetHeight?ha.targetHeight:ha.isIframe||ha.isMobile?ha.windowHeight:ha.objectHeight,ha.contentWidth=ha.targetWidth?ha.targetWidth:ha.isIframe||ha.isMobile?ha.windowWidth:ha.objectWidth,(ha.isIframe||ha.isObject)&&ha.isMobile?(ha.contentHeight=ha.windowHeight,ha.contentWidth=ha.windowWidth):ha.isObject&&(ha.contentHeight=ha.contentHeight>ha.windowHeight?ha.windowHeight:ha.contentHeight,ha.contentWidth=ha.contentWidth>ha.windowWidth?ha.windowWidth:ha.contentWidth),ha.isMobile||(ha.contentHeight>ha.maxHeight&&(ha.contentHeight=ha.maxHeight),ha.contentWidth>ha.maxWidth&&(ha.contentWidth=ha.maxWidth))}function S(){var b=a('<div class="'+$.error+'"><p>Error Loading Resource</p></div>');ha.type="element",ha.$tools.remove(),ha.$image.off(_.namespace),Q(b)}function T(a){var b=a[0],c=new Image;return"undefined"!=typeof b.naturalHeight?{naturalHeight:b.naturalHeight,naturalWidth:b.naturalWidth}:"img"===b.tagName.toLowerCase()?(c.src=b.src,{naturalHeight:c.height,naturalWidth:c.width}):!1}function U(a){var b,c=ha.videoFormatter;for(var d in c)if(c.hasOwnProperty(d)&&(b=a.match(c[d].pattern),null!==b))return c[d].format.call(ha,b);return!1}function V(b){var c=b.target;a.contains(ha.$lightbox[0],c)||c===ha.$lightbox[0]||c===ha.$overlay[0]||(aa.killEvent(b),ha.$lightbox.focus())}var W=b.Plugin("lightbox",{widget:!0,defaults:{customClass:"",fileTypes:/\.(jpg|sjpg|jpeg|png|gif)$/i,fixed:!1,formatter:q,infinite:!1,labels:{close:"Close",count:"of",next:"Next",previous:"Previous",captionClosed:"View Caption",captionOpen:"Close Caption",thumbnailsClosed:"View Thumbnails",thumbnailsOpen:"Close Thumbnails"},margin:50,maxHeight:1e4,maxWidth:1e4,minHeight:100,minWidth:100,mobile:!1,retina:!1,requestKey:"fs-lightbox",theme:"fs-light",thumbnails:!1,top:0,touch:!0,videoFormatter:{youtube:{pattern:/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,format:B},vimeo:{pattern:/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,format:C}},videoRatio:.5625,videoWidth:800},classes:["loading","animating","scaling","fixed","mobile","touch","inline","iframed","open","ready","overlay","close","loading_icon","container","content","image","image_container","video","video_wrapper","tools","meta","meta_content","controls","control","control_previous","control_next","control_disabled","position","position_current","position_total","toggle","caption_toggle","caption","caption_open","thumbnailed","thumbnails_open","thumbnail_toggle","thumbnails","thumbnail_container","thumbnail_item","active","has_controls","has_caption","iframe","error","active","lock"],events:{open:"open",close:"close"},methods:{_setup:c,_construct:e,_destruct:f,_resize:d,resize:i},utilities:{_initialize:g,close:j}}),X=W.namespace,Y=W.defaults,Z=W.classes,$=Z.raw,_=W.events,aa=W.functions,ba=b.window,ca=b.$window,da=null,ea=null,fa=!1,ga=!1,ha=null});

/*! formstone v1.2.1 [touch.js] 2016-08-02 | GPL-3.0 License | formstone.it */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(a){if(a.touches=[],a.touching=!1,this.on(q.dragStart,r.killEvent),a.swipe&&(a.pan=!0),a.scale&&(a.axis=!1),a.axisX="x"===a.axis,a.axisY="y"===a.axis,b.support.pointer){var c="";!a.axis||a.axisX&&a.axisY?c="none":(a.axisX&&(c+=" pan-y"),a.axisY&&(c+=" pan-x")),n(this,c),this.on(q.pointerDown,a,e)}else this.on(q.touchStart,a,e).on(q.mouseDown,a,f)}function d(a){this.off(q.namespace),n(this,"")}function e(a){a.preventManipulation&&a.preventManipulation();var b=a.data,c=a.originalEvent;if(c.type.match(/(up|end|cancel)$/i))return void j(a);if(c.pointerId){var d=!1;for(var e in b.touches)b.touches[e].id===c.pointerId&&(d=!0,b.touches[e].pageX=c.pageX,b.touches[e].pageY=c.pageY);d||b.touches.push({id:c.pointerId,pageX:c.pageX,pageY:c.pageY})}else b.touches=c.touches;c.type.match(/(down|start)$/i)?f(a):c.type.match(/move$/i)&&g(a)}function f(c){var d=c.data,f="undefined"!==a.type(d.touches)?d.touches[0]:null;d.touching||(d.startE=c.originalEvent,d.startX=f?f.pageX:c.pageX,d.startY=f?f.pageY:c.pageY,d.startT=(new Date).getTime(),d.scaleD=1,d.passed=!1),d.$links&&d.$links.off(q.click);var h=k(d.scale?q.scaleStart:q.panStart,c,d.startX,d.startY,d.scaleD,0,0,"","");if(d.scale&&d.touches&&d.touches.length>=2){var i=d.touches;d.pinch={startX:l(i[0].pageX,i[1].pageX),startY:l(i[0].pageY,i[1].pageY),startD:m(i[1].pageX-i[0].pageX,i[1].pageY-i[0].pageY)},h.pageX=d.startX=d.pinch.startX,h.pageY=d.startY=d.pinch.startY}d.touching||(d.touching=!0,d.pan&&s.on(q.mouseMove,d,g).on(q.mouseUp,d,j),b.support.pointer?s.on([q.pointerMove,q.pointerUp,q.pointerCancel].join(" "),d,e):s.on([q.touchMove,q.touchEnd,q.touchCancel].join(" "),d,e),d.$el.trigger(h))}function g(b){var c=b.data,d="undefined"!==a.type(c.touches)?c.touches[0]:null,e=d?d.pageX:b.pageX,f=d?d.pageY:b.pageY,g=e-c.startX,h=f-c.startY,i=g>0?"right":"left",n=h>0?"down":"up",o=Math.abs(g)>t,p=Math.abs(h)>t;if(!c.passed&&c.axis&&(c.axisX&&p||c.axisY&&o))j(b);else{!c.passed&&(!c.axis||c.axis&&c.axisX&&o||c.axisY&&p)&&(c.passed=!0),c.passed&&(r.killEvent(b),r.killEvent(c.startE));var s=!0,u=k(c.scale?q.scale:q.pan,b,e,f,c.scaleD,g,h,i,n);if(c.scale)if(c.touches&&c.touches.length>=2){var v=c.touches;c.pinch.endX=l(v[0].pageX,v[1].pageX),c.pinch.endY=l(v[0].pageY,v[1].pageY),c.pinch.endD=m(v[1].pageX-v[0].pageX,v[1].pageY-v[0].pageY),c.scaleD=c.pinch.endD/c.pinch.startD,u.pageX=c.pinch.endX,u.pageY=c.pinch.endY,u.scale=c.scaleD,u.deltaX=c.pinch.endX-c.pinch.startX,u.deltaY=c.pinch.endY-c.pinch.startY}else c.pan||(s=!1);s&&c.$el.trigger(u)}}function h(b,c){b.on(q.click,c,i);var d=a._data(b[0],"events").click;d.unshift(d.pop())}function i(a){r.killEvent(a,!0),a.data.$links.off(q.click)}function j(b){var c=b.data,d="undefined"!==a.type(c.touches)?c.touches[0]:null,e=d?d.pageX:b.pageX,f=d?d.pageY:b.pageY,g=e-c.startX,i=f-c.startY,j=(new Date).getTime(),l=c.scale?q.scaleEnd:q.panEnd,m=g>0?"right":"left",n=i>0?"down":"up",o=Math.abs(g)>1,p=Math.abs(i)>1;if(c.swipe&&Math.abs(g)>t&&j-c.startT<u&&(l=q.swipe),c.axis&&(c.axisX&&p||c.axisY&&o)||o||p){c.$links=c.$el.find("a");for(var r=0,v=c.$links.length;v>r;r++)h(c.$links.eq(r),c)}var w=k(l,b,e,f,c.scaleD,g,i,m,n);s.off([q.touchMove,q.touchEnd,q.touchCancel,q.mouseMove,q.mouseUp,q.pointerMove,q.pointerUp,q.pointerCancel].join(" ")),c.$el.trigger(w),c.touches=[],c.scale,c.touching=!1}function k(b,c,d,e,f,g,h,i,j){return a.Event(b,{originalEvent:c,bubbles:!0,pageX:d,pageY:e,scale:f,deltaX:g,deltaY:h,directionX:i,directionY:j})}function l(a,b){return(a+b)/2}function m(a,b){return Math.sqrt(a*a+b*b)}function n(a,b){a.css({"-ms-touch-action":b,"touch-action":b})}var o=!b.window.PointerEvent,p=b.Plugin("touch",{widget:!0,defaults:{axis:!1,pan:!1,scale:!1,swipe:!1},methods:{_construct:c,_destruct:d},events:{pointerDown:o?"MSPointerDown":"pointerdown",pointerUp:o?"MSPointerUp":"pointerup",pointerMove:o?"MSPointerMove":"pointermove",pointerCancel:o?"MSPointerCancel":"pointercancel"}}),q=p.events,r=p.functions,s=b.$window,t=10,u=50;q.pan="pan",q.panStart="panstart",q.panEnd="panend",q.scale="scale",q.scaleStart="scalestart",q.scaleEnd="scaleend",q.swipe="swipe"});

/*! formstone v1.2.1 [transition.js] 2016-08-02 | GPL-3.0 License | formstone.it */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core"],a):a(jQuery,Formstone)}(function(a,b){"use strict";function c(a,c){if(c){a.$target=this.find(a.target),a.$check=a.target?a.$target:this,a.callback=c,a.styles=h(a.$check),a.timer=null;var d=a.$check.css(b.transition+"-duration"),f=parseFloat(d);b.support.transition&&d&&f?this.on(k.transitionEnd,a,e):a.timer=l.startTimer(a.timer,50,function(){g(a)},!0)}}function d(a){l.clearTimer(a.timer,!0),this.off(k.namespace)}function e(b){b.stopPropagation(),b.preventDefault();var c=b.data,d=b.originalEvent,e=c.target?c.$target:c.$el;c.property&&d.propertyName!==c.property||!a(d.target).is(e)||f(c)}function f(a){a.always||a.$el[j.namespaceClean]("destroy"),a.callback.apply(a.$el)}function g(a){var b=h(a.$check);i(a.styles,b)||f(a),a.styles=b}function h(b){var c,d,e,f={};if(b instanceof a&&(b=b[0]),m.getComputedStyle){c=m.getComputedStyle(b,null);for(var g=0,h=c.length;h>g;g++)d=c[g],e=c.getPropertyValue(d),f[d]=e}else if(b.currentStyle){c=b.currentStyle;for(d in c)c[d]&&(f[d]=c[d])}return f}function i(b,c){if(a.type(b)!==a.type(c))return!1;for(var d in b){if(!b.hasOwnProperty(d))return!1;if(!b.hasOwnProperty(d)||!c.hasOwnProperty(d)||b[d]!==c[d])return!1}return!0}var j=b.Plugin("transition",{widget:!0,defaults:{always:!1,property:null,target:null},methods:{_construct:c,_destruct:d,resolve:f}}),k=j.events,l=j.functions,m=b.window});
/*End Components for Modal*/

/*Components for Slideshow*/
(function(a){a.fn.camera=function(H,V){var N={alignment:"center",autoAdvance:true,mobileAutoAdvance:true,barDirection:"leftToRight",barPosition:"bottom",cols:6,easing:"easeInOutExpo",mobileEasing:"",fx:"random",mobileFx:"",gridDifference:250,height:"50%",imagePath:"/CCOM/assets//images/slideshow/",hover:true,loader:"pie",loaderColor:"#eeeeee",loaderBgColor:"#222222",loaderOpacity:0.8,loaderPadding:2,loaderStroke:7,minHeight:"200px",navigation:true,navigationHover:true,mobileNavHover:true,opacityOnGrid:false,overlayer:true,pagination:true,playPause:true,pauseOnClick:true,pieDiameter:38,piePosition:"rightTop",portrait:false,rows:4,slicedCols:12,slicedRows:8,slideOn:"random",thumbnails:false,time:7000,transPeriod:1500,onEndTransition:function(){},onLoaded:function(){},onStartLoading:function(){},onStartTransition:function(){}};function L(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)){return true}}a.support.borderRadius=false;a.each(["borderRadius","BorderRadius","MozBorderRadius","WebkitBorderRadius","OBorderRadius","KhtmlBorderRadius"],function(){if(document.body.style[this]!==undefined){a.support.borderRadius=true}});var H=a.extend({},N,H);var ae=a(this).addClass("camera_wrap");ae.wrapInner('<div class="camera_src" />').wrapInner('<div class="camera_fakehover" />');var D=a(".camera_fakehover",ae);var W=(".camera_fakehover",ae);D.append('<div class="camera_target"></div>');if(H.overlayer==true){D.append('<div class="camera_overlayer"></div>')}D.append('<div class="camera_target_content"></div>');var C;if(H.loader=="pie"&&!a.support.borderRadius){C="bar"}else{C=H.loader}if(C=="pie"){D.append('<div class="camera_pie"></div>')}else{if(C=="bar"){D.append('<div class="camera_bar"></div>')}else{D.append('<div class="camera_bar" style="display:none"></div>')}}if(H.playPause==true){D.append('<div class="camera_commands"></div>')}if(H.navigation==true){D.append('<div class="camera_prev"><span></span></div>').append('<div class="camera_next"><span></span></div>')}if(H.thumbnails==true){ae.append('<div class="camera_thumbs_cont" />')}if(H.thumbnails==true&&H.pagination!=true){a(".camera_thumbs_cont",ae).wrap("<div />").wrap('<div class="camera_thumbs" />').wrap("<div />").wrap('<div class="camera_command_wrap" />')}if(H.pagination==true){ae.append('<div class="camera_pag"></div>')}ae.append('<div class="camera_loader"></div>');a(".camera_caption",ae).each(function(){a(this).wrapInner("<div />")});var q="pie_"+ae.index(),ag=a(".camera_src",ae),b=a(".camera_target",ae),s=a(".camera_target_content",ae),p=a(".camera_pie",ae),ah=a(".camera_bar",ae),am=a(".camera_prev",ae),r=a(".camera_next",ae),R=a(".camera_commands",ae),n=a(".camera_pag",ae),M=a(".camera_thumbs_cont",ae);var Z,aj;var X=new Array();a("> div",ag).each(function(){X.push(a(this).attr("data-src"))});var c=new Array();a("> div",ag).each(function(){if(a(this).attr("data-link")){c.push(a(this).attr("data-link"))}else{c.push("")}});var m=new Array();a("> div",ag).each(function(){if(a(this).attr("data-target")){m.push(a(this).attr("data-target"))}else{m.push("")}});var k=new Array();a("> div",ag).each(function(){if(a(this).attr("data-portrait")){k.push(a(this).attr("data-portrait"))}else{k.push("")}});var o=new Array();a("> div",ag).each(function(){if(a(this).attr("data-alignment")){o.push(a(this).attr("data-alignment"))}else{o.push("")}});var j=new Array();a("> div",ag).each(function(){if(a(this).attr("data-thumb")){j.push(a(this).attr("data-thumb"))}else{j.push("")}});var y=X.length;a(s).append('<div class="cameraContents" />');var J;for(J=0;J<y;J++){a(".cameraContents",s).append('<div class="cameraContent" />');if(c[J]!=""){var t=a("> div ",ag).eq(J).attr("data-box");if(typeof t!=="undefined"&&t!==false&&t!=""){t='data-box="'+a("> div ",ag).eq(J).attr("data-box")+'"'}else{t=""}a(".camera_target_content .cameraContent:eq("+J+")",ae).append('<a class="camera_link" href="'+c[J]+'" '+t+' target="'+m[J]+'"></a>')}}a(".camera_caption",ae).each(function(){var u=a(this).parent().index(),h=ae.find(".cameraContent").eq(u);a(this).appendTo(h)});b.append('<div class="cameraCont" />');var F=a(".cameraCont",ae);var e;for(e=0;e<y;e++){F.append('<div class="cameraSlide cameraSlide_'+e+'" />');var ak=a("> div:eq("+e+")",ag);b.find(".cameraSlide_"+e).clone(ak)}function z(){var h=a(M).width();a("li",M).removeClass("camera_visThumb");a("li",M).each(function(){var au=a(this).position(),u=a("ul",M).outerWidth(),w=a("ul",M).offset().left,aq=a("> div",M).offset().left,at=aq-w;if(at>0){a(".camera_prevThumbs",U).removeClass("hideNav")}else{a(".camera_prevThumbs",U).addClass("hideNav")}if((u-at)>h){a(".camera_nextThumbs",U).removeClass("hideNav")}else{a(".camera_nextThumbs",U).addClass("hideNav")}var ar=au.left,ap=au.left+(a(this).width());if(ap-at<=h&&ar-at>=0){a(this).addClass("camera_visThumb")}})}a(window).bind("load resize pageshow",function(){I();z()});F.append('<div class="cameraSlide cameraSlide_'+e+'" />');
var an;ae.show();var Z=b.width();var aj=b.height();var ai;a(window).bind("resize pageshow",function(){if(an==true){v()}a("ul",M).animate({"margin-top":0},0,I);if(!ag.hasClass("paused")){ag.addClass("paused");if(a(".camera_stop",U).length){a(".camera_stop",U).hide();a(".camera_play",U).show();if(C!="none"){a("#"+q).hide()}}else{if(C!="none"){a("#"+q).hide()}}clearTimeout(ai);ai=setTimeout(function(){ag.removeClass("paused");if(a(".camera_play",U).length){a(".camera_play",U).hide();a(".camera_stop",U).show();if(C!="none"){a("#"+q).fadeIn()}}else{if(C!="none"){a("#"+q).fadeIn()}}},1500)}});function v(){var h;function u(){Z=ae.width();if(H.height.indexOf("%")!=-1){var w=Math.round(Z/(100/parseFloat(H.height)));if(H.minHeight!=""&&w<parseFloat(H.minHeight)){aj=parseFloat(H.minHeight)}else{aj=w}ae.css({height:aj})}else{if(H.height=="auto"){aj=ae.height()}else{aj=parseFloat(H.height);ae.css({height:aj})}}a(".camerarelative",b).css({width:Z,height:aj});a(".imgLoaded",b).each(function(){var az=a(this),ay=az.attr("width"),ar=az.attr("height"),au=az.index(),at,aq,aw=az.attr("data-alignment"),ax=az.attr("data-portrait");if(typeof aw==="undefined"||aw===false||aw===""){aw=H.alignment}if(typeof ax==="undefined"||ax===false||ax===""){ax=H.portrait}if(ax==false||ax=="false"){if((ay/ar)<(Z/aj)){var ap=Z/ay;var av=(Math.abs(aj-(ar*ap)))*0.5;switch(aw){case"topLeft":at=0;break;case"topCenter":at=0;break;case"topRight":at=0;break;case"centerLeft":at="-"+av+"px";break;case"center":at="-"+av+"px";break;case"centerRight":at="-"+av+"px";break;case"bottomLeft":at="-"+av*2+"px";break;case"bottomCenter":at="-"+av*2+"px";break;case"bottomRight":at="-"+av*2+"px";break}az.css({height:ar*ap,"margin-left":0,"margin-right":0,"margin-top":at,position:"absolute",visibility:"visible",width:Z})}else{var ap=aj/ar;var av=(Math.abs(Z-(ay*ap)))*0.5;switch(aw){case"topLeft":aq=0;break;case"topCenter":aq="-"+av+"px";break;case"topRight":aq="-"+av*2+"px";break;case"centerLeft":aq=0;break;case"center":aq="-"+av+"px";break;case"centerRight":aq="-"+av*2+"px";break;case"bottomLeft":aq=0;break;case"bottomCenter":aq="-"+av+"px";break;case"bottomRight":aq="-"+av*2+"px";break}az.css({height:aj,"margin-left":aq,"margin-right":aq,"margin-top":0,position:"absolute",visibility:"visible",width:ay*ap})}}else{if((ay/ar)<(Z/aj)){var ap=aj/ar;var av=(Math.abs(Z-(ay*ap)))*0.5;switch(aw){case"topLeft":aq=0;break;case"topCenter":aq=av+"px";break;case"topRight":aq=av*2+"px";break;case"centerLeft":aq=0;break;case"center":aq=av+"px";break;case"centerRight":aq=av*2+"px";break;case"bottomLeft":aq=0;break;case"bottomCenter":aq=av+"px";break;case"bottomRight":aq=av*2+"px";break}az.css({height:aj,"margin-left":aq,"margin-right":aq,"margin-top":0,position:"absolute",visibility:"visible",width:ay*ap})}else{var ap=Z/ay;var av=(Math.abs(aj-(ar*ap)))*0.5;switch(aw){case"topLeft":at=0;break;case"topCenter":at=0;break;case"topRight":at=0;break;case"centerLeft":at=av+"px";break;case"center":at=av+"px";break;case"centerRight":at=av+"px";break;case"bottomLeft":at=av*2+"px";break;case"bottomCenter":at=av*2+"px";break;case"bottomRight":at=av*2+"px";break}az.css({height:ar*ap,"margin-left":0,"margin-right":0,"margin-top":at,position:"absolute",visibility:"visible",width:Z})}}})}if(an==true){clearTimeout(h);h=setTimeout(u,200)}else{u()}an=true}var aa,ac;var Y,d,ab,R,n;var P,S;if(L()&&H.mobileAutoAdvance!=""){d=H.mobileAutoAdvance}else{d=H.autoAdvance}if(d==false){ag.addClass("paused")}if(L()&&H.mobileNavHover!=""){ab=H.mobileNavHover}else{ab=H.navigationHover}if(ag.length!=0){var i=a(".cameraSlide",b);i.wrapInner('<div class="camerarelative" />');var E;var A=H.barDirection;var U=ae;a("iframe",D).each(function(){var h=a(this);var w=h.attr("src");h.attr("data-src",w);var u=h.parent().index(".camera_src > div");a(".camera_target_content .cameraContent:eq("+u+")",ae).append(h)});function af(){a("iframe",D).each(function(){a(".camera_caption",D).show();var w=a(this);var u=w.attr("data-src");w.attr("src",u);var aq=H.imagePath+"blank.gif";var h=new Image();h.src=aq;if(H.height.indexOf("%")!=-1){var ap=Math.round(Z/(100/parseFloat(H.height)));if(H.minHeight!=""&&ap<parseFloat(H.minHeight)){aj=parseFloat(H.minHeight)}else{aj=ap}}else{if(H.height=="auto"){aj=ae.height()}else{aj=parseFloat(H.height)}}w.after(a(h).attr({"class":"imgFake",width:Z,height:aj}));var ar=w.clone();w.remove();a(h).bind("click",function(){if(a(this).css("position")=="absolute"){a(this).remove();if(u.indexOf("vimeo")!=-1||u.indexOf("youtube")!=-1){if(u.indexOf("?")!=-1){autoplay="&autoplay=1"}else{autoplay="?autoplay=1"}}else{if(u.indexOf("dailymotion")!=-1){if(u.indexOf("?")!=-1){autoplay="&autoPlay=1"}else{autoplay="?autoPlay=1"}}}ar.attr("src",u+autoplay);S=true}else{a(this).css({position:"absolute",top:0,left:0,zIndex:10}).after(ar);ar.css({position:"absolute",top:0,left:0,zIndex:9})}})})}af();if(H.hover==true){if(!L()){D.hover(function(){ag.addClass("hovered")},function(){ag.removeClass("hovered")})}}if(ab==true){a(am,ae).animate({opacity:0},0);
a(r,ae).animate({opacity:0},0);a(R,ae).animate({opacity:0},0);if(L()){a(document).on("vmouseover",W,function(){a(am,ae).animate({opacity:1},200);a(r,ae).animate({opacity:1},200);a(R,ae).animate({opacity:1},200)});a(document).on("vmouseout",W,function(){a(am,ae).delay(500).animate({opacity:0},200);a(r,ae).delay(500).animate({opacity:0},200);a(R,ae).delay(500).animate({opacity:0},200)})}else{D.hover(function(){a(am,ae).animate({opacity:1},200);a(r,ae).animate({opacity:1},200);a(R,ae).animate({opacity:1},200)},function(){a(am,ae).animate({opacity:0},200);a(r,ae).animate({opacity:0},200);a(R,ae).animate({opacity:0},200)})}}U.on("click",".camera_stop",function(){d=false;ag.addClass("paused");if(a(".camera_stop",U).length){a(".camera_stop",U).hide();a(".camera_play",U).show();if(C!="none"){a("#"+q).hide()}}else{if(C!="none"){a("#"+q).hide()}}});U.on("click",".camera_play",function(){d=true;ag.removeClass("paused");if(a(".camera_play",U).length){a(".camera_play",U).hide();a(".camera_stop",U).show();if(C!="none"){a("#"+q).show()}}else{if(C!="none"){a("#"+q).show()}}});if(H.pauseOnClick==true){a(".camera_target_content",D).mouseup(function(){d=false;ag.addClass("paused");a(".camera_stop",U).hide();a(".camera_play",U).show();a("#"+q).hide()})}a(".cameraContent, .imgFake",D).hover(function(){P=true},function(){P=false});a(".cameraContent, .imgFake",D).bind("click",function(){if(S==true&&P==true){d=false;a(".camera_caption",D).hide();ag.addClass("paused");a(".camera_stop",U).hide();a(".camera_play",U).show();a("#"+q).hide()}})}function Q(u){for(var w,h,ap=u.length;ap;w=parseInt(Math.random()*ap),h=u[--ap],u[ap]=u[w],u[w]=h){}return u}function x(h){return Math.ceil(h)==Math.floor(h)}if(C!="pie"){ah.append('<span class="camera_bar_cont" />');a(".camera_bar_cont",ah).animate({opacity:H.loaderOpacity},0).css({position:"absolute",left:0,right:0,top:0,bottom:0,"background-color":H.loaderBgColor}).append('<span id="'+q+'" />');a("#"+q).animate({opacity:0},0);var l=a("#"+q);l.css({position:"absolute","background-color":H.loaderColor});switch(H.barPosition){case"left":ah.css({right:"auto",width:H.loaderStroke});break;case"right":ah.css({left:"auto",width:H.loaderStroke});break;case"top":ah.css({bottom:"auto",height:H.loaderStroke});break;case"bottom":ah.css({top:"auto",height:H.loaderStroke});break}switch(A){case"leftToRight":l.css({left:0,right:0,top:H.loaderPadding,bottom:H.loaderPadding});break;case"rightToLeft":l.css({left:0,right:0,top:H.loaderPadding,bottom:H.loaderPadding});break;case"topToBottom":l.css({left:H.loaderPadding,right:H.loaderPadding,top:0,bottom:0});break;case"bottomToTop":l.css({left:H.loaderPadding,right:H.loaderPadding,top:0,bottom:0});break}}else{p.append('<canvas id="'+q+'"></canvas>');var ad;var l=document.getElementById(q);l.setAttribute("width",H.pieDiameter);l.setAttribute("height",H.pieDiameter);var ao;switch(H.piePosition){case"leftTop":ao="left:0; top:0;";break;case"rightTop":ao="right:0; top:0;";break;case"leftBottom":ao="left:0; bottom:0;";break;case"rightBottom":ao="right:0; bottom:0;";break}l.setAttribute("style","position:absolute; z-index:1002; "+ao);var g;var f;if(l&&l.getContext){var B=l.getContext("2d");B.rotate(Math.PI*(3/2));B.translate(-H.pieDiameter,0)}}if(C=="none"||d==false){a("#"+q).hide();a(".camera_canvas_wrap",U).hide()}if(a(n).length){a(n).append('<ul class="camera_pag_ul" />');var O;for(O=0;O<y;O++){a(".camera_pag_ul",ae).append('<li class="pag_nav_'+O+'" style="position:relative; z-index:1002"><span><span>'+O+"</span></span></li>")}a(".camera_pag_ul li",ae).hover(function(){a(this).addClass("camera_hover");if(a(".camera_thumb",this).length){var u=a(".camera_thumb",this).outerWidth(),w=a(".camera_thumb",this).outerHeight(),h=a(this).outerWidth();a(".camera_thumb",this).show().css({top:"-"+w+"px",left:"-"+(u-h)/2+"px"}).animate({opacity:1,"margin-top":"-3px"},200);a(".thumb_arrow",this).show().animate({opacity:1,"margin-top":"-3px"},200)}},function(){a(this).removeClass("camera_hover");a(".camera_thumb",this).animate({"margin-top":"-20px",opacity:0},200,function(){a(this).css({marginTop:"5px"}).hide()});a(".thumb_arrow",this).animate({"margin-top":"-20px",opacity:0},200,function(){a(this).css({marginTop:"5px"}).hide()})})}if(a(M).length){var al;if(!a(n).length){a(M).append("<div />");a(M).before('<div class="camera_prevThumbs hideNav"><div></div></div>').before('<div class="camera_nextThumbs hideNav"><div></div></div>');a("> div",M).append("<ul />");a.each(j,function(h,w){if(a("> div",ag).eq(h).attr("data-thumb")!=""){var ap=a("> div",ag).eq(h).attr("data-thumb"),u=new Image();u.src=ap;a("ul",M).append('<li class="pix_thumb pix_thumb_'+h+'" />');a("li.pix_thumb_"+h,M).append(a(u).attr("class","camera_thumb"))}})}else{a.each(j,function(h,w){if(a("> div",ag).eq(h).attr("data-thumb")!=""){var ap=a("> div",ag).eq(h).attr("data-thumb"),u=new Image();u.src=ap;a("li.pag_nav_"+h,n).append(a(u).attr("class","camera_thumb").css({position:"absolute"}).animate({opacity:0},0));a("li.pag_nav_"+h+" > img",n).after('<div class="thumb_arrow" />');
a("li.pag_nav_"+h+" > .thumb_arrow",n).animate({opacity:0},0)}});ae.css({marginBottom:a(n).outerHeight()})}}else{if(!a(M).length&&a(n).length){ae.css({marginBottom:a(n).outerHeight()})}}var G=true;function I(){if(a(M).length&&!a(n).length){var w=a(M).outerWidth(),ap=a("ul > li",M).outerWidth(),au=a("li.cameracurrent",M).length?a("li.cameracurrent",M).position():"",u=(a("ul > li",M).length*a("ul > li",M).outerWidth()),ar=a("ul",M).offset().left,at=a("> div",M).offset().left,h;if(ar<0){h="-"+(at-ar)}else{h=at-ar}if(G==true){a("ul",M).width(a("ul > li",M).length*a("ul > li",M).outerWidth());if(a(M).length&&!a(n).lenght){ae.css({marginBottom:a(M).outerHeight()})}z();a("ul",M).width(a("ul > li",M).length*a("ul > li",M).outerWidth());if(a(M).length&&!a(n).lenght){ae.css({marginBottom:a(M).outerHeight()})}}G=false;var aq=a("li.cameracurrent",M).length?au.left:"",av=a("li.cameracurrent",M).length?au.left+(a("li.cameracurrent",M).outerWidth()):"";if(aq<a("li.cameracurrent",M).outerWidth()){aq=0}if(av-h>w){if((aq+w)<u){a("ul",M).animate({"margin-left":"-"+(aq)+"px"},500,z)}else{a("ul",M).animate({"margin-left":"-"+(a("ul",M).outerWidth()-w)+"px"},500,z)}}else{if(aq-h<0){a("ul",M).animate({"margin-left":"-"+(aq)+"px"},500,z)}else{a("ul",M).css({"margin-left":"auto","margin-right":"auto"});setTimeout(z,100)}}}}if(a(R).length){a(R).append('<div class="camera_play"></div>').append('<div class="camera_stop"></div>');if(d==true){a(".camera_play",U).hide();a(".camera_stop",U).show()}else{a(".camera_stop",U).hide();a(".camera_play",U).show()}}function K(){g=0;var h=a(".camera_bar_cont",U).width(),u=a(".camera_bar_cont",U).height();if(C!="pie"){switch(A){case"leftToRight":a("#"+q).css({right:h});break;case"rightToLeft":a("#"+q).css({left:h});break;case"topToBottom":a("#"+q).css({bottom:u});break;case"bottomToTop":a("#"+q).css({top:u});break}}else{B.clearRect(0,0,H.pieDiameter,H.pieDiameter)}}K();a(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom",D).each(function(){a(this).css("visibility","hidden")});H.onStartLoading.call(this);T();function T(aF){ag.addClass("camerasliding");S=false;var aZ=parseFloat(a("div.cameraSlide.cameracurrent",b).index());if(aF>0){var aK=aF-1}else{if(aZ==y-1){var aK=0}else{var aK=aZ+1}}var u=a(".cameraSlide:eq("+aK+")",b);var aL=a(".cameraSlide:eq("+(aK+1)+")",b).addClass("cameranext");if(aZ!=aK+1){aL.hide()}a(".cameraContent",D).fadeOut(600);a(".camera_caption",D).show();a(".camerarelative",u).append(a("> div ",ag).eq(aK).find("> div.camera_effected"));a(".camera_target_content .cameraContent:eq("+aK+")",ae).append(a("> div ",ag).eq(aK).find("> div"));if(!a(".imgLoaded",u).length){var aC=X[aK];var aJ=new Image();aJ.src=aC+"?"+new Date().getTime();u.css("visibility","hidden");u.prepend(a(aJ).attr("class","imgLoaded").css("visibility","hidden"));var au,ar;if(!a(aJ).get(0).complete||au=="0"||ar=="0"||typeof au==="undefined"||au===false||typeof ar==="undefined"||ar===false){a(".camera_loader",ae).delay(500).fadeIn(400);aJ.onload=function(){au=aJ.naturalWidth;ar=aJ.naturalHeight;a(aJ).attr("data-alignment",o[aK]).attr("data-portrait",k[aK]);a(aJ).attr("width",au);a(aJ).attr("height",ar);b.find(".cameraSlide_"+aK).hide().css("visibility","visible");v();T(aK+1)}}}else{if(X.length>(aK+1)&&!a(".imgLoaded",aL).length){var at=X[(aK+1)];var aA=new Image();aA.src=at+"?"+new Date().getTime();aL.prepend(a(aA).attr("class","imgLoaded").css("visibility","hidden"));aA.onload=function(){au=aA.naturalWidth;ar=aA.naturalHeight;a(aA).attr("data-alignment",o[aK+1]).attr("data-portrait",k[aK+1]);a(aA).attr("width",au);a(aA).attr("height",ar);v()}}H.onLoaded.call(this);if(a(".camera_loader",ae).is(":visible")){a(".camera_loader",ae).fadeOut(400)}else{a(".camera_loader",ae).css({visibility:"hidden"});a(".camera_loader",ae).fadeOut(400,function(){a(".camera_loader",ae).css({visibility:"visible"})})}var a0=H.rows,av=H.cols,aW=1,h=0,aD,aX,aI,aB,aN,az=new Array("simpleFade","curtainTopLeft","curtainTopRight","curtainBottomLeft","curtainBottomRight","curtainSliceLeft","curtainSliceRight","blindCurtainTopLeft","blindCurtainTopRight","blindCurtainBottomLeft","blindCurtainBottomRight","blindCurtainSliceBottom","blindCurtainSliceTop","stampede","mosaic","mosaicReverse","mosaicRandom","mosaicSpiral","mosaicSpiralReverse","topLeftBottomRight","bottomRightTopLeft","bottomLeftTopRight","topRightBottomLeft","scrollLeft","scrollRight","scrollTop","scrollBottom","scrollHorz");marginLeft=0,marginTop=0,opacityOnGrid=0;if(H.opacityOnGrid==true){opacityOnGrid=0}else{opacityOnGrid=1}var aw=a(" > div",ag).eq(aK).attr("data-fx");if(L()&&H.mobileFx!=""&&H.mobileFx!="default"){aB=H.mobileFx}else{if(typeof aw!=="undefined"&&aw!==false&&aw!=="default"){aB=aw}else{aB=H.fx}}if(aB=="random"){aB=Q(az);aB=aB[0]}else{aB=aB;if(aB.indexOf(",")>0){aB=aB.replace(/ /g,"");aB=aB.split(",");aB=Q(aB);aB=aB[0]}}dataEasing=a(" > div",ag).eq(aK).attr("data-easing");mobileEasing=a(" > div",ag).eq(aK).attr("data-mobileEasing");
if(L()&&H.mobileEasing!=""&&H.mobileEasing!="default"){if(typeof mobileEasing!=="undefined"&&mobileEasing!==false&&mobileEasing!=="default"){aN=mobileEasing}else{aN=H.mobileEasing}}else{if(typeof dataEasing!=="undefined"&&dataEasing!==false&&dataEasing!=="default"){aN=dataEasing}else{aN=H.easing}}aD=a(" > div",ag).eq(aK).attr("data-slideOn");if(typeof aD!=="undefined"&&aD!==false){aT=aD}else{if(H.slideOn=="random"){var aT=new Array("next","prev");aT=Q(aT);aT=aT[0]}else{aT=H.slideOn}}var aq=a(" > div",ag).eq(aK).attr("data-time");if(typeof aq!=="undefined"&&aq!==false&&aq!==""){aX=parseFloat(aq)}else{aX=H.time}var ap=a(" > div",ag).eq(aK).attr("data-transPeriod");if(typeof ap!=="undefined"&&ap!==false&&ap!==""){aI=parseFloat(ap)}else{aI=H.transPeriod}if(!a(ag).hasClass("camerastarted")){aB="simpleFade";aT="next";aN="";aI=400;a(ag).addClass("camerastarted")}switch(aB){case"simpleFade":av=1;a0=1;break;case"curtainTopLeft":if(H.slicedCols==0){av=H.cols}else{av=H.slicedCols}a0=1;break;case"curtainTopRight":if(H.slicedCols==0){av=H.cols}else{av=H.slicedCols}a0=1;break;case"curtainBottomLeft":if(H.slicedCols==0){av=H.cols}else{av=H.slicedCols}a0=1;break;case"curtainBottomRight":if(H.slicedCols==0){av=H.cols}else{av=H.slicedCols}a0=1;break;case"curtainSliceLeft":if(H.slicedCols==0){av=H.cols}else{av=H.slicedCols}a0=1;break;case"curtainSliceRight":if(H.slicedCols==0){av=H.cols}else{av=H.slicedCols}a0=1;break;case"blindCurtainTopLeft":if(H.slicedRows==0){a0=H.rows}else{a0=H.slicedRows}av=1;break;case"blindCurtainTopRight":if(H.slicedRows==0){a0=H.rows}else{a0=H.slicedRows}av=1;break;case"blindCurtainBottomLeft":if(H.slicedRows==0){a0=H.rows}else{a0=H.slicedRows}av=1;break;case"blindCurtainBottomRight":if(H.slicedRows==0){a0=H.rows}else{a0=H.slicedRows}av=1;break;case"blindCurtainSliceTop":if(H.slicedRows==0){a0=H.rows}else{a0=H.slicedRows}av=1;break;case"blindCurtainSliceBottom":if(H.slicedRows==0){a0=H.rows}else{a0=H.slicedRows}av=1;break;case"stampede":h="-"+aI;break;case"mosaic":h=H.gridDifference;break;case"mosaicReverse":h=H.gridDifference;break;case"mosaicRandom":break;case"mosaicSpiral":h=H.gridDifference;aW=1.7;break;case"mosaicSpiralReverse":h=H.gridDifference;aW=1.7;break;case"topLeftBottomRight":h=H.gridDifference;aW=6;break;case"bottomRightTopLeft":h=H.gridDifference;aW=6;break;case"bottomLeftTopRight":h=H.gridDifference;aW=6;break;case"topRightBottomLeft":h=H.gridDifference;aW=6;break;case"scrollLeft":av=1;a0=1;break;case"scrollRight":av=1;a0=1;break;case"scrollTop":av=1;a0=1;break;case"scrollBottom":av=1;a0=1;break;case"scrollHorz":av=1;a0=1;break}var aV=0;var a2=a0*av;var a1=Z-(Math.floor(Z/av)*av);var w=aj-(Math.floor(aj/a0)*a0);var aE;var aM;var aG=0;var aP=0;var ay=new Array();var aO=new Array();var aQ=new Array();while(aV<a2){ay.push(aV);aO.push(aV);F.append('<div class="cameraappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');var ax=a(".cameraappended:eq("+aV+")",b);if(aB=="scrollLeft"||aB=="scrollRight"||aB=="scrollTop"||aB=="scrollBottom"||aB=="scrollHorz"){i.eq(aK).clone().show().appendTo(ax)}else{if(aT=="next"){i.eq(aK).clone().show().appendTo(ax)}else{i.eq(aZ).clone().show().appendTo(ax)}}if(aV%av<a1){aE=1}else{aE=0}if(aV%av==0){aG=0}if(Math.floor(aV/av)<w){aM=1}else{aM=0}ax.css({height:Math.floor((aj/a0)+aM+1),left:aG,top:aP,width:Math.floor((Z/av)+aE+1)});a("> .cameraSlide",ax).css({height:aj,"margin-left":"-"+aG+"px","margin-top":"-"+aP+"px",width:Z});aG=aG+ax.width()-1;if(aV%av==av-1){aP=aP+ax.height()-1}aV++}switch(aB){case"curtainTopLeft":break;case"curtainBottomLeft":break;case"curtainSliceLeft":break;case"curtainTopRight":ay=ay.reverse();break;case"curtainBottomRight":ay=ay.reverse();break;case"curtainSliceRight":ay=ay.reverse();break;case"blindCurtainTopLeft":break;case"blindCurtainBottomLeft":ay=ay.reverse();break;case"blindCurtainSliceTop":break;case"blindCurtainTopRight":break;case"blindCurtainBottomRight":ay=ay.reverse();break;case"blindCurtainSliceBottom":ay=ay.reverse();break;case"stampede":ay=Q(ay);break;case"mosaic":break;case"mosaicReverse":ay=ay.reverse();break;case"mosaicRandom":ay=Q(ay);break;case"mosaicSpiral":var aH=a0/2,aU,aS,aR,aY=0;for(aR=0;aR<aH;aR++){aS=aR;for(aU=aR;aU<av-aR-1;aU++){aQ[aY++]=aS*av+aU}aU=av-aR-1;for(aS=aR;aS<a0-aR-1;aS++){aQ[aY++]=aS*av+aU}aS=a0-aR-1;for(aU=av-aR-1;aU>aR;aU--){aQ[aY++]=aS*av+aU}aU=aR;for(aS=a0-aR-1;aS>aR;aS--){aQ[aY++]=aS*av+aU}}ay=aQ;break;case"mosaicSpiralReverse":var aH=a0/2,aU,aS,aR,aY=a2-1;for(aR=0;aR<aH;aR++){aS=aR;for(aU=aR;aU<av-aR-1;aU++){aQ[aY--]=aS*av+aU}aU=av-aR-1;for(aS=aR;aS<a0-aR-1;aS++){aQ[aY--]=aS*av+aU}aS=a0-aR-1;for(aU=av-aR-1;aU>aR;aU--){aQ[aY--]=aS*av+aU}aU=aR;for(aS=a0-aR-1;aS>aR;aS--){aQ[aY--]=aS*av+aU}}ay=aQ;break;case"topLeftBottomRight":for(var aS=0;aS<a0;aS++){for(var aU=0;aU<av;aU++){aQ.push(aU+aS)}}aO=aQ;break;case"bottomRightTopLeft":for(var aS=0;aS<a0;aS++){for(var aU=0;aU<av;aU++){aQ.push(aU+aS)}}aO=aQ.reverse();break;case"bottomLeftTopRight":for(var aS=a0;aS>0;aS--){for(var aU=0;
aU<av;aU++){aQ.push(aU+aS)}}aO=aQ;break;case"topRightBottomLeft":for(var aS=0;aS<a0;aS++){for(var aU=av;aU>0;aU--){aQ.push(aU+aS)}}aO=aQ;break}a.each(ay,function(a3,a5){if(a5%av<a1){aE=1}else{aE=0}if(a5%av==0){aG=0}if(Math.floor(a5/av)<w){aM=1}else{aM=0}switch(aB){case"simpleFade":height=aj;width=Z;opacityOnGrid=0;break;case"curtainTopLeft":height=0,width=Math.floor((Z/av)+aE+1),marginTop="-"+Math.floor((aj/a0)+aM+1)+"px";break;case"curtainTopRight":height=0,width=Math.floor((Z/av)+aE+1),marginTop="-"+Math.floor((aj/a0)+aM+1)+"px";break;case"curtainBottomLeft":height=0,width=Math.floor((Z/av)+aE+1),marginTop=Math.floor((aj/a0)+aM+1)+"px";break;case"curtainBottomRight":height=0,width=Math.floor((Z/av)+aE+1),marginTop=Math.floor((aj/a0)+aM+1)+"px";break;case"curtainSliceLeft":height=0,width=Math.floor((Z/av)+aE+1);if(a5%2==0){marginTop=Math.floor((aj/a0)+aM+1)+"px"}else{marginTop="-"+Math.floor((aj/a0)+aM+1)+"px"}break;case"curtainSliceRight":height=0,width=Math.floor((Z/av)+aE+1);if(a5%2==0){marginTop=Math.floor((aj/a0)+aM+1)+"px"}else{marginTop="-"+Math.floor((aj/a0)+aM+1)+"px"}break;case"blindCurtainTopLeft":height=Math.floor((aj/a0)+aM+1),width=0,marginLeft="-"+Math.floor((Z/av)+aE+1)+"px";break;case"blindCurtainTopRight":height=Math.floor((aj/a0)+aM+1),width=0,marginLeft=Math.floor((Z/av)+aE+1)+"px";break;case"blindCurtainBottomLeft":height=Math.floor((aj/a0)+aM+1),width=0,marginLeft="-"+Math.floor((Z/av)+aE+1)+"px";break;case"blindCurtainBottomRight":height=Math.floor((aj/a0)+aM+1),width=0,marginLeft=Math.floor((Z/av)+aE+1)+"px";break;case"blindCurtainSliceBottom":height=Math.floor((aj/a0)+aM+1),width=0;if(a5%2==0){marginLeft="-"+Math.floor((Z/av)+aE+1)+"px"}else{marginLeft=Math.floor((Z/av)+aE+1)+"px"}break;case"blindCurtainSliceTop":height=Math.floor((aj/a0)+aM+1),width=0;if(a5%2==0){marginLeft="-"+Math.floor((Z/av)+aE+1)+"px"}else{marginLeft=Math.floor((Z/av)+aE+1)+"px"}break;case"stampede":height=0;width=0;marginLeft=(Z*0.2)*(((a3)%av)-(av-(Math.floor(av/2))))+"px";marginTop=(aj*0.2)*((Math.floor(a3/av)+1)-(a0-(Math.floor(a0/2))))+"px";break;case"mosaic":height=0;width=0;break;case"mosaicReverse":height=0;width=0;marginLeft=Math.floor((Z/av)+aE+1)+"px";marginTop=Math.floor((aj/a0)+aM+1)+"px";break;case"mosaicRandom":height=0;width=0;marginLeft=Math.floor((Z/av)+aE+1)*0.5+"px";marginTop=Math.floor((aj/a0)+aM+1)*0.5+"px";break;case"mosaicSpiral":height=0;width=0;marginLeft=Math.floor((Z/av)+aE+1)*0.5+"px";marginTop=Math.floor((aj/a0)+aM+1)*0.5+"px";break;case"mosaicSpiralReverse":height=0;width=0;marginLeft=Math.floor((Z/av)+aE+1)*0.5+"px";marginTop=Math.floor((aj/a0)+aM+1)*0.5+"px";break;case"topLeftBottomRight":height=0;width=0;break;case"bottomRightTopLeft":height=0;width=0;marginLeft=Math.floor((Z/av)+aE+1)+"px";marginTop=Math.floor((aj/a0)+aM+1)+"px";break;case"bottomLeftTopRight":height=0;width=0;marginLeft=0;marginTop=Math.floor((aj/a0)+aM+1)+"px";break;case"topRightBottomLeft":height=0;width=0;marginLeft=Math.floor((Z/av)+aE+1)+"px";marginTop=0;break;case"scrollRight":height=aj;width=Z;marginLeft=-Z;break;case"scrollLeft":height=aj;width=Z;marginLeft=Z;break;case"scrollTop":height=aj;width=Z;marginTop=aj;break;case"scrollBottom":height=aj;width=Z;marginTop=-aj;break;case"scrollHorz":height=aj;width=Z;if(aZ==0&&aK==y-1){marginLeft=-Z}else{if(aZ<aK||(aZ==y-1&&aK==0)){marginLeft=Z}else{marginLeft=-Z}}break}var a6=a(".cameraappended:eq("+a5+")",b);if(typeof aa!=="undefined"){clearInterval(aa);clearTimeout(ac);ac=setTimeout(K,aI+h)}if(a(n).length){a(".camera_pag li",ae).removeClass("cameracurrent");a(".camera_pag li",ae).eq(aK).addClass("cameracurrent")}if(a(M).length){a("li",M).removeClass("cameracurrent");a("li",M).eq(aK).addClass("cameracurrent");a("li",M).not(".cameracurrent").find("img").animate({opacity:0.5},0);a("li.cameracurrent img",M).animate({opacity:1},0);a("li",M).hover(function(){a("img",this).stop(true,false).animate({opacity:1},150)},function(){if(!a(this).hasClass("cameracurrent")){a("img",this).stop(true,false).animate({opacity:0.5},150)}})}var a7=parseFloat(aI)+parseFloat(h);function a4(){a(this).addClass("cameraeased");if(a(".cameraeased",b).length>=0){a(M).css({visibility:"visible"})}if(a(".cameraeased",b).length==a2){I();a(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom",D).each(function(){a(this).css("visibility","hidden")});i.eq(aK).show().css("z-index","999").removeClass("cameranext").addClass("cameracurrent");i.eq(aZ).css("z-index","1").removeClass("cameracurrent");a(".cameraContent",D).eq(aK).addClass("cameracurrent");if(aZ>=0){a(".cameraContent",D).eq(aZ).removeClass("cameracurrent")}H.onEndTransition.call(this);if(a("> div",ag).eq(aK).attr("data-video")!="hide"&&a(".cameraContent.cameracurrent .imgFake",D).length){a(".cameraContent.cameracurrent .imgFake",D).click()}var bb=i.eq(aK).find(".fadeIn").length;var a8=a(".cameraContent",D).eq(aK).find(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom").length;
if(bb!=0){a(".cameraSlide.cameracurrent .fadeIn",D).each(function(){if(a(this).attr("data-easing")!=""){var bh=a(this).attr("data-easing")}else{var bh=aN}var bn=a(this);if(typeof bn.attr("data-outerWidth")==="undefined"||bn.attr("data-outerWidth")===false||bn.attr("data-outerWidth")===""){var bg=bn.outerWidth();bn.attr("data-outerWidth",bg)}else{var bg=bn.attr("data-outerWidth")}if(typeof bn.attr("data-outerHeight")==="undefined"||bn.attr("data-outerHeight")===false||bn.attr("data-outerHeight")===""){var bf=bn.outerHeight();bn.attr("data-outerHeight",bf)}else{var bf=bn.attr("data-outerHeight")}var bj=bn.position();var be=bj.left;var bk=bj.top;var bi=bn.attr("class");var bd=bn.index();var bl=bn.parents(".camerarelative").outerHeight();var bm=bn.parents(".camerarelative").outerWidth();if(bi.indexOf("fadeIn")!=-1){bn.animate({opacity:0},0).css("visibility","visible").delay((aX/bb)*(0.1*(bd-1))).animate({opacity:1},(aX/bb)*0.15,bh)}else{bn.css("visibility","visible")}})}a(".cameraContent.cameracurrent",D).show();if(a8!=0){a(".cameraContent.cameracurrent .moveFromLeft, .cameraContent.cameracurrent .moveFromRight, .cameraContent.cameracurrent .moveFromTop, .cameraContent.cameracurrent .moveFromBottom, .cameraContent.cameracurrent .fadeIn, .cameraContent.cameracurrent .fadeFromLeft, .cameraContent.cameracurrent .fadeFromRight, .cameraContent.cameracurrent .fadeFromTop, .cameraContent.cameracurrent .fadeFromBottom",D).each(function(){if(a(this).attr("data-easing")!=""){var be=a(this).attr("data-easing")}else{var be=aN}var bf=a(this);var bk=bf.position();var bi=bk.left;var bh=bk.top;var bj=bf.attr("class");var bg=bf.index();var bd=bf.outerHeight();if(bj.indexOf("moveFromLeft")!=-1){bf.css({left:"-"+(Z)+"px",right:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({left:bk.left},(aX/a8)*0.15,be)}else{if(bj.indexOf("moveFromRight")!=-1){bf.css({left:Z+"px",right:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({left:bk.left},(aX/a8)*0.15,be)}else{if(bj.indexOf("moveFromTop")!=-1){bf.css({top:"-"+aj+"px",bottom:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({top:bk.top},(aX/a8)*0.15,be,function(){bf.css({top:"auto",bottom:0})})}else{if(bj.indexOf("moveFromBottom")!=-1){bf.css({top:aj+"px",bottom:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({top:bk.top},(aX/a8)*0.15,be)}else{if(bj.indexOf("fadeFromLeft")!=-1){bf.animate({opacity:0},0).css({left:"-"+(Z)+"px",right:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({left:bk.left,opacity:1},(aX/a8)*0.15,be)}else{if(bj.indexOf("fadeFromRight")!=-1){bf.animate({opacity:0},0).css({left:(Z)+"px",right:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({left:bk.left,opacity:1},(aX/a8)*0.15,be)}else{if(bj.indexOf("fadeFromTop")!=-1){bf.animate({opacity:0},0).css({top:"-"+(aj)+"px",bottom:"auto"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({top:bk.top,opacity:1},(aX/a8)*0.15,be,function(){bf.css({top:"auto",bottom:0})})}else{if(bj.indexOf("fadeFromBottom")!=-1){bf.animate({opacity:0},0).css({bottom:"-"+bd+"px"});bf.css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({bottom:"0",opacity:1},(aX/a8)*0.15,be)}else{if(bj.indexOf("fadeIn")!=-1){bf.animate({opacity:0},0).css("visibility","visible").delay((aX/a8)*(0.1*(bg-1))).animate({opacity:1},(aX/a8)*0.15,be)}else{bf.css("visibility","visible")}}}}}}}}}})}a(".cameraappended",b).remove();ag.removeClass("camerasliding");i.eq(aZ).hide();var a9=a(".camera_bar_cont",U).width(),bc=a(".camera_bar_cont",U).height(),ba;if(C!="pie"){ba=0.05}else{ba=0.005}a("#"+q).animate({opacity:H.loaderOpacity},200);aa=setInterval(function(){if(ag.hasClass("stopped")){clearInterval(aa)}if(C!="pie"){if(g<=1.002&&!ag.hasClass("stopped")&&!ag.hasClass("paused")&&!ag.hasClass("hovered")){g=(g+ba)}else{if(g<=1&&(ag.hasClass("stopped")||ag.hasClass("paused")||ag.hasClass("stopped")||ag.hasClass("hovered"))){g=g}else{if(!ag.hasClass("stopped")&&!ag.hasClass("paused")&&!ag.hasClass("hovered")){clearInterval(aa);af();a("#"+q).animate({opacity:0},200,function(){clearTimeout(ac);ac=setTimeout(K,a7);T();H.onStartLoading.call(this)})}}}switch(A){case"leftToRight":a("#"+q).animate({right:a9-(a9*g)},(aX*ba),"linear");break;case"rightToLeft":a("#"+q).animate({left:a9-(a9*g)},(aX*ba),"linear");break;case"topToBottom":a("#"+q).animate({bottom:bc-(bc*g)},(aX*ba),"linear");break;case"bottomToTop":a("#"+q).animate({bottom:bc-(bc*g)},(aX*ba),"linear");break}}else{f=g;B.clearRect(0,0,H.pieDiameter,H.pieDiameter);B.globalCompositeOperation="destination-over";B.beginPath();B.arc((H.pieDiameter)/2,(H.pieDiameter)/2,(H.pieDiameter)/2-H.loaderStroke,0,Math.PI*2,false);B.lineWidth=H.loaderStroke;B.strokeStyle=H.loaderBgColor;B.stroke();B.closePath();B.globalCompositeOperation="source-over";B.beginPath();B.arc((H.pieDiameter)/2,(H.pieDiameter)/2,(H.pieDiameter)/2-H.loaderStroke,0,Math.PI*2*f,false);
B.lineWidth=H.loaderStroke-(H.loaderPadding*2);B.strokeStyle=H.loaderColor;B.stroke();B.closePath();if(g<=1.002&&!ag.hasClass("stopped")&&!ag.hasClass("paused")&&!ag.hasClass("hovered")){g=(g+ba)}else{if(g<=1&&(ag.hasClass("stopped")||ag.hasClass("paused")||ag.hasClass("hovered"))){g=g}else{if(!ag.hasClass("stopped")&&!ag.hasClass("paused")&&!ag.hasClass("hovered")){clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",U).animate({opacity:0},200,function(){clearTimeout(ac);ac=setTimeout(K,a7);T();H.onStartLoading.call(this)})}}}}},aX*ba)}}if(aB=="scrollLeft"||aB=="scrollRight"||aB=="scrollTop"||aB=="scrollBottom"||aB=="scrollHorz"){H.onStartTransition.call(this);a7=0;a6.delay((((aI+h)/a2)*aO[a3]*aW)*0.5).css({display:"block",height:height,"margin-left":marginLeft,"margin-top":marginTop,width:width}).animate({height:Math.floor((aj/a0)+aM+1),"margin-top":0,"margin-left":0,width:Math.floor((Z/av)+aE+1)},(aI-h),aN,a4);i.eq(aZ).delay((((aI+h)/a2)*aO[a3]*aW)*0.5).animate({"margin-left":marginLeft*(-1),"margin-top":marginTop*(-1)},(aI-h),aN,function(){a(this).css({"margin-top":0,"margin-left":0})})}else{H.onStartTransition.call(this);a7=parseFloat(aI)+parseFloat(h);if(aT=="next"){a6.delay((((aI+h)/a2)*aO[a3]*aW)*0.5).css({display:"block",height:height,"margin-left":marginLeft,"margin-top":marginTop,width:width,opacity:opacityOnGrid}).animate({height:Math.floor((aj/a0)+aM+1),"margin-top":0,"margin-left":0,opacity:1,width:Math.floor((Z/av)+aE+1)},(aI-h),aN,a4)}else{i.eq(aK).show().css("z-index","999").addClass("cameracurrent");i.eq(aZ).css("z-index","1").removeClass("cameracurrent");a(".cameraContent",D).eq(aK).addClass("cameracurrent");a(".cameraContent",D).eq(aZ).removeClass("cameracurrent");a6.delay((((aI+h)/a2)*aO[a3]*aW)*0.5).css({display:"block",height:Math.floor((aj/a0)+aM+1),"margin-top":0,"margin-left":0,opacity:1,width:Math.floor((Z/av)+aE+1)}).animate({height:height,"margin-left":marginLeft,"margin-top":marginTop,width:width,opacity:opacityOnGrid},(aI-h),aN,a4)}}})}}if(a(am).length){a(am).click(function(){if(!ag.hasClass("camerasliding")){var h=parseFloat(a(".cameraSlide.cameracurrent",b).index());clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",ae).animate({opacity:0},0);K();if(h!=0){T(h)}else{T(y)}H.onStartLoading.call(this)}})}if(a(r).length){a(r).click(function(){if(!ag.hasClass("camerasliding")){var h=parseFloat(a(".cameraSlide.cameracurrent",b).index());clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",U).animate({opacity:0},0);K();if(h==y-1){T(1)}else{T(h+2)}H.onStartLoading.call(this)}})}if(L()){D.bind("swipeleft",function(h){if(!ag.hasClass("camerasliding")){var u=parseFloat(a(".cameraSlide.cameracurrent",b).index());clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",U).animate({opacity:0},0);K();if(u==y-1){T(1)}else{T(u+2)}H.onStartLoading.call(this)}});D.bind("swiperight",function(h){if(!ag.hasClass("camerasliding")){var u=parseFloat(a(".cameraSlide.cameracurrent",b).index());clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",U).animate({opacity:0},0);K();if(u!=0){T(u)}else{T(y)}H.onStartLoading.call(this)}})}if(a(n).length){a(".camera_pag li",ae).click(function(){if(!ag.hasClass("camerasliding")){var u=parseFloat(a(this).index());var h=parseFloat(a(".cameraSlide.cameracurrent",b).index());if(u!=h){clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",U).animate({opacity:0},0);K();T(u+1);H.onStartLoading.call(this)}}})}if(a(M).length){a(".pix_thumb img",M).click(function(){if(!ag.hasClass("camerasliding")){var u=parseFloat(a(this).parents("li").index());var h=parseFloat(a(".cameracurrent",b).index());if(u!=h){clearInterval(aa);af();a("#"+q+", .camera_canvas_wrap",U).animate({opacity:0},0);a(".pix_thumb",M).removeClass("cameracurrent");a(this).parents("li").addClass("cameracurrent");K();T(u+1);I();H.onStartLoading.call(this)}}});a(".camera_thumbs_cont .camera_prevThumbs",U).hover(function(){a(this).stop(true,false).animate({opacity:1},250)},function(){a(this).stop(true,false).animate({opacity:0.7},250)});a(".camera_prevThumbs",U).click(function(){var ap=0,w=a(M).outerWidth(),h=a("ul",M).offset().left,u=a("> div",M).offset().left,aq=u-h;a(".camera_visThumb",M).each(function(){var ar=a(this).outerWidth();ap=ap+ar});if(aq-ap>0){a("ul",M).animate({"margin-left":"-"+(aq-ap)+"px"},500,z)}else{a("ul",M).animate({"margin-left":0},500,z)}});a(".camera_thumbs_cont .camera_nextThumbs",U).hover(function(){a(this).stop(true,false).animate({opacity:1},250)},function(){a(this).stop(true,false).animate({opacity:0.7},250)});a(".camera_nextThumbs",U).click(function(){var aq=0,ap=a(M).outerWidth(),h=a("ul",M).outerWidth(),u=a("ul",M).offset().left,w=a("> div",M).offset().left,ar=w-u;a(".camera_visThumb",M).each(function(){var at=a(this).outerWidth();aq=aq+at});if(ar+aq+aq<h){a("ul",M).animate({"margin-left":"-"+(ar+aq)+"px"},500,z)}else{a("ul",M).animate({"margin-left":"-"+(h-ap)+"px"},500,z)}})}}})(jQuery);(function(a){a.fn.cameraStop=function(){var b=a(this),c=a(".camera_src",b),e="pie_"+b.index();
c.addClass("stopped");if(a(".camera_showcommands").length){var d=a(".camera_thumbs_wrap",b)}else{var d=b}}})(jQuery);(function(a){a.fn.cameraPause=function(){var b=a(this);var c=a(".camera_src",b);c.addClass("paused")}})(jQuery);(function(a){a.fn.cameraResume=function(){var b=a(this);var c=a(".camera_src",b);if(typeof autoAdv==="undefined"||autoAdv!==true){c.removeClass("paused")}}})(jQuery);
/*End Components for Slideshow*/

/*Content preview coloring*/
var colorPalette= ["red","darkorange","lightorange","yellow","lightgreen","darkgreen","lightteal","darkteal","blue"];
var colorPalInd = new Object();
colorPalInd["red"] = 0;
colorPalInd["darkorange"] = 1;
colorPalInd["lightorange"] = 2;
colorPalInd["yellow"] = 3;
colorPalInd["lightgreen"] = 4;
colorPalInd["darkgreen"] = 5;
colorPalInd["lightteal"] = 6;
colorPalInd["darkteal"] = 7;
colorPalInd["blue"] = 8;


function getPageAccent(){
 if($( ".maincontain" ).hasClass( "red" )){
  return "red";
 }
 else if($( ".maincontain" ).hasClass( "darkorange" )){
  return "darkorange";
 }
 else if($( ".maincontain" ).hasClass( "lightorange" )){
  return "lightorange";
 }
 else if($( ".maincontain" ).hasClass( "yellow" )){
  return "yellow";
 }
 else if($( ".maincontain" ).hasClass( "lightgreen" )){
  return "lightgreen";
 }
 else if($( ".maincontain" ).hasClass( "darkgreen" )){
  return "darkgreen";
 }
 else if($( ".maincontain" ).hasClass( "lightteal" )){
  return "lightteal";
 }
 else if($( ".maincontain" ).hasClass( "darkteal" )){
  return "darkteal";
 }
 else if($( ".maincontain" ).hasClass( "blue" )){
  return "blue";
 }
}

function getPaletteColor(pageColor,itemIndex,columns)
{
	var newColor = pageColor;
	if(0==1)
	{
	
	}
	else
	{
		var pageColorIndex = colorPalInd[pageColor];
		var nextColor = ""; 
		var rowNum = Math.floor((itemIndex)/3)+1;
		rowNum = ((rowNum+2)%3)+1;

		if(itemIndex == 0 || itemIndex % 9 == 0 )
		{
			newColor = pageColor;
		}
		else if(itemIndex % 3 == 0) /*New Row*/
		{  
			var newcolorIndex = pageColorIndex - rowNum+1;
 
			if(newcolorIndex < 0 )
			{
				newcolorIndex = newcolorIndex +3;
			}
			newColor = colorPalette[newcolorIndex];
		}
		else
		{
			var shiftIndex = pageColorIndex - rowNum+1;
 
			if(shiftIndex < 0 )
			{
				shiftIndex = shiftIndex +3;
			}
			var newcolorIndex = shiftIndex - ((3 + itemIndex) % 3);

			if(newcolorIndex < pageColorIndex-2 || newcolorIndex < 0)
			{
				newcolorIndex = newcolorIndex + 3;
			}
			newColor = colorPalette[newcolorIndex];
		}
	}
	return newColor;
}
/*End content preview coloring*/
function filterListByCity(sel)
{
	var city = sel.options[sel.selectedIndex].value;
	if(typeof(city) != "undefined" && city != "")
	{
		document.getElementById(activeCityFilter).style.fontWeight = "normal";
		document.getElementById("jobFilter_" + city).style.fontWeight = "bold";
		var cityList = document.getElementById("jobListings");
		var cityListElem = cityList.getElementsByTagName("li");

		activeCityFilter = "jobFilter_" + city;
		for(var i=0; i < cityListElem.length; i++)
		{
			var elem = cityListElem[i];
			if(elem.className == "citytag_" + city)
			{
				elem.style.display = "";
			}
			else
			{
				elem.style.display = "none";
			}
}
	}
	else
	{
		document.getElementById(activeCityFilter).style.fontWeight = "normal";
		document.getElementById("jobFilter_AllCities").style.fontWeight = "bold";
		activeCityFilter = "jobFilter_AllCities";
		var cityList = document.getElementById("jobListings");
		var cityListElem = cityList.getElementsByTagName("li");

		for(var i=0; i < cityListElem.length; i++)
		{
			var elem = cityListElem[i];
			elem.style.display = "";
		}	
	}
}

/*Copyright (c) 2012 WebLinc LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
;(function( $ ) {
    $.fn.columnlist = function ( options ) {
        options = $.extend( {}, $.fn.columnlist.defaults, options );

        return this.each(function () {
            var
              $list     = $( this ),
              size      = options.size || $list.data( 'columnList' ) || 1,
              $children = $list.children( 'li' ),
              perColumn = Math.ceil( $children.length / size ),
              $column;
            for (var i = 0; i < size; i++) {
                $column = $('<ul />').appendTo( returnColumn( i ) );
                for ( var j = 0; j < perColumn; j++ ) {
                    if ( $children.length > i * perColumn + j ) {
                        $column.append( $children[ i * perColumn + j ]);
                    }
                }
                $list.append( $column.parent() );
            }
        });

        function returnColumn ( inc ) {
            return $('<li class="' + options.incrementClass + inc + ' ' + options[ 'class' ] + '"></li>');
        }
    };

    $.fn.columnlist.defaults = {
        'class'        : 'column-list',
        incrementClass : 'column-list-'
    };

})( jQuery );

$(document).ready(function(){
	//SIDEBAR NAV
	$(".sidenav li.has-children > .expandable span").on("click",function(){
		var parentLi = $(this).parent().parent();
		var thisExpanded = parentLi.hasClass("expanded");
		parentLi.closest(".lvl").find(".expanded").removeClass("expanded");
		//console.log(parentLi.closest(".lvl").attr("class"));
		if( !thisExpanded){
			parentLi.addClass("expanded");
		}
	});
	$(".sidenav-contain .tabletToggle").on("click",function(){
		$(this).parent().toggleClass("open");
	});
	//auto expand current path
	$(".sidenav .has-children.active-path").addClass("expanded");
	
	//FORMS
	//$( "select").selectmenu();
	
	$('body :not(script,sup,iframe,link,.nosup)').contents().filter(function() {
		return this.nodeType === 3;
	}).replaceWith(function() {
		return this.nodeValue.replace(/[®©]/g, '<sup>$&</sup>');
	});
	/*Top nav*/
	var navcolcnt = 3;
	if(typeof navcolcount !== 'undefined')
	{	
		navcolcnt = navcolcount;
	}
	$('.nav-row').columnlist({
            size : navcolcnt,
            'class' : 'nav-columns',
            incrementClass : 'nav-columns-'
    });
	
	if(typeof activeSectionId !== 'undefined' && $("#topnav-static-"+activeSectionId).length > 0)
	{
		$("#topnav-static-"+activeSectionId).addClass("active");
		$("#topnav-static-"+activeSectionId).parents("li.parent").each(function(){
		if($(this).hasClass("primary-level"))
		{
			$(this).addClass("active-top");
		}
		else{
			$(this).addClass("active");
		}
		});
	}
	else if(typeof activeSectionPath !== 'undefined')
	{
		for(index=activeSectionPath.length; index > 0; index--)
		{
			var curSectionId = activeSectionPath[index-1];
			
			if($("#topnav-"+curSectionId).length > 0)
			{
				$("#topnav-"+curSectionId).addClass("active");
				$("#topnav-"+curSectionId).parents("li.parent").each(function(){
				if($(this).hasClass("primary-level"))
				{
					$(this).addClass("active-top");
				}
				else{
					$(this).addClass("active");
				}
				});
				break;
			}
		}			
	}
	
	$("#main-menu ul li.primary-level").each(function(){
		var curP = $(this).find(".secondary-level");
		var curP2 = $(this).find(".levels");
		if((curP.length > 0 && curP.hasClass("active")) || (curP2.length > 0 && curP2.hasClass("active")))
		{
			var arrow = $(this).find(".fa-angle-left");
			if(arrow.length > 0)
			{
				arrow.addClass("active");
			}
		}
	});
	/*End top nav*/
});