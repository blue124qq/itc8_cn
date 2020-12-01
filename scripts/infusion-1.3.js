/**
 * Infusion: replace some keyword terms in textNodes with hyperlinks.
 * - Keywords are fetched with AJAX
 * - Max `replMax` nr of keywords are replaced (globally)
 * - Keywords in `excludeTags` are excluded
 * - Keywords in elements with classes from `excludeClasses[]` are excluded
 * 
 * @version 1.3
 * @date 	03-11-2017
 * @author 	David Hund
 *
 * @notes	Make sure `replParent` Element is known at execution time!
 * At the moment it seems it is working, but only because the AJAX call takes
 * some time to return? Better run at DOMContentLoaded?
 * 
 * @param 	{DOMElement} 	doc document element
 * @param 	{String}		iID String of Infusion ID
 *
 * NOTE: MINIFIED Script: infusion.min.js (03-11-2017 DH): 
 * ** SHOULD BE RELEASED/COPIED/UPDATED MANUALLY! **
 */

(function (doc, iID) {

    // 'Cutting The Mustard':
    // Do not run at ALL when the following are not supported:

    // - `document.getElementsByClassName()` (IE8+)
    // - `Array.prototype.forEach`           (IE9+)
    // - `Array.prototype.indexOf`           (IE9+)
    // 
    if (
        typeof doc.getElementsByClassName === 'function' &&
        Array.prototype.forEach &&
        Array.prototype.indexOf
    ) {

        var siteEl = doc.getElementById(iID),                       // infusion <script> El.
            siteId = siteEl.getAttribute("data-site"),              // Site ID, taken from <script> El.
            domain = siteEl.getAttribute("src"),                    // Site href, taken from <script> El.
            infusionPath = '/v2/GetInfusionHandler.ashx',
            excludeTags = { 'a': 1, 'style': 1, 'script': 1, 'iframe': 1, 'h2': 1, 'h3': 1, 'h4': 1 },  // Don't replace terms in these tags
            excludeClasses = ['no-infusion', 'intro', 'ad', 'kader-body'],                              // Don't replace terms in Els with this classes
            replParent = doc.getElementsByClassName("article")[0],  // Start searching from within this element
            replMax = 2,                                            // Replace max X terms with links
            replTerms,
            replTermCollection = [];

        domain = domain.split('/')[0] + '//' + domain.split('/')[2];

        // // Debug:
        // domain = 'http://logolinks.reedbusiness.nl/v2/GetInfusionHandler.ashx';

        var request = new XMLHttpRequest();
        request.open('POST', domain + infusionPath, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                replTerms = JSON.parse(request.responseText);
                for (var keyword in replTerms) {
                    if (replTerms.hasOwnProperty(keyword)) {
                        // findTextNodes(parentNode, Keyword, replaceFunction)
                        // - Looks for textNode children containing keyword
                        findTextNodes(
                            replParent,
                            keyword,
                            function (match) {
                                var link = doc.createElement('a');
                                link.href = replTerms[keyword]; // + match;
                                link.target = '_blank';
                                link.rel = 'noreferrer noopener';
                                link.className += 'infusion-link';
                                link.innerHTML = match;
                                return link;
                            }
                        )
                    }
                }
            } else {
                // We reached our target server, but it returned an error
                console.log("Error: could not retrieve Infusion terms...");
            }
        };

        request.send(siteId);

        /**
         * isValidElementNode() checks if:
         * [1] `el` is a ELEMENT_NODE
         * [2] `el` is not one of `excludedTags{..}`.
         * [3] `el` does not contain one of `excludedClasses[..]`
         * 
         * @param {DomNode} el 
         * @return Boolean
         */
        var isValidElementNode = function (el) {
            /* [1] */
            if (!el || el.nodeType !== 1) return false;
            /* [2] + [3] */
            return (
                Object.keys(excludeTags).indexOf(el.nodeName.toLowerCase()) === -1 &&
                el.className.split(' ').filter(function (v) { return excludeClasses.indexOf(v) !== -1; }).length === 0
            );
        };

        // find text nodes to apply replFn to
        var findTextNodes = function (el, term, replFn) {
            var elChildren, child, tag;

            if (el) {
                elChildren = el.childNodes;
                // Loop recursively over all childNodes and replace keywords in text (if found)
                // for (var i = elChildren.length - 1; i >= 0; i--) {
                for (var i = 0; i < elChildren.length; i++) {
                        child = elChildren[i];
                    // Loop over child elements and exclude els with class no-infusion
                    // if (child.nodeType == 1 && child.className.indexOf(excludeClass) === -1) { // ELEMENT_NODE
                    if ( isValidElementNode(child) ) {
                        // Recursively find child nodes
                        findTextNodes(child, term, replFn);
                    } else if (child.nodeType === 3) { // TEXT_NODE
                        // 1. Only handle textNodes that have more than just whitespace...
                        // 2. Only handle textNodes with more than 2 chars
                        if (!(child.data.match(/^\s+$/)) && child.data.length > 2) {
                            replaceKW(child, term, replFn);
                        }
                    }
                }
            }
        };

        // replace terms in text according to replFn
        var replaceKW = function (textNode, term, replFn) {
            var termRe = new RegExp('\\b(' + term + ')\\b', 'gi'),
                match,
                matches = [];

            while (match = termRe.exec(textNode.data)) {
                var foundTerm = false,
                    nrTerms = 0;
                // Create Collection of found Terms
                // And add Term as Object with `count` property
                for (var tI = 0; tI < replTermCollection.length; tI++) {
                    if (replTermCollection[tI].hasOwnProperty('term') && replTermCollection[tI]['term'] === term) {
                        // We already have a Keyword found on the page
                        // - Update `count` property
                        // - Update `nrTerms` of current loop to `count`
                        foundTerm = true;
                        replTermCollection[tI].count++;
                        nrTerms = replTermCollection[tI].count;
                    }
                }
                // We do not yet have a found Keyword
                if (!foundTerm) {
                    // Add this Keyword as new Object to our tmp collection
                    replTermCollection.push({ 'term': term, 'count': 1 });
                }
                // Only push current Keyword Term to `matches`
                // when we are not yet at our Max Nr of replaces..
                if (nrTerms <= replMax) {
                    matches.push(match);
                    // } else {
                    //  console.log('No more replaces of %s allowed (%s of max %s)', term, nrTerms, replMax);
                }
            }
            for (var i = matches.length - 1; i >= 0; i--) {
                match = matches[i];
                // cut out the text node to replace
                textNode.splitText(match.index);
                textNode.nextSibling.splitText(match[1].length);
                textNode.parentNode.replaceChild(replFn(match[1]), textNode.nextSibling);
            }
        };

    }
}(document, 'infusion'));
