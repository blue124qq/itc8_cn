
function cookieCreate($){
    $.ceva = $.ceva || {};
    $.ceva.cookie = $.ceva.cookie || {};

    $.extend(true, $.ceva.cookie,
    {

        get: function(name)
        {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue != null ? cookieValue : false;
        },

        set: function(name, value, expires, domain, path, secure)
        {
            if (typeof name != 'undefined' && typeof value != 'undefined'){
                path   = '; path=' +  (path ? path : '/');
                secure = secure ? '; secure' : '';
                domain = domain ? '; domain=' + (domain) : '';
                secure = secure ? '; secure' : '';

                if (expires && (typeof expires == 'number' || expires.toUTCString)) {
                    var date;
                    if (typeof expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = expires;
                    }
                    expires = '; expires=' + date.toUTCString();
                }
                else{
                    expires = '';
                }
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            }
        },

        clear: function(name, domain, path, secure,session)
        {
            var value = '';
            var expires;
            if(typeof session == 'boolean' && session){
                expires = '; expires= -1';
            }
            else{
                var exp=new Date();
                exp.setTime (exp.getTime() - 100000);
                expires = '; expires=' + exp.toGMTString();
            }

            path   = '; path=' +  (path ? path : '/');
            secure = secure ? '; secure' : '';
            domain = domain ? '; domain=' + domain : '';
            secure = secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        }
    });
};
cookieCreate(jQuery);


(function($){
    $.ceva = $.ceva || {};
    $.ceva.toolbar = $.ceva.toolbar || {};
    $.ceva.toolbar.cookie = $.ceva.toolbar.cookie || {};

    $.extend(true, $.ceva.toolbar.cookie,
    {
        name: 'hideCevaCookieInfo',

        init: function(selecteur1, selecteur2)
        {
            if (!$(selecteur1).length) return;
            if (!$(selecteur2).length) return;

            if (!$.ceva.cookie.get( this.name ))
            {
                $(selecteur1).show();
            }

            var self = this;

            $(selecteur2, selecteur1).bind('click', function (e) {
                e.preventDefault();
                $.ceva.cookie.set(self.name , 1, 365);
                $(selecteur1).slideUp();
            });
        }
    });
})(jQuery);

jQuery(function () {

    $.ceva && $.ceva.toolbar.cookie.init('#toolbar-cookie', '.toolbar-cookie__btn');

});
