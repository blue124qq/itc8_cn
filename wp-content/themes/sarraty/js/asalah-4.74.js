jQuery(document).ready(function ($) {
	if (jQuery('.progress_container.progress_striped').length) {
		jQuery('.progress_container.progress_striped .progress').addClass('progress-striped');
	}
	if (jQuery('.progress_container.progress_animated').length) {
		jQuery('.progress_container.progress_animated .progress').addClass('progress-striped');
		jQuery('.progress_container.progress_animated .progress').addClass('active');
	}

	jQuery.fn.fadeDelay = function () {
		var delay = 0;
		return this.each(function () {
			$(this).delay(delay).fadeTo(1100, 1);
			delay += 420;
		});
	};

	/* start expanded search jquery */
	jQuery(".header_info .search .input-group .btn ").click(function () {
		jQuery(".header_info .search").addClass("expanded_search");
		jQuery(".header_info .search.expanded_search .input-group input[type='text'].form-control").focus();
	});
	/* activate this as an option not as default.

	/* start sicky header */
	jQuery(window).scroll(function () {
		var scrolling = jQuery(window).scrollTop();
		var main_navbar_offset = jQuery('.header_top').height();
		if (scrolling > main_navbar_offset) {
			jQuery('.site_header').stop().addClass('sticky_header');
			jQuery('.header_top').stop().removeClass('fadeIn');
			jQuery('.header_top').stop().addClass('animated fadeOutUp');
			jQuery('.gototop').stop().removeClass('fadeOutDown');
			jQuery('.gototop').stop().addClass('animated fadeInUp');
		} else if (scrolling < main_navbar_offset) {
			jQuery('.site_header').removeClass('sticky_header');
			jQuery('.header_top').stop().removeClass(' fadeOutUp');
			jQuery('.header_top').stop().addClass('fadeIn');
			jQuery('.gototop').stop().removeClass('fadeInUp');
			jQuery('.gototop').stop().addClass('fadeOutDown');
		}
	});
	jQuery(window).load(function () {
		var scrolling = jQuery(window).scrollTop();
		var main_navbar_offset = jQuery('.header_top').height();
		if (scrolling > main_navbar_offset) {
			jQuery('.site_header').stop().addClass('sticky_header');
			jQuery('.header_top').stop().removeClass('fadeIn');
			jQuery('.header_top').stop().addClass('animated fadeOutUp');
		} else if (scrolling < main_navbar_offset) {
			jQuery('.site_header').removeClass('sticky_header');
			jQuery('.header_top').stop().removeClass(' fadeOutUp');
			jQuery('.header_top').stop().addClass('fadeIn');
		}
	});
	/* end sticky header */

	jQuery('.invisible_header').css('min-height', jQuery('.site_header').height());
	// apply fitvids to all video banners
	// jQuery(".video_fit_container").fitVids();
	// start go to top button
	jQuery('.gototop').click(function () {
		jQuery('html, body').animate({
			scrollTop: '0px'
		}, 800);
		return false;
	});

	function asalah_mobile_menu () {
		if (jQuery(window).width() > 992) {
			jQuery('.main_navbar li .dropdown-menu').slideUp();
			jQuery('.main_navbar li.opened').removeClass('opened');
			jQuery('.main_navbar li a i.icon-up-open').removeClass('icon-up-open').addClass('icon-down-open');
			jQuery('.main_navbar').removeClass('mobile_menu').addClass('desktop_menu');
			jQuery('.header_content').removeClass('mobile_menu_opened');
		} else {
			jQuery('.main_navbar').addClass('mobile_menu');
			jQuery(".main_navbar .dropdown > a, .main_navbar .dropdown-submenu > a, .main_navbar a.dropdown-toggle").each(function () {
				if (jQuery(this).next().length > 0) {
					jQuery(this).addClass("mobile_menu_parent");
				};
			});
			if (jQuery('.main_navbar').hasClass('desktop_menu') && jQuery('.mobile_menu_parent .mobile_dropdown_arrow').length === 0) {
				jQuery('<span class="mobile_dropdown_arrow"><i class="icon-down-open"></i></span>').appendTo('.main_navbar li a.mobile_menu_parent');
				jQuery('.main_navbar').removeClass('desktop_menu').addClass('mobile_menu');
			}
		}
	}

	asalah_mobile_menu();
	jQuery(window).resize(function () {
		asalah_mobile_menu();
	});
});
var custom_click_event = jQuery.support.touch ? "tap" : "click";
jQuery(".main_navbar").on(custom_click_event, '.mobile_dropdown_arrow', function (event) {
	event.preventDefault();
	event.stopPropagation();
	var parent = jQuery(this).parent();
	var grandparent = parent.parent();
	var icon = jQuery(this).find('i');
	if (parent.hasClass('opened')) {
		grandparent.find('>.dropdown-menu').slideUp(200);
		icon.removeClass('icon-up-open');
		icon.addClass('icon-down-open');
		grandparent.removeClass('open');
		parent.removeClass('opened');
	} else {
		grandparent.find('> .dropdown-menu').show(200);
		icon.removeClass('icon-down-open');
		icon.addClass('icon-up-open');
		grandparent.addClass('open');
		parent.addClass('opened');
	}
});
/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies?: Twitter Bootstrap's Dropdown plugin
 *
 * A simple plugin to enable twitter bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * No license, do what you want. I'd love credit or a shoutout, though.
 *
 * http:// cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
 */
;
(function ($, window, undefined) {
	// outside the scope of the jQuery plugin to
	// keep track of all dropdowns
	var $allDropdowns = $();
	// if instantlyCloseOthers is true, then it will instantly
	// shut other nav items when a new one is hovered over
	$.fn.dropdownHover = function (options) {
		// the element we really care about
		// is the dropdown-toggle's parent
		$allDropdowns = $allDropdowns.add(this.parent());
		return this.each(function () {
			var $this = $(this).parent(),
				defaults = {
					delay: 500,
					instantlyCloseOthers: true
				},
				data = {
					delay: $(this).data('delay'),
					instantlyCloseOthers: $(this).data('close-others')
				},
				settings = $.extend(true, {}, defaults, options, data),
				timeout;

			$this.hover(function () {

				if (jQuery(window).width() > 992) {
					if (settings.instantlyCloseOthers === true) {
						$allDropdowns.removeClass('open');
						// $allDropdowns.removeClass('opened');
						// $allDropdowns.find('.mobile_dropdown_arrow i').removeClass('icon-up-open').addClass('icon-down-open');
						$allDropdowns.children('.dropdown-menu').slideUp(50);
						// $allDropdowns.children('.dropdown-menu').css({ display: "none", overflow: "hidden" });
						// $allDropdowns.children('.dropdown-menu').stop().animate({ 'max-height': '100%' }, { queue: false, duration: 50, easing: 'jswing' });
					}

					window.clearTimeout(timeout);
					$('> .dropdown-menu', this).slideDown(0);
					$(this).addClass('open');
					// $(this).children('.dropdown-menu').css({ display: "block", overflow: "hidden" });
					// $(this).children('.dropdown-menu').stop().animate({ 'max-height': '100%' }, { queue: false, duration: 50, easing: 'jswing' });
				}
			}, function () {
				timeout = window.setTimeout(function () {
					if (jQuery(window).width() > 992) {
						$this.removeClass('open');

						$this.children('.dropdown-menu').slideUp(0);
						$this.children('.mobile_dropdown_arrow i').removeClass('icon-down-open').addClass('icon-up-open');
						$this.children('.dropdown-menu').css({ display: "none", overflow: "hidden" });
						// $this.children('.dropdown-menu').stop().animate({ 'max-height': '0' }, { queue: false, duration: 50, easing: 'jswing' });
						// $this.children('.dropdown-menu').css({ 'max-height': 'max-content'});
					}
				}, settings.delay);
			});
			$this.children('.dropdown-menu').find('.dropdown-submenu').hover(function () {
				$(this).parent().css({
					overflow: "visible"
				});
			});
		});
	};

	// apply dropdownHover to all elements with the data-hover="dropdown" attribute
	$(document).ready(function () {
		$('[data-hover="dropdown"]').dropdownHover();
	});
})(jQuery, this);
