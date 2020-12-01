window.COOKIE_CONTROLLER = window.COOKIE_CONTROLLER || (function () {
    'use strict'
    var defaults = {
		imageClass: 'ccm-image',
        scriptClass: 'ccm-script',
        iframeClass: 'ccm-iframe',
		videoClass: 'ccm-video',
        iframesPlaceholder: false,
        iframesPlaceholderHTML:

            document.getElementById('ccm-iframePlaceholder-html') !== null ?

                document.getElementById('ccm-iframePlaceholder-html').innerHTML :

                '<p>To view this content you need to Enable Cookies'
                +'</p>',

        iframesPlaceholderClass: 'ccm-iframe-placeholder'
    },
    opts;

	var fullConsent = [1,2,3];
	var requiredConsent = [1];
	
    function _extend() {

        var i, key;
        for (i=1; i<arguments.length; i++)
            for (key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];

    }

    function _hasClass(el, cls) {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
	
	function checkConsentLevels(consent, clevel) {
        return	((clevel.length == 1 && consent.indexOf(parseInt(clevel[0])) > -1)||(clevel.length == 2 && consent.indexOf(parseInt(clevel[0])) > -1 && consent.indexOf(parseInt(clevel[1])) > -1)||(clevel.length == 3 && consent.indexOf(parseInt(clevel[0])) > -1 && consent.indexOf(parseInt(clevel[1])) > -1 && consent.indexOf(parseInt(clevel[2])) > -1));
    }
	
	RegExp.escape = function(string) {
	  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
	};

    var init = function(options) {

        opts = _extend({}, defaults, options);

    };
	
	var processConsent = function(curConsent) {
        if (curConsent.length > 0) 
		{
			images.get(curConsent);
			iframes.get(curConsent);
			videos.get(curConsent);
			scripts.get(curConsent); /*scripts last*/
		}
    };

   var images = (function() {

        function get(consent) {

            var images = document.getElementsByClassName(opts.imageClass),
                n = images.length,
                src, clevel, image, i;

            for (i = 0; i < n; i++){

                image = images[i];
                src = image.attributes[ 'data-ccm-src' ].value;
				clevel = image.attributes[ 'data-ccm-level' ].value;
				clevel = clevel.split(",");		
				if (checkConsentLevels(consent, clevel)) { 
					image.src = src;
					image.style.display = 'block';
				}
            }
			var classRemove = new RegExp("\\b" + RegExp.escape(opts.imageClass) + "\\b","g")
			var toUpdate = [];
			for(i = 0; i < n; i++){
				clevel = images[i].attributes[ 'data-ccm-level' ].value; 
				clevel = clevel.split(",");		
				if (checkConsentLevels(consent, clevel)) { 
					toUpdate.push(images[i]);
				}
			}
			for(i = 0; i < toUpdate.length; i++){
				toUpdate[i].className = toUpdate[i].className.replace(classRemove, "");
			}
        }

        return{
            get: get
        }
    })();

    var iframes = (function() {

        function makePlaceholder(iframe) {

            var placeholderElement = document.createElement('div');
            placeholderElement.className = opts.iframesPlaceholderClass;
            placeholderElement.innerHTML = opts.iframesPlaceholderHTML;
            iframe.parentNode.insertBefore(placeholderElement, iframe);

        }

        function removePlaceholders() {

            var iframePlaceholders = document.getElementsByClassName(opts.iframesPlaceholderClass),
                n = iframePlaceholders.length,
                i;

            for (i = n - 1; i >= 0; i--){
                iframePlaceholders[i].parentNode.removeChild(iframePlaceholders[i]);
                
            }

        }

        function hide() {

            var iframes = document.getElementsByClassName(opts.iframeClass),
                n = iframes.length,
                src, iframe, i;

            for (i = 0; i < n; i++){

                iframe = iframes[i];
                iframe.style.display = 'none';

                if (opts.iframesPlaceholder) makePlaceholder(iframe);

            }

        }

        function get(consent) {

            var iframes = document.getElementsByClassName(opts.iframeClass),
                n = iframes.length,
                src, clevel, iframe, i;

            for (i = 0; i < n; i++){

                iframe = iframes[i];

                src = iframe.attributes[ 'data-ccm-src' ].value;
				clevel = iframe.attributes[ 'data-ccm-level' ].value;
				clevel = clevel.split(",");		
				if (checkConsentLevels(consent, clevel)) { 
					iframe.src = src;
					iframe.style.display = 'block';
				}

            }
			var classRemove = new RegExp("\\b" + RegExp.escape(opts.iframeClass) + "\\b","g")
			var toUpdate = [];
			for(i = 0; i < n; i++){
				clevel = iframes[i].attributes[ 'data-ccm-level' ].value; 
				clevel = clevel.split(",");		
				if (checkConsentLevels(consent, clevel)) { 
					toUpdate.push(iframes[i]);
				}
			}
			for(i = 0; i < toUpdate.length; i++){
				toUpdate[i].className = toUpdate[i].className.replace(classRemove, "");
			}
        }

        return{
            hide: hide,
            get: get,
            removePlaceholders: removePlaceholders
        }

    })();

    var scripts = (function() {

        function get(consent) {

            var scripts = document.getElementsByClassName(opts.scriptClass),
                n = scripts.length,
                documentFragment = document.createDocumentFragment(),
                i, y, s, attrib, clevel, el;

            for (i = 0; i < n; i++){
				clevel = scripts[i].attributes[ 'data-ccm-level' ].value;  
				clevel = clevel.split(",");		
				if (checkConsentLevels(consent, clevel)) { 
					if (scripts[i].hasAttribute('data-ccm-src')){

						if (typeof postscribe !== "undefined"){
							postscribe(scripts[i].parentNode, '<scr'+'ipt src="' + scripts[i].getAttribute("data-ccm-src") + '"></scr'+'ipt>');
						}
						else {
							var resource = document.createElement('script'); 
							if(typeof scripts[i].hasAttribute("async")){
								resource.async = true;
							}
							else{
								resource.async = false;
							}
							
							var script = document.getElementsByTagName('script')[0];
							script.parentNode.insertBefore(resource, script);
							
							if(scripts[i].hasAttribute('id')){
								resource.id = scripts[i].getAttribute("id") + "-new-js";
								if(resource.readyState) {
									resource.onreadystatechange = function() {
										if ( resource.readyState === "loaded" || resource.readyState === "complete" ) {
											resource.onreadystatechange = null;
											var event;
											if(typeof(CustomEvent) === 'function') {
												event = new CustomEvent(this.id, {detail: { name: this.id }});
											}else{
												event = document.createEvent("CustomEvent");
												event.initCustomEvent(this.id, true, true, { name: this.id });
											}
											window.dispatchEvent(event);
										}
									};
								} else {
									resource.onload = function() {
										var event;
										if(typeof(CustomEvent) === 'function') {
											event = new CustomEvent(this.id, {detail: { name: this.id }});
										}else{
											event = document.createEvent("CustomEvent");
											event.initCustomEvent(this.id, true, true, { name: this.id });
										}
										window.dispatchEvent(event);
										
									};
								}
							}
							resource.src = scripts[i].getAttribute("data-ccm-src");
						}
					} else {

						s = document.createElement('script');
						s.type = 'text/javascript';
						for (y = 0; y < scripts[i].attributes.length; y++) {
							attrib = scripts[i].attributes[y];
							if (attrib.specified) {
								if ((attrib.name != 'type') && (attrib.name != 'class') && (attrib.name != 'data-ccm-level')){
									s.setAttribute(attrib.name, attrib.value);
								}
							}
						} 
						if(typeof scripts[i].hasAttribute("data-ccm-dependent") !== "undefined" && scripts[i].getAttribute("data-ccm-dependent") != null)
						{
							s.id = scripts[i].attributes[ 'data-ccm-dependent' ].value + "-new-jsdependent"
							window.addEventListener(scripts[i].attributes[ 'data-ccm-dependent' ].value + "-new-js", function(event) {
								var depScripts = document.getElementsByClassName(event.detail.name.replace("-new-js","") + "-jsdependent")
								var documentFragmentDep = document.createDocumentFragment();
								for (var k = 0; k < depScripts.length; k++){
									var s = document.createElement('script');
									s.type = 'text/javascript';
									s.innerHTML = depScripts[k].innerHTML;
									depScripts[k].innerHTML = "";
									documentFragmentDep.appendChild(s);
								}
								document.body.appendChild(documentFragmentDep);
							  });
						}
						else
						{
							s.innerHTML = scripts[i].innerHTML;	
							documentFragment.appendChild(s);
						}
					}
				}
            }
			var classRemove = new RegExp("\\b" + RegExp.escape(opts.scriptClass) + "\\b","g")
			var toUpdate = [];
			for(i = 0; i < n; i++){
				clevel = scripts[i].attributes[ 'data-ccm-level' ].value; 
				clevel = clevel.split(",");		 
				if (checkConsentLevels(consent, clevel)) { 
					toUpdate.push(scripts[i]);
				}
			}
			for(i = 0; i < toUpdate.length; i++){
				toUpdate[i].className = toUpdate[i].className.replace(classRemove, "");
			}
            document.body.appendChild(documentFragment);

        }

        return{
            get: get
        }

    })();

	var videos = (function() {

        function get(consent) {

            var videos = document.getElementsByClassName(opts.videoClass),
                n = videos.length,
                href='', src='', clevel, video, i;

            for (i = 0; i < n; i++){
                video = videos[i];
				clevel = video.attributes[ 'data-ccm-level' ].value;
				clevel = clevel.split(",");	
				if (video.hasAttribute('data-ccm-src')){
					src = video.attributes[ 'data-ccm-src' ].value;
				}
				if (video.hasAttribute('data-ccm-href')){
					href = video.attributes[ 'data-ccm-href' ].value;
				}
				if (checkConsentLevels(consent, clevel)) { 
					if(video.nodeName && video.nodeName.toLowerCase() === 'a')
					{
						if(video.hasAttribute('href') && video.href.indexOf(".youtube") > -1)
						{
							video.href = video.href.replace(".youtube-nocookie.com",".youtube.com");
						}
						else if(href.indexOf(".brightcove.") > -1)
						{
							video.href = href;
						}
					}
					else if(video.nodeName && video.nodeName.toLowerCase() === 'iframe')
					{
						if(video.hasAttribute('src') && video.src.indexOf(".youtube") > -1)
						{
							video.src = video.src.replace(".youtube-nocookie.com",".youtube.com");
						}
						else if(src.indexOf(".brightcove.") > -1)
						{
							video.src = src;
						}
					}
				}
            }
			var classRemove = new RegExp("\\b" + RegExp.escape(opts.videoClass) + "\\b","g")
			var toUpdate = [];
			for(i = 0; i < n; i++){
				clevel = videos[i].attributes[ 'data-ccm-level' ].value; 
				clevel = clevel.split(",");		
				if (checkConsentLevels(consent, clevel)) { 
					toUpdate.push(videos[i]);
				}
			}
			for(i = 0; i < toUpdate.length; i++){
				toUpdate[i].className = toUpdate[i].className.replace(classRemove, "");
			}
        }

        return{
            get: get
        }
    })();

    return {
        init: init,
		processConsent: processConsent
    };

}());
var tarcLoaded = false;
var tarcProcessed = false;
var tarcInitCheck = false;
function handleTArcConsent(e){
	if((e.origin.indexOf("consent-pref.trustarc.com") > -1) || (e.origin.indexOf(window.location.protocol + "//" + window.location.hostname) == 0))
	{
		if (typeof e !== 'undefined'  && typeof e.data !== 'undefined')
		{
			try {
				var json = JSON.parse(e.data); 
				if (json && json.source == "preference_manager" && json.message && json.message == "submit_preferences")  
				{ 
					var arr = json.data;
					if (typeof arr.value !== 'undefined')
					{
						arr = arr.value;
					}
					arr = arr.split(',').map(function(item) {return parseInt(item);});
					arr = arr.map(function(val){return ++val;});
					COOKIE_CONTROLLER.processConsent(arr); 
				}
			} catch(err) {}
		}
		
	}	
} 
function runTArcConsentCheck(){
	if(!tarcProcessed){
		if(!tarcLoaded){ console.log("out of geo");
 			COOKIE_CONTROLLER.processConsent([1,2,3]);
			tarcProcessed = true;
		} else if(document.cookie.match(/\bnotice_behavior=\w+\b/)){ console.log("in geo");
			var consentSet = [1];
			if(document.cookie.match(/\bnotice_behavior=\w+,eu\b/)){
				var funcCookies = !document.cookie.match(/\bnotice_gdpr_prefs=/)  && !document.cookie.match(/\bnotice_behavior=\w+,eu\b/)  || document.cookie.match(/\bnotice_gdpr_prefs=[^:]*1[^:]*:/) ;
				var advCookies =  !document.cookie.match(/\bnotice_gdpr_prefs=/)  && !document.cookie.match(/\bnotice_behavior=\w+,eu\b/)  || document.cookie.match(/\bnotice_gdpr_prefs=[^:]*2[^:]*:/) ;
			} else if(document.cookie.match(/\bnotice_behavior=\w+,us\b/)){
				if(document.cookie.match(/\bnotice_gdpr_prefs=/)) {
					var funcCookies = !document.cookie.match(/\bnotice_gdpr_prefs=/)  && !document.cookie.match(/\bnotice_behavior=\w+,us\b/)  || document.cookie.match(/\bnotice_gdpr_prefs=[^:]*1[^:]*:/) ;
					var advCookies =  !document.cookie.match(/\bnotice_gdpr_prefs=/)  && !document.cookie.match(/\bnotice_behavior=\w+,us\b/)  || document.cookie.match(/\bnotice_gdpr_prefs=[^:]*2[^:]*:/) ;
				} else {
					consentSet = [1,2,3];
				}
			}
			if(funcCookies){consentSet.push(2);}
			if(advCookies){consentSet.push(3);}
			COOKIE_CONTROLLER.processConsent(consentSet);
			tarcProcessed = true;
		} else if(tarcInitCheck){ /*Fall back, TrustArc loads its script, but no consent cookies set*/
			COOKIE_CONTROLLER.processConsent([1,2,3]);
			tarcProcessed = true;
		}
	}
	tarcInitCheck = true;
}