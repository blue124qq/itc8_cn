window.onload = function () {

    ga('create', 'UA-3349915-8')

    var category =  $('span.meta__cat').text();
        
    var oneOrTwo = Math.floor(Math.random() * 11);
    var checkOdd = oneOrTwo % 2;
        
    console.log(checkOdd);
    console.log(category);
        
    if (loggedin == 'False') {
        
        console.log('Target audience');
    
        if(checkOdd == 1) {
        
            $("div.intro" ).append( "<div class='boxed--grey register' style='margin:1.333em 0;'><div class='media author--info author--info--bottom'><div class='media__img' style='float:right;margin-top:20px'><img class='media__img--circular--medium' src='https://pigprogress.net/PageFiles/3/vincent_img_reg_promo.png' alt='Chief editor Vincent ter Beek' style='border-width:0px;'></div><div class='media__body'><h3 style='color:#b20070;font-size:1.5em;'>Continue reading our articles for free!</h3><p style='margin:15px 0;'>The first 5 articles are on us. This is article number "+ f2xCount +" this month. After those we like you to register using an e-mail address so you get instant unlimited access to all our articles. Simple, fast and easy.</p><p style='text-align:center;margin-bottom:1.33em;' onclick=\"window.ga('send', 'event', { eventCategory: 'registration-promotion',eventAction: 'clicked',    eventLabel: 'Variant D'});\"><a class='btn-register' data-width='140' href='https://www.pigprogress.net/Registration/?utm_source=website&utm_medium=reg_promo&utm_campaign=pp' ><span style='width: 140px;font-weight:bold;'>Get unrestricted access now</span></a></div></div></div>" );
            // _gaq.push(['_trackEvent', 'registration-promotion', 'loaded']);
            // ga('send', 'event', 'registration-promotion', 'loaded');
            window.ga('send', 'event', {
                eventCategory: 'registration-promotion',
                eventAction: 'loaded',
                eventLabel: 'Variant D'
                });
    
        } else {
            $("div.intro" ).append( "<div class='boxed--grey register' style='margin:1.333em 0;'><div class='media author--info author--info--bottom'><div class='media__img' style='float:right;margin-top:20px'><img class='media__img--circular--medium' src='https://pigprogress.net/PageFiles/3/vincent_img_reg_promo.png' alt='Chief editor Vincent ter Beek' style='border-width:0px;'></div><div class='media__body'><h3 style='color:#b20070;font-size:1.5em;'>Continue reading our articles for free!</h3><p style='margin:15px 0;'>Our aim is to provide the best in-depth information on the pig industry. This is why you can read the first 5 articles without being signed in. After 5 articles we would like you to register using an email address so you can get instant unlimited access to all our articles. By providing us information about your areas of interest, we can serve you even better with tailored made content. We welcome you to our community.</p><p style='text-align:center;margin-bottom:1.33em;' onclick=\"window.ga('send', 'event', { eventCategory: 'registration-promotion',eventAction: 'clicked',    eventLabel: 'Variant B'});\"><a class='btn-register' data-width='140' href='https://www.pigprogress.net/Registration/?utm_source=website&utm_medium=reg_promo&utm_campaign=pp' ><span style='width: 140px;font-weight:bold;'>Get unrestricted access now</span></a></div></div></div>" );
            // _gaq.push(['_trackEvent', 'registration-promotion-variant', 'loaded']);
            // ga('send', 'event', 'registration-promotion', 'loaded');
            window.ga('send', 'event', {
                eventCategory: 'registration-promotion',
                eventAction: 'loaded',
                eventLabel: 'Variant B'
            });            
        }
    
    }
        
    };