var LandingPage=function(n){var t={bindEvents:function(){n("div.more a.expand").click(function(){n(this).parent().children("a").map(function(){var t=n(this);t.hasClass("text")&&t.toggleClass("removed");t.hasClass("collapse")?(t.removeClass("collapse"),t.addClass("expand")):(t.removeClass("expand"),t.addClass("collapse"))});var t=n(this).parent().parent();t.children(".hideable").map(function(){var t=n(this);t.slideToggle("slow")});n("html, body").animate({scrollTop:t.position().top},1e3)})}};return{OnReady:function(){t.bindEvents()}}}(jQuery)