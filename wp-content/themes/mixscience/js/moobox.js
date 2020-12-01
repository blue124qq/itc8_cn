/**
*
* Project : Moobox
* Version : 1.0.0
* Description : A fullscreen and adaptative mediabox
* Author : Addviso - MatthisLT
*
*/

;(function(){

var Moobox;

(function() {
	// Global variables, accessible to Moobox only
	var options, mediaArray, activeMedia, prevMedia, nextMedia, winWidth, winHeight, preload, preloadPrev = new Image(), preloadNext = new Image(), medialinks,
	// DOM elements
	wrapper, media, mediaElement, bottom, title, share, prevLink, nextLink, loadEl, fsBtn, sideMedia, mooboxClass,
	// Moobox specific vars
	URL, WH, WHL, elrel, mediaWidth, mediaHeight, inWidth, inHeight, mediaType = "none", mediaId = "mooBox", margin, marginBottom, touchDevice = false, fsSupport;

	/*	Initialization	*/
	window.addEvent("domready", function() {
		// Create and append the Moobox HTML code at the bottom of the document
		wrapper = new Element("div", {'class': "moobox-wrapper"}).setStyle("display", "none");
		document.id(document.body).adopt(wrapper);

		controls = controls = new Element("div", {'class': "moobox-controls"}).inject(wrapper, "inside").adopt(
			nextLink = new Element("button", {'class': "next"}).addEvent("click", next),
			prevLink = new Element("button", {'class': "prev"}).addEvent("click", previous),
			closeLink = new Element("button", {'class': "close"}).addEvent("click", close)
		);

		media = new Element("figure", {'class': "moobox-media"}).inject(wrapper, "inside");

		share = new Element("div", {'class': "moobox-share"}).adopt(
			shareFacebook = new Element("a", {'class': "fb",'href':"http://www.facebook.com/share.php?u="}).addEvent("click", sendSocial),
			shareTwitter = new Element("a", {'class': "tw",'href':"http://twitter.com/share?url="}).addEvent("click", sendSocial),
			shareGoogle = new Element("a", {'class': "gl",'href':"https://plus.google.com/share?url="}).addEvent("click", sendSocial)
		);

		bottom = new Element("figcaption").inject(media, "inside").adopt(
			title = new Element("div", {'class': "moobox-title"}),
			share
		);

		fsSupport = (wrapper.requestFullscreen || wrapper.mozRequestFullScreen || wrapper.webkitRequestFullScreen) ? true : false;

		if(fsSupport){
			share.adopt(new Element("button", {'class': "fullscreen"}).addEvent("click", startFullScreen));
		}

		loadEl = new Element('div', {'class':'moobox-loading'});

		if(window.Hammer !== undefined && Hammer.NO_MOUSEEVENTS){
			touchDevice = true;
			nextLink.addClass('hide');
			prevLink.addClass('hide');
			Hammer(wrapper, {prevent_mouseevents:'true', drag_block_horizontal:'true'}).on("swipeleft", next);
			Hammer(wrapper, {prevent_mouseevents:'true', drag_block_horizontal:'true'}).on("swiperight", previous);
			Hammer(wrapper, {prevent_mouseevents:'true'}).on("dragup dragdown swipeup swipedown", function(e){e.gesture.preventDefault();}); //Prevent scroll
			Hammer(wrapper).on("tap", function(e){
				e.preventDefault();
				if(controls.getStyle('opacity') == 1){
					controls.setStyle('opacity', 0);
					bottom.setStyle('opacity', 0);
				} else{
					controls.setStyle('opacity', 1);
					bottom.setStyle('opacity', 1);
				}
			});
		}
		window.MBox = Moobox;
	});

	/*	API		*/

	Moobox = {
		open: function(_mediaArray, startMedia, _options) {
			options = {
			// General overlay options
				loop: true,					// Navigate from last to first elements in a gallery
				keyboard: true,					// Enables keyboard control; escape key, left arrow, and right arrow
				keyboardAlpha: false,			// Adds 'x', 'c', 'p', and 'n' when keyboard control is also set to true
				defaultWidth: 640,				// Default width of the box (in pixels) for undefined media (MP4, FLV, etc.)
				defaultHeight: 360,				// Default height of the box (in pixels) for undefined media (MP4, FLV, etc.)
				clickBlock: true,				// Adds an event on right-click to block saving of images from the context menu in most browsers (this can't prevent other ways of downloading, but works as a casual deterent)
												// due to less than ideal code ordering, clickBlock on links must be removed manually around line 250
			// Inline options
				inlineClone: false			// Clones the inline element instead of moving it from the page to the overlay
			};

			//console.log(Browser.Platform);
			if (Browser.Platform.ios) {
				options.keyboard = false;
			}

			if (typeof _mediaArray == "string") {	// Used for single mediaArray only, with URL and Title as first two arguments
				_mediaArray = [[_mediaArray,startMedia,_options]];
				startMedia = 0;
			}

			mediaArray = _mediaArray;
			options.loop = options.loop && (mediaArray.length > 1);

			size();
			setup(true);

			mooboxClass = 'moobox-set-' + (medialinks[0].get('data-box').replace(/[\[\]|]/gi," ").split(" "))[1];
			wrapper.addClass(mooboxClass);

			wrapper.setStyle('display', 'block');
			document.id(document.body).addClass('is-overlayed');

			return changeMedia(startMedia);
		},

		close: function(){
			close();	// Thanks to Yosha on the google group for fixing the close function API!
		},

		recenter: function(){	// Thanks to Garo Hussenjian (Xapnet Productions http://www.xapnet.com) for suggesting this addition
		}
	};

	Element.implement({
		moobox: function(_options, linkMapper) {
			$$(this).moobox(_options, linkMapper);	// The processing of a single element is similar to the processing of a collection with a single element

			return this;
		}
	});

	Elements.implement({
		/*
			options:	Optional options object, see Moobox.open()
			linkMapper:	Optional function taking a link DOM element and an index as arguments and returning an array containing 3 elements:
						the image URL and the image caption (may contain HTML)
			linksFilter:Optional function taking a link DOM element and an index as arguments and returning true if the element is part of
						the image collection that will be shown on click, false if not. "this" refers to the element that was clicked.
						This function must always return true when the DOM element argument is "this".
		*/
		moobox: function(_options, linkMapper, linksFilter) {
			linkMapper = linkMapper || function(el) {
				elrel = el.getProperty('data-box').split(/[\[\]]/);
				elrel = elrel[1];
				elurl = el.getProperty('data-url');
				return [el.get('href'), el.title, elrel];	// thanks to Duan Medln for figuring out the URL bug!
			};

			linksFilter = linksFilter || function() { return true;};

			var links = this;

			/*  clickBlock code - remove the following three lines to enable right-clicking on links to images  */
			links.addEvent('contextmenu', function(e){
				if (this.toString().match(/\.gif|\.jpg|\.jpeg|\.png/i)) e.stop();
			});

			links.removeEvents("click").addEvent("click", function() {
				// Build the list of media that will be displayed
				var filteredArray = medialinks = links.filter(linksFilter, this);
				var filteredLinks = [];
				var filteredHrefs = [];

				filteredArray.each(function(item, index){
					if(filteredHrefs.indexOf(item.toString()) < 0) {
						filteredLinks.include(filteredArray[index]);
						filteredHrefs.include(filteredArray[index].toString());
					}
				});

				return Moobox.open(filteredLinks.map(linkMapper), filteredHrefs.indexOf(this.toString()), _options);
			});

			return links;
		}
	});

	/*	Internal functions	*/

	function position() {
	}

	function size() {
		winWidth = window.getWidth();
		winHeight = window.getHeight();

		if(WHL <= 1){
			media.setStyles({
				width :'',
				height : '',
				maxWidth :'',
				maxHeight : ''
			});
		}

		if(mediaElement !== undefined){
			if(mediaType == 'video'){
				media.setStyle('width', winHeight / 0.5625 + "px");
				if(mediaElement.getSize().x > winWidth){
					media.setStyle('height','');
					media.setStyle('width','100%');
				}
			}
			if(mediaType == 'img') {
				media.setStyle('max-width', inWidth + "px");

				if(winHeight < inHeight && mediaElement.getSize().y >= winHeight){
					media.setStyle('height', winHeight+"px");
					media.setStyle('width', mediaElement.getSize().x+"px");
				} else{
					media.setStyle('max-height',inHeight+"px");
				}
			}
			if(mediaType == 'url' && WHL <= 1){
				media.setStyle('width', (90 * winWidth) / 100 + "px");
				media.setStyle('height', (90 * winHeight) / 100 + "px");
			}

			if(touchDevice) share.addClass('hide');

			media.setStyle('margin-top',(winHeight - mediaElement.getSize().y) / 2 + "px" );
		}
	}

	function setup(open) {
		// Hides on-page objects and embeds while the overlay is open, nessesary to counteract Firefox stupidity
		if (Browser.firefox) {
			["object", window.ie ? "select" : "embed"].forEach(function(tag) {
				Array.forEach($$(tag), function(el) {
					if (open) el._mediabox = el.style.visibility;
					el.style.visibility = open ? "hidden" : el._mediabox;
				});
			});
		}

		var fn = open ? "addEvent" : "removeEvent";

		window[fn]("resize", size);
		if (options.keyboard) document[fn]("keydown", keyDown);
	}

	function keyDown(event) {
		if (options.keyboardAlpha) {
			switch(event.code) {
				case 27:	// Esc
				case 88:	// 'x'
				case 67:	// 'c'
					close();
					break;
				case 37:	// Left arrow
				case 80:	// 'p'
					previous();
					break;
				case 39:	// Right arrow
				case 78:	// 'n'
					next();
			}
		} else {
			switch(event.code) {
				case 27:	// Esc
					close();
					break;
				case 37:	// Left arrow
					previous();
					break;
				case 39:	// Right arrow
					next();
			}
		}
	}

	function previous() {
		return changeMedia(prevMedia, 'prev');
	}

	function next() {
		return changeMedia(nextMedia, 'next');
	}

	function changeMedia(mediaIndex, move) {
		loadEl.inject(wrapper);
		if(move === undefined) move = 'nomove';

		if (mediaIndex >= 0) {
			activeMedia = mediaIndex;
			prevMedia = ((activeMedia || !options.loop) ? activeMedia : mediaArray.length) - 1;
			nextMedia = activeMedia + 1;
			if (nextMedia == mediaArray.length) nextMedia = options.loop ? 0 : -1;
			stop();
			if (preload && mediaType == "inline" && !options.inlineClone) preload.adopt(media.getChildren());	// prevents loss of adopted data

		/*	mediaboxAdvanced link formatting and media support	*/

			if (!mediaArray[mediaIndex][2]) mediaArray[mediaIndex][2] = '';	// Thanks to Leo Feyer for offering this fix
			WH = mediaArray[mediaIndex][2].split(' ');
			WHL = WH.length;
			if (WHL>1) {
				mediaWidth = (WH[WHL-2].match("%")) ? (window.getWidth()*((WH[WHL-2].replace("%", ""))*0.01)) : WH[WHL-2];
				mediaHeight = (WH[WHL-1].match("%")) ? (window.getHeight()*((WH[WHL-1].replace("%", ""))*0.01)) : WH[WHL-1];
			} else {
				mediaWidth = "";
				mediaHeight = "";
			}
			URL = mediaArray[mediaIndex][0];

	/*	Specific Media Types	*/

// GIF, JPG, PNG
			if (URL.match(/\.gif|\.jpg|\.jpeg|\.png|twitpic\.com/i) || mediaType == 'image') {
				mediaType = 'img';
				URL = URL.replace(/twitpic\.com/i, "twitpic.com/show/full");
				preload = new Image();
				preload.onload = function(){ startEffect(move); };
				preload.src = URL;

	/*	Social Media Sites	*/

// YouTube Video (now includes HTML5 option)
			} else if (URL.match(/youtube\.com\/embed/i) || URL.match(/vimeo\.com\/video/i) || URL.match(/dailymotion\.com\/embed/i)) {
				mediaType = 'video';
				mediaWidth = window.getSize().x;
				mediaHeight = mediaWidth*0.5625;
				if(mediaHeight > window.getSize().y){
					mediaWidth = window.getSize().y / 0.5625;
					mediaHeight = mediaWidth*0.5625;
				}
				mediaId = "mediaId_"+new Date().getTime();	// Safari may not update iframe content with a static id.
				preload = new Element('div', {'class':'video-wrapper'}).adopt(
					new Element('iframe', {
						'src': URL,
						'id': mediaId
					})
				);
				startEffect(move);
// INLINE
			} else if (URL.match(/\#mb_/i)) {
				mediaType = 'inline';
				mediaWidth = mediaWidth || options.defaultWidth;
				mediaHeight = mediaHeight || options.defaultHeight;
				URLsplit = URL.split('#');
				preload = document.id(URLsplit[1]);
				startEffect(move);
// HTML (applies to ALL links not recognised as a specific media type)
			} else {
				mediaType = 'url';
				mediaWidth = mediaWidth || (90 * window.getSize().x) / 100;
				mediaHeight = mediaHeight || (90 * window.getSize().y) / 100;
				mediaId = "mediaId_"+new Date().getTime();	// Safari may not update iframe content with a static id.
				preload = new Element('iframe', {
							'src': URL,
							'id': mediaId,
							'frameborder': 0
						});
				startEffect(move);
			}
		}

		return false;
	}

	function startEffect(move) { //move = prev || next
		if(touchDevice && (mediaType == 'video' || mediaType == 'url')){
			window.open(URL, '_blank');
			close();
		} else{
			if (mediaType == "img"){
				mediaWidth = preload.width;
				mediaHeight = preload.height;
				inWidth = preload.naturalWidth || mediaWidth;
				inHeight = preload.naturalHeight || mediaHeight;
				if (options.imgBackground) {
					media.setStyles({backgroundImage: "url("+URL+")", display: ""});
				} else {	// Thanks to Dusan Medlin for fixing large 16x9 image errors in a 4x3 browser
					if (mediaHeight >= winHeight && (mediaHeight / winHeight) >= (mediaWidth / winWidth)) {
						mediaHeight = winHeight;
						mediaWidth = parseInt((mediaHeight/preload.height)*mediaWidth, 10);
					} else if (mediaWidth >= winWidth && (mediaHeight / winHeight) < (mediaWidth / winWidth)) {
						mediaWidth = winWidth;
						mediaHeight = parseInt((mediaWidth/preload.width)*mediaHeight, 10);
					}
					if (Browser.ie) preload = document.id(preload);
					if (options.clickBlock) preload.addEvent('mousedown', function(e){ e.stop(); }).addEvent('contextmenu', function(e){ e.stop(); });
					//media.setStyles({backgroundImage: "none", display: ""});
				}

			} else if (mediaType == "inline") {
				//media.setStyles({backgroundImage: "none", display: ""});
				if(options.inlineClone)
					media.grab(preload.get('html'));
				else
					media.adopt(preload.getChildren());
			} else if (mediaType == "url" || mediaType == "video") {
				//media.setStyles({backgroundImage: "none", display: ""});
			}

			wrapper.addEvent('movecomplete', finishEffect);

			if(mediaElement !== undefined){ //If not first media open > we need to make illusion of a carousel
				var media2,
					bottom2,
					share2 = share.clone(),
					title2 = title.clone().set('html', mediaArray[activeMedia][1]); //clone variables

				//Clone moobox media and append it to the moobox-wrapper (top or bottom following the move)
				bottom2 = bottom.clone(false).adopt(title2, share2);
				media2 = media.clone(false).adopt(preload, bottom2);
				if(move == 'next') media2.inject(wrapper); else media2.inject(wrapper, 'top');
				media.setStyles({width: mediaElement.getSize().x+"px", height: mediaElement.getSize().y+"px", marginTop: (winHeight - mediaElement.getSize().y)/2 + "px"});
				media2.setStyles({width: mediaWidth+"px", height: mediaHeight+"px", marginTop: (winHeight - mediaHeight)/2 + "px", maxWidth:'', maxHeight:''});

				//Define FXs for move the medias
				var myFx = new Fx.Tween(media, {
					duration: 'normal',
					transition: 'linear',
					link: 'cancel',
					property: 'left'
				});
				var myFx2 = new Fx.Tween(media2, {
					duration: 'normal',
					transition: 'linear',
					link: 'cancel',
					property: 'left'
				});
				//Distance variables
				var mediaFrom = (winWidth - mediaElement.getSize().x) / 2,
					mediaTo,
					media2From,
					media2To = (winWidth - preload.getSize().x) / 2;

				if(move == 'prev'){
					mediaTo = mediaFrom + winWidth;
					media2From = media2To - winWidth;
				}
				if(move == 'next'){
					mediaTo = mediaFrom - winWidth;
					media2From = media2To + winWidth;
				}
				//Set medias poistions
				media.setStyles({position: 'absolute', top: 0, left: mediaFrom});
				media2.setStyles({position: 'absolute', top: 0, left:  media2From});
				//Start Move
				myFx.start(mediaFrom, mediaTo);
				myFx2.start(media2From, media2To).chain(function(){
					myFx.pause();
					//Redefine clone as original media and destroy the clone and reset position
					var mediaTmp = media;
					media = media2;
					bottom = bottom2;
					title = title2;
					share2.destroy();
					share.inject(bottom);
					media.setStyles({position: '', top:'', left:''});
					mediaTmp.destroy();

					//IE 7 & 8 doesn't herit property from css
					if(Browser.ie && Browser.version < 9){
						if(media.getStyle('display') != 'block') media.setStyle('display', 'block');
						if(bottom.getStyle('position') != 'absolute') bottom.setStyles({color: '#fff', width: '100%', padding: '3%', position: 'absolute', bottom: 0, left: 0});
					}

					wrapper.fireEvent('movecomplete');
				});
			} else{
				preload.inject(media);
				media.setStyles({width: mediaWidth+"px", height: mediaHeight+"px", marginTop: (winHeight - mediaHeight)/2 + "px", maxWidth:'', maxHeight:''});
				title.set('html', mediaArray[activeMedia][1]);
				wrapper.fireEvent('movecomplete');
			}
		}
	}

	function finishEffect(){
		mediaElement = preload;

		share.getElements('a').each(function(item, index){
			var baseurl = item.get('href').split('=');
			item.set('href', baseurl[0] + '=' + encodeURIComponent(medialinks[activeMedia].get('data-url')));
		});

		if ((prevMedia >= 0) && (mediaArray[prevMedia][0].match(/\.gif|\.jpg|\.jpeg|\.png|twitpic\.com/i))) preloadPrev.src = mediaArray[prevMedia][0].replace(/twitpic\.com/i, "twitpic.com/show/full");
		if ((nextMedia >= 0) && (mediaArray[nextMedia][0].match(/\.gif|\.jpg|\.jpeg|\.png|twitpic\.com/i))) preloadNext.src = mediaArray[nextMedia][0].replace(/twitpic\.com/i, "twitpic.com/show/full");
		if(!touchDevice && prevMedia < 0) prevLink.addClass('hide');
		if(!touchDevice && prevMedia >= 0) prevLink.removeClass('hide');
		if(!touchDevice && nextMedia < 0) nextLink.addClass('hide');
		if(!touchDevice && nextMedia >= 0) nextLink.removeClass('hide');

		//Show caption
		if(medialinks[activeMedia].getProperty('data-show-caption') == 'false' || mediaType == 'video')
			bottom.addClass('hide');
		else
			bottom.removeClass('hide');
		//Show share options
		if(medialinks[activeMedia].getProperty('data-url') === undefined)
			share.addClass('hide');
		else if(!touchDevice)
			share.removeClass('hide');

		loadEl.dispose();
	}

	function mediaAnimate() {
	}

	function captionAnimate() {
	}

	function stop() {
		if (preload) {
			if (mediaType == "inline" && !options.inlineClone) preload.adopt(media.getChildren());	// prevents loss of adopted data
			preload.onload = function(){}; // $empty replacement
		}
	}

	function close() {
		if (activeMedia >= 0) {
			if(mediaElement !== undefined){
				if (mediaType == "inline" && !options.inlineClone) preload.adopt(media.getChildren());	// prevents loss of adopted data
				preload.onload = function(){}; // $empty replacement
				mediaElement.destroy();
				mediaElement = undefined;
			}
			wrapper.setStyle("display", "none");
			document.id(document.body).removeClass('is-overlayed');
		}
		wrapper.removeClass(mooboxClass);
		if(fsSupport) exitFullScreen();
		return false;
	}

	function sendSocial(e){
		e.stop();
		window.open(this.get('href'));
	}

	function startFullScreen(){
		if (wrapper.requestFullscreen) {
			wrapper.requestFullscreen();
		}
		else if (wrapper.mozRequestFullScreen) {
			wrapper.mozRequestFullScreen();
		}
		else if (wrapper.webkitRequestFullScreen) {
			wrapper.webkitRequestFullScreen();
		}
	}

	function exitFullScreen(){
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}

})();

/*	Autoload code block	*/
Moobox.scanPage = function() {
	var links = $$("a").filter(function(el) {
		var pics;
		return el.getProperty('data-box') && el.getProperty('data-box').test(/^lightbox/i);
	});
	links.moobox({/* Put custom options here */}, null, function(el) {
		var rel0 = this.getProperty('data-box').replace(/[\[\]|]/gi," ");
		var relsize = rel0.split(" ");
		var relsearch = "\\["+relsize[1]+"[ \\]]";
		var relregexp = new RegExp(relsearch);
		return (this == el) || ((this.getProperty('data-box').length > 8) && el.getProperty('data-box').match(relregexp));
	});
};

window.addEvents({domready: Moobox.scanPage, resize: Moobox.recenter}); // to recenter the overlay while scrolling, add "scroll: Moobox.recenter" to the object

})();
