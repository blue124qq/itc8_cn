//=========================================//
// ADDVISO Slider                          //
//=========================================//
// Author : Bhr - Addviso                  //
// Version : 1.2                           //
//=========================================//
var addSlide = new Class({

	startTime: function() {
		this.timer = this.next.periodical(this.timeAutoplay, this);
	},

	stopTimer: function() {
		clearInterval(this.timer);
	},

	initialize: function(params){

		this.timeAutoplay = params.timeAutoplay || 3000;
		this.enabledAutoplay = params.enabledAutoplay || false;
		this.timer = null;
		this.i = 0;
		this.items = params.items;
		this.type = params.type || 'left';
		this.nbr = params.items.length;
		this.size = params.size;
		this.box = params.box;
		this.currentIndex = 0;
		this.btnPrevious = params.btnPrevious;
		this.btnNext = params.btnNext;
		this.responsive = params.responsive || 'false';
		this.responsiveSize = params.responsiveSize || 'false';
		this.responsiveSizeWidth = params.responsiveSizeWidth || 'false';
		if(this.box[0] !== undefined) {

			this.box.set('style', this.type+':0;position: relative;');

			this.btnPrevious.addEvent('click', this.eventPrevious.bind(this));
			this.btnNext.addEvent('click', this.eventNext.bind(this));

			if(this.responsive) {
				window.addEvent('resize', function() {
					this.makeItResponsive();
				}.bind(this));
				this.makeItResponsive();
			}

			if(this.enabledAutoplay)
				this.startTime();
		}
	},

	makeItResponsive: function() {
		this.stopTimer();
		this.box.set('style', this.type+':0;');
		this.currentIndex = 0;

		if(this.responsiveSizeWidth) {
			this.size = this.responsiveSize.getSize()[0].x;
		} else {
			this.size = this.responsiveSize.getSize()[0].y;
		}
	},

	eventPrevious: function(event) {
		event.stop();
		this.stopTimer();
		this.startTime();

		this.currentIndex--;
		if(this.currentIndex < 0)
			this.currentIndex = this.nbr - 1;

		this.render();

	},

	next: function() {
		this.currentIndex++;
		if(this.currentIndex == this.nbr)
			this.currentIndex = 0;

		this.render();
	},

	eventNext: function(event) {
		event.stop();
		this.next();
		this.stopTimer();
		this.startTime();
	},

	render: function() {
		var cal = -this.currentIndex * this.size;

		this.box.setStyle(this.type, cal+'px');
	}

});

(function(){

window.addEvent('domready',init);
window.addEvent('resize',initNavigation);

function init (){

    var lang = document.getElement('html').get('lang').substr(0, 2);
    window.tarteaucitronForceLanguage = (lang === 'vi' || lang === 'pl')?'en':lang;
    tarteaucitron.init({
      "hashtag": "#tac",
      "highPrivacy": false,
      "orientation": "bottom",
      "adblocker": false,
      "showAlertSmall": false,
      "cookieslist": true,
      "removeCredit": true
    });

    tarteaucitron.user.gajsUa = "UA-53086833-1";
    (tarteaucitron.job = tarteaucitron.job || []).push("gajs");

	/*==================================
	=            Navigation            =
	==================================*/

	resetNavigation();
	initNavigation();

	/*-----  End of Navigation  ------*/


	/*===============================
	=            Sliders            =
	===============================*/

	/*==========  Home  ===========*/
	var slidersHomeActivites = new addSlide({
		box: $$('.section-une-move'),
		items: $$('.section-une-item'),
		size: 940,
		type: 'left',
		btnPrevious: $$('.section-une-btn.left'),
		btnNext: $$('.section-une-btn.right'),
		enabledAutoplay: true,
		responsive: true,
		timeAutoplay: 7000,
		responsiveSize: $$('.section-une-mask'),
		responsiveSizeWidth: true
	});


	/*-----  End of Sliders  ------*/

	/*===================================
	=            ContactForm            =
	===================================*/
	$$('.contactform-show').addEvent('click', function(el) {
		el.preventDefault();
		$('lboverlay').setStyle('display', 'block');
		$('lbcontact').setStyle('display', 'block');
		window.scrollTo(0,0);
	});

	var lbcontactclose = function() {
		$('lboverlay').setStyle('display', 'none');
		$('lbcontact').setStyle('display', 'none');
	};
	window.lbcontactclose = lbcontactclose;
	/*-----  End of ContactForm  ------*/

}

function resetNavigation() {
	$$('.show').removeClass('show');
	$$('.tabshow').removeClass('tabshow');
	$$('.showmobile').removeClass('showmobile');
	$$('.showmobilemob').removeClass('showmobilemob');


	$$('li.menu-item-level1 a.menu-link-lvl-1').removeEvents();
	$$('.bigsubnav').removeEvents();
	$$('a.showmenu').removeEvents();
}

function initNavigation() {

	// ResetNavigation
	resetNavigation();
	var sizeDevice = $('body').getSize().x;
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	// Init vars
	var savepageid = 0;
	var savepagemobileid = 0;
	var tabpicshow = false;
	var tabbigsubnavshow = false;

	// Navigation Phone
	if(sizeDevice <= 940) {

		$$('a.showmenu').addEvent('click', function(el) {
			el.preventDefault();
			var pic = this.getElements('span.pic-menu');

			if(tabpicshow === true) {
				pic.removeClass('show');
				$$('#header nav').removeClass('tabshow');
				$$('.bigsubnav').removeClass('showmobile');
				$$('.bigsubnav'+savepagemobileid).removeClass('showmobile');
				$$('.sub-menu').removeClass('showmobilemob');
				savepagemobileid = 0;
				tabpicshow = false;
				tabbigsubnavshow = false;
			} else {
				pic.addClass('show');
				$$('#header nav').addClass('tabshow');
				tabpicshow = true;
			}
		});


		$$('li.menu-item-level1.item-has-children a.menu-link-lvl-1').addEvent('click', function(el) {
			el.preventDefault();
			var parent = this.getParent();

			if(parent.getElements('.menu.level2').hasClass('showmobilemob')[0] === false) {
				$$('.menu.level2.showmobilemob').removeClass('showmobilemob');
				parent.getElements('.menu.level2').toggleClass('showmobilemob');
			} else {
				$$('.menu.level2.showmobilemob').removeClass('showmobilemob');
			}

			$$('.menu.level3.showmobilemob').removeClass('showmobilemob');
			$$('li.menu-item-level2.deploy-state').removeClass('deploy-state');
		});

		$$('li.menu-item-level2.item-has-children a.menu-link-lvl-2').addEvent('click', function(el) {
			el.preventDefault();
			var parent = this.getParent();

			if(parent.getElements('.menu.level3').hasClass('showmobilemob')[0] === false) {
				$$('.menu.level3.showmobilemob').removeClass('showmobilemob');
				parent.getElements('.menu.level3').addClass('showmobilemob');
				parent.addClass('deploy-state');
				if(parent.getPrevious()) {
					parent.getPrevious().removeClass('deploy-state');
				}
				if(parent.getNext()) {
					parent.getNext().addClass('deploy-state');
				}
			} else {
				$$('.menu.level3.showmobilemob').removeClass('showmobilemob');
				parent.removeClass('deploy-state');
				if(parent.getNext()) {
					parent.getNext().removeClass('deploy-state');
				}
			}
		});


	// Navigation Tablette
	} else if((sizeDevice > 755 && sizeDevice <= 1024) || isiPad) {

		$$('a.showmenu').addEvent('click', function(el) {
			el.preventDefault();
			var pic = this.getElements('span.pic-menu');

			if(tabpicshow === true) {
				pic.removeClass('show');
				$$('#header nav').removeClass('tabshow');
				$$('.bigsubnav').removeClass('showmobile');
				$$('.bigsubnav'+savepagemobileid).removeClass('showmobile');
				$$('.sub-menu').removeClass('showmobilemob');
				savepagemobileid = 0;
				tabpicshow = false;
				tabbigsubnavshow = false;
			} else {
				pic.addClass('show');
				$$('#header nav').addClass('tabshow');
				tabpicshow = true;
			}
		});

		$$('li.menu-item-level1.item-has-children a.menu-link-lvl-1').addEvent('click', function(el) {
			el.preventDefault();

			var pageid = this.get('data-pageid');

			if(savepagemobileid == pageid && tabbigsubnavshow) {
				$$('.bigsubnav').removeClass('showmobile');
				$('bigsubnav'+pageid).removeClass('showmobile');
				tabbigsubnavshow = false;
			} else {
				if(savepagemobileid != 0) {
					$('bigsubnav'+savepagemobileid).removeClass('showmobile');
				}
				savepagemobileid = pageid;
				$$('.bigsubnav').addClass('showmobile');
				$('bigsubnav'+pageid).addClass('showmobile');
				tabbigsubnavshow = true;
			}
		});



	// Navigation Desktop
	} else {

		$$('li.menu-item-level1 a.menu-link-lvl-1').addEvent('mouseenter', function() {
			var pageid = this.get('data-pageid');
			if($('bigsubnav'+pageid)) {
				savepageid = pageid;
				$$('.bigsubnav').addClass('show');
				$('bigsubnav'+pageid).addClass('show');
			}
		});
		$$('.bigsubnav').addEvent('mouseenter', function() {
			$$('.bigsubnav-item').removeClass('show');
			$('bigsubnav'+savepageid).addClass('show');
			$$('.bigsubnav').addClass('show');
		});
		$$('li.menu-item-level1 a.menu-link-lvl-1').addEvent('mouseleave', function() {
			var pageid = this.get('data-pageid');
			if($('bigsubnav'+pageid)) {
				$$('.bigsubnav').removeClass('show');
				$('bigsubnav'+pageid).removeClass('show');
				pageid = 0;
			}
		});
		$$('.bigsubnav').addEvent('mouseleave', function() {
			$('bigsubnav'+savepageid).removeClass('show');
			$$('.bigsubnav').removeClass('show');
		});

	}

	// Init autosize bigsubitem
	$$('.bigsubnav-item').each(function(el) {
		var nbElts = el.getElements('.bigsubnav-item-subitem').length;
		var calc = 0;

		if(nbElts != 0)
			calc = 100 / nbElts;

		el.addClass('nb'+nbElts);

		el.getElements('.bigsubnav-item-subitem').each(function(subel) {
			subel.setStyle('width', calc+'%');
		});

	});

	/*-----  End of Navigation  ------*/
}

})();





/* Cache system */
window.addEvent('domready', function() {
	if(Cookie.read('offlineEnabled')) {
		$('cache_btn').set('html','<s>C</s>');
		$('cache_status').setStyle('display','inline-block');
	} else {
		$('cache_btn').set('html','C');
		$$('.cache_loadbar').setStyle('height','0px');
	}

	$('cache_btn').addEvent('click', function() {

		if(Cookie.read('offlineEnabled'))
			Cookie.dispose('offlineEnabled');
		else
			Cookie.write('offlineEnabled', 'true');

		document.location.reload(true);

	});

	function isOnline(no){
		var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
		xhr.onerror = function(){
			if(no instanceof Function){
				no();
			}
		}
		xhr.open("GET","/onlinecheck.php",true);
		xhr.send();
	}

	isOnline(
		function(){
			$('cache_btn').remove();
			$('cache_offline').setStyle('display','inline-block');
			$('cache_status').setStyle('display','none');
		}
	);

	if (window.applicationCache)
	{
	   var oAppCache = window.applicationCache;
		oAppCache.addEventListener('cached', function(event) {
			$('cache_status').set('src','/wp-content/themes/mixscience/images/cache_ok.png');
			$$('.cache_loadbar').setStyle('height', '0px');
		}, false);
		oAppCache.addEventListener('noupdate', function(event) {
			$('cache_status').set('src','/wp-content/themes/mixscience/images/cache_ok.png');
			$$('.cache_loadbar').setStyle('height', '0px');
		}, false);
		oAppCache.addEventListener('updateready', function(event) {
			document.location.reload(true);
		}, false);
		oAppCache.addEventListener('obsolete', function(event) {
			document.location.reload(true);
		}, false);

		oAppCache.addEventListener('progress', function(e) {
			var prog = Math.round(e.loaded / e.total * 100);
			// console.log(prog);
			// console.log(e);
			$$('.cache_loadbar').set('style', 'width: '+ Math.round(e.loaded / e.total * 100)+'%;height:3px;');
		}, false);
	}
});
