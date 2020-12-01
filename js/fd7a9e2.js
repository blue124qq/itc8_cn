
(function($){
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
})(jQuery);


(function($){
    $.ceva = $.ceva || {};
    $.ceva.user = $.ceva.user || {};

    $.extend(true, $.ceva.user,
    {
        cookie: 'CEVA',

        init: function()
        {

        },

        isLogguedIn: function()
        {
            return $.ceva.cookie.get('CEVA') && $.ceva.cookie.get('is_logged_in');
        }
    });
})(jQuery);


(function($){
    $.ceva = $.ceva || {};
    $.ceva.user = $.ceva.user || {};
    $.ceva.user.register = $.ceva.user.register || {};

    $.fn.serializeAllArray = function() {
        var rselectTextarea = /^(?:select|textarea)/i;
        var rinput = /^(?:color|date|datetime|datetime-local|email|file|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
        var rCRLF = /\r?\n/g;

        var arr = this.map(function(){
                return this.elements ? jQuery.makeArray( this.elements ) : this;
            })
            .filter(function(){
                return this.name && !this.disabled &&
                    ( this.checked || rselectTextarea.test( this.nodeName ) ||
                    rinput.test( this.type ) );
            })
            .map(function( i, elem ){
                var val = jQuery( this ).val();

                return val == null ?
                    null :
                    jQuery.isArray( val ) ?
                        jQuery.map( val, function( val, i ){
                            return { name: elem.name, type: elem.type, value: val.replace( rCRLF, "\r\n" ) };
                        }) :
                    { name: elem.name, type: elem.type, value: val.replace( rCRLF, "\r\n" ) };
            }).get();

        return arr;
    };

    $.fn.serializeAll = function() {
        return $.param(this.serializeAllArray());
    };

    $.extend(true, $.ceva.user.register,
    {
        ezjsc:
        {
            url: '',
            arguments: 'professionalsegment::add'
        },

        segments: null,
        site_access: null,

        i18n:
        {
            input_not_validate: '',
            input_required: '',
            input_select_value: ''
        },

        css_array:
        {
            css_class_label: '',
            css_class_element: '',
            css_class_wrapper_div: ''
        },

        init: function(segments, site_access, i18n, css_array)
        {
            this.ezjsc.url = typeof $.ez !== 'undefined' && typeof $.ez.url !== 'undefined'? $.ez.url : '';
            if (!this.ezjsc.url && location.pathname.match(/^\/[a-z_]+\//)) {
                this.ezjsc.url = location.pathname.match(/^\/[a-z_]+\//)[0] + 'ezjscore/';
            }
            if (!this.ezjsc.url) {
                this.ezjsc.url = '/ezjscore/';
            }
            if (this.ezjsc.url) {
                this.ezjsc.url = this.ezjsc.url + 'call';
            }

            this.segments = segments;
            this.site_access = site_access;

            $.extend( true, this.i18n, i18n );

            $.extend( true, this.css_array, css_array);

            var self = this;

            // On Load
            var selector = "input[id^='ezcoa-'][id$='_type_pro'],select[id^='ezcoa-'][id$='_type_pro']";
            self.loadProfiles($(selector),$("select[id^='countrylist_']"));

            // On Change
            $(selector).bind('change', function()
            {
                self.loadProfiles( $(this), $("select[id^='countrylist_']") );

                var $this = $(this), name = $this.attr("name").replace(/\[\]$/, "");
                if($(this).val() === ""){
                    $(this).attr("name", name);
                }
                else{
                    $(this).attr("name", name + "[]");
                }
            });
            $("select[id^='countrylist_']").bind('change', function()
            {
                self.loadProfiles( $(selector), $(this) );
            });

            //Form validation
            $("form.user-register").submit(function(e)
            {
                e.preventDefault();

                var form = $(this);
                var dom_element, is_valid = true;
                var data = form.serializeAllArray();
                var items = [], to_validate = [];
                var elements_single_checkbox = [];

                $("input[type='checkbox'].single-checkbox").each(function() {
                    elements_single_checkbox.push(this.name);
                });


                for (var i=0; i<data.length; i++)
                {
                    if (data[i].name.indexOf('cevaProfile_') !== -1)
                    {
                        if (data[i].type === 'checkbox') {
                            var parent = $("input[name='"+data[i].name+"']").parent();
                            if (parent.hasClass('required')) {
                                var checked = parent.children('input:checked');
                                if (checked.length === 0) {
                                    to_validate.push(parent.prev('label').text().slice(0, -3));
                                    is_valid = false;
                                }
                            }
                        }
                        else {
                            dom_element = $('#'+data[i].name);
                            if (dom_element.hasClass('required'))
                            {
                                if (dom_element.val() === '')
                                {
                                    to_validate.push(dom_element.prev('label').text().slice(0, -3));
                                    is_valid = false;
                                }
                            }
                            if (dom_element.val() !== '')
                            {
                                items.push(data[i]);
                            }
                        }
                    }
                }

                if (is_valid)
                {
                    if (form.data('submitted') === undefined) {
                        $("form.user-register").find('input[type=submit]').attr('disabled', true).addClass('loading');

                        if (typeof HoldOn !== 'undefined') {
                            HoldOn.open();
                        }

                        var formData = new FormData($(this)[0]);
                        formData.append('user_name', $("input[id$='user_account_login']").val());
                        formData.append('user_email', $("input[id$='user_account_email']").val());
                        formData.append('user_fname', $("input[id$='first_name']").val());
                        formData.append('user_lname', $("input[id$='last_name']").val());
                        formData.append('user_company', $("input[id$='company']").val());
                        formData.append('user_address', $("input[id$='address']").val());
                        formData.append('user_address1', $("input[id$='address1']").val());
                        formData.append('user_address2', $("input[id$='address2']").val());
                        formData.append('user_city', $("input[id$='city']").val());
                        formData.append('user_pcode', $("input[id$='postcode']").val());
                        formData.append('user_phone', $("input[id$='phone']").val());
                        formData.append('user_typepro', $("input[id$='type_pro'],select[id$='type_pro']").val());
                        formData.append('ezjscServer_function_arguments', self.ezjsc.arguments);

                        if (elements_single_checkbox.length !== 0) {
                            $.each( elements_single_checkbox, function( index, value ){
                                var checkbox_value = formData.get(value);
                                if (checkbox_value !== 'on') {
                                    formData.set(value, 'off');
                                }
                            });
                        }

                        if (self.ezjsc.url) {
                            $.ajax({
                                url: self.ezjsc.url,
                                type: 'post',
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false
                            })
                                .always(function() {
                                    $("form.user-register").find('input[type=submit]').attr('disabled', true).addClass('loading');

                                    document.forms['registerForm'].submit();
                                });
                        }
                    }
                }
                else
                {
                    var title = $('<h5>').html( self.i18n.input_not_validate ),
                        div = $('<div>').addClass('warning'),
                        list = $('<ul>');

                    div.append(title);

                    for (var j=0; j<to_validate.length; j++)
                    {
                        list.append('<li>'+ to_validate[j] + ': ' + self.i18n.input_required + '</li>');
                    }

                    div.append(list);
                    $(this).prepend(div);
                    $('html, body').scrollTop(0);
                    return false;
                }
            });
        },

        loadProfiles: function (selectPro, selectCountry)
        {

            $('div').remove('.ceva-qb-profile');
            $('div').remove('.ceva-qb-segments');
            var main_div = $('<div>').addClass('ceva-qb-segments');

            if (!this.segments.length) {
                return false;
            }
            for ( var i=0; i<this.segments.length; i++ )
            {
                if ( ( this.segments[i].type_pro === undefined || this.segments[i].type_pro === matchingPro[selectPro.val()] )
                    && ( this.segments[i].country === undefined || this.segments[i].country === selectCountry.val() ))
                {
                    this.segments[i].value = this.segments[i].value.replace(/; /g, ';');
                    var label = $("<label>"),
                        div_class = ( this.segments[i].type_pro === undefined ) && ( this.segments[i].country === undefined ) ? 'ceva-qb-profile-common' : 'ceva-qb-profile',
                        div = $('<div>').addClass(this.css_array.css_class_wrapper_div + div_class),
                        div_element,
                        element;

                    if (div_class === 'ceva-qb-profile-common' && $('.ceva-qb-profile-common').length > 0) {
                        continue;
                    }

                    var twopoints = (this.segments[i].type !== "single checkbox") ? ':' : '';

                    if (this.segments[i].is_mandatory === true)
                    {
                        label.html(this.segments[i].label+' <span class="required">*</span>'+twopoints);
                    }
                    else
                    {
                        label.html(this.segments[i].label+' '+twopoints);
                    }

                    if (this.segments[i].type === "single checkbox") {
                        var div_class_label = "single-checkbox";
                        var div_label = $('<div>').addClass(div_class_label);

                        div.prepend(div_label.prepend(label));

                    }
                    else {
                        if (this.css_array.css_class_label !== "") {
                            var div_label = $('<div>').addClass(this.css_array.css_class_label);

                            div.prepend(div_label.prepend(label));
                        }
                        else {
                            div.prepend(label);
                        }
                    }

                    switch (this.segments[i].type)
                    {
                        case 'file upload':
                            element = $("<input>").attr({'type': 'file', 'accept': 'application/pdf', 'name': this.name(i), 'id': this.id(i), 'label': this.segments[i].label}).addClass('ezcc-user');
                            if (this.segments[i].is_mandatory === 1)
                            {
                                element.addClass('required');
                                element.prop('required',true);
                            }
                            if (this.css_array.css_class_element !== "")
                            {
                                div_element = $('<div>').addClass(this.css_array.css_class_element);
                                div.append(div_element.append(element));
                            }
                            else
                            {
                                div.append(element);
                            }
                            break;
                        case 'checkbox':
                            if (this.segments[i].value === '')
                            {
                                element = $("<input>").attr({'type': 'checkbox', 'name': this.name(i), 'id': this.id(i), 'label': this.segments[i].label}).addClass('ezcc-user');
                                if (this.segments[i].is_mandatory === 1)
                                {
                                    element.addClass('required');
                                }
                                if (this.css_array.css_class_element !== "")
                                {
                                    div_element = $('<div>').addClass(this.css_array.css_class_element);
                                    div.append(div_element.append(element));
                                }
                                else
                                {
                                    div.append(element);
                                }
                            }
                            else
                            {
                                var values = this.segments[i].value.split(';'),
                                    checkbox_div_f = $('<div>').css('float', 'left'),
                                    checkbox_div = $('<div>'),
                                    segment_name = values.length > 1 ? this.name(i) + '[]' : this.name(i),
                                    chechbox;// TODO: vérifier l'utilité de cette faute de frappe...
                                checkbox = $("<input>").attr({'type': 'checkbox', 'name': segment_name, 'id': this.id(i), 'label': this.segments[i].label}).val(values[0]).addClass('ezcc-user');
                                if (this.segments[i].is_mandatory == 1)
                                {
                                    checkbox_div.addClass('required');
                                }
                                var span = $('<span>').addClass('ceva-qb-profile-checkbox-label');
                                span.prepend(values[0]);
                                checkbox_div.append(checkbox).append(span).append('<br />');
                                for (var j=1; j<values.length; j++)
                                {
                                    checkbox = $("<input>").attr({'type': 'checkbox', 'name': segment_name}).val(values[j]).addClass('ezcc-user');
                                    var span = $('<span>').addClass('ceva-qb-profile-checkbox-label');
                                    span.prepend(values[j]);
                                    checkbox_div.append(checkbox).append(span).append('<br />');
                                }
                                checkbox_div_f.append(checkbox_div);
                                if (this.css_array.css_class_element != "")
                                {
                                    div_element = $('<div>').addClass(this.css_array.css_class_element);
                                    div.append(div_element.append(checkbox_div_f));
                                }
                                else
                                {
                                    div.append(checkbox_div_f);
                                }
                            }
                            break;

                        case 'radio':
                            if (this.segments[i].value === '')
                            {
                                element = $("<input>").attr({'type': 'radio', 'name': this.name(i), 'id': this.id(i), 'label': this.segments[i].label}).addClass('ezcc-user');
                                if (this.segments[i].is_mandatory === 1)
                                {
                                    element.addClass('required');
                                    element.prop('required',true);
                                }
                                div.append(element);
                            }
                            else
                            {
                                var values = this.segments[i].value.split(';'),
                                    radio_div_f = $('<div>').css('float', 'left'),
                                    radio_div = $('<div>'),
                                    radio;
                                radio = $("<input>").attr({'type': 'radio', 'name': this.name(i), 'label': this.segments[i].label}).val(values[0]).addClass('ezcc-user');
                                if (this.segments[i].is_mandatory === 1)
                                {
                                    radio.addClass('required');
                                    radio.prop('required',true);
                                }
                                radio_div.append(radio).append(values[0]+ '<br />');
                                for (var j=1; j<values.length; j++)
                                {
                                    radio = $("<input>").attr({'type': 'radio', 'name': this.name(i), 'id': this.id(i)}).val(values[j]).addClass('ezcc-user');
                                    if (j === 1 && this.segments[i].is_mandatory === 1)
                                    {
                                        radio.addClass('required');
                                        radio.prop('required',true);
                                    }
                                    radio_div.append(radio).append(values[j]+ '<br />');
                                }
                                radio_div_f.append(radio_div);
                                if (this.css_array.css_class_element !== "")
                                {
                                    div_element = $('<div>').addClass(this.css_array.css_class_element);
                                    div.append(div_element.append(radio_div_f));
                                }
                                else
                                {
                                    div.append(radio_div_f);
                                }
                            }
                            break;

                        case 'list':
                            element = $("<select>").attr({'name': this.name(i), 'id': this.id(i), 'label': this.segments[i].label});
                            if (this.segments[i].is_mandatory === 1)
                            {
                                element.addClass('required');
                                element.prop('required',true);
                            }
                            else
                            {
                                element.append($("<option>").val("").html(this.i18n.input_select_value));
                            }
                            if (this.segments[i].value !== '')
                            {
                                var options = this.segments[i].value.split(';');
                                if (this.segments[i].is_mandatory === 1)
                                {
                                    element.append($("<option>").val("").html(this.i18n.input_select_value));
                                }
                                for (var k=0; k<options.length; k++)
                                {
                                    element.append($("<option>").val(options[k]).html(options[k]));
                                }
                            }
                            if (this.css_array.css_class_element !== "")
                            {
                                div_element = $('<div>').addClass(this.css_array.css_class_element);
                                div.append(div_element.append(element));
                            }
                            else
                            {
                                div.append(element);
                            }
                            break;

                        case 'single checkbox':
                            element = $("<input>").attr({'type': 'checkbox', 'name': this.name(i), 'id': this.id(i), 'label': this.segments[i].label}).addClass('ezcc-user').addClass('single-checkbox');
                            if (this.segments[i].is_mandatory === 1)
                            {
                                element.addClass('required');
                            }
                            if (this.css_array.css_class_element !== "")
                            {
                                div_element = $('<div>');
                                div.prepend(div_element.prepend(element));
                            }
                            else
                            {
                                div.prepend(element);
                            }
                            break;

                        case 'text':
                        default:
                            element = $("<input>").attr({'type': 'text', 'name': this.name(i), 'id': this.id(i), 'label': this.segments[i].label}).addClass('box ezcc-user');
                            if (this.segments[i].is_mandatory === 1)
                            {
                                element.addClass('required');
                                element.prop('required',true);
                            }
                            if (this.css_array.css_class_element !== "")
                            {
                                div_element = $('<div>').addClass(this.css_array.css_class_element);
                                div.append(div_element.append(element));
                            }
                            else
                            {
                                div.append(element);
                            }
                            break;
                    }

                    main_div.append(div);
                }
            }

            if (this.site_access === "reminder-reminder_germany_de" || this.site_access.indexOf("product-vetintermed") === 0) {
                $('#ceva-segments').append(main_div);
            } else {
                selectPro.parent().after(main_div);
            }
        },

        id: function(i)
        {
            return this.name(i);
        },

        name: function(i)
        {
            return 'cevaProfile_'+this.segments[i].segment_remote_id;
        }
    });

    if (typeof webProfiles !== "undefined")
    {
        $.ceva.user.register.init(
            webProfiles.profiles,
            webProfiles.site,
            webProfiles.input,
            webProfiles.css
        );
    }

})(jQuery);


(function($){
    $.ceva = $.ceva || {};
    $.ceva.user = $.ceva.user || {};
    $.ceva.user.login = $.ceva.user.login || {};

    $.extend(true, $.ceva.user.login,
        {
            init: function()
            {

            },

            loading: function()
            {
                $('#loginform').submit(function(){
                    $(".loader-submit").css('visibility', 'visible');
                });
            }
        });
})(jQuery);


(function($){
    $.ceva = $.ceva || {};
    $.ceva.toolbar = $.ceva.toolbar || {};

    $.extend(true, $.ceva.toolbar,
    {
        init: function()
        {
            var ezwt = document.getElementById('ezwt'),
                toolbar_new = document.getElementById('ceva-top-toolbar-wrapper'),
                toolbar_old = document.getElementById('top-toolbar')
            ;
            if (!ezwt) return;

            if (ezwt.parentNode == null || ezwt.parentNode.nodeName == "BODY")
            {
                if (toolbar_old)
                {
                    toolbar_old.style.top = ezwt.offsetHeight + 'px';
                }
                else if (toolbar_new)
                {
                    toolbar_new.style.top = ezwt.offsetHeight + 'px';
                }
            }
        },

        tooltip: function (selecteur) {
            if (!jQuery(selecteur).length) return;
            jQuery(selecteur).prevAll('.tooltip-link').click(function (e)
            {
                e.preventDefault();
                e.stopPropagation();

                $('.tooltip-container, #subnav, #block_member_action, #language-selector-list').not(selecteur).removeClass('display').addClass('hidden');
                $('.tooltip-link, .ceva-top-toolbar-link').not(selecteur).removeClass('active');

                if (jQuery(selecteur).hasClass('display'))
                {
                    jQuery(selecteur).removeClass('display').addClass('hidden');
                    jQuery(selecteur).prevAll('.tooltip-link').removeClass('active');
                }
                else
                {
                    jQuery(selecteur).removeClass('hidden').addClass('display');
                    jQuery(selecteur).prevAll('.tooltip-link').addClass('active');
                }
            });

        },

        closeTooltip: function(){
            $('.tooltip-container, #account-informations, .subnav-bg').off( "click" ).on('click', function(e){
                e.stopPropagation();
            });

            $('body').on('click', function(){
                if ($('.tooltip-container, #subnav, #block_member_action').hasClass('display')) {
                    $('.tooltip-container, #subnav, #block_member_action').removeClass('display').addClass('hidden');
                    $('.tooltip-link, .ceva-top-toolbar-link').removeClass('active');
                }
            });
        }

    });
})(jQuery);

jQuery(function () {
    $.ceva && $.ceva.toolbar.tooltip('#ceva-top-toolbar #private-login');
    $.ceva && $.ceva.toolbar.tooltip('#ceva-top-toolbar #block_member_action');

    $.ceva && $.ceva.toolbar.tooltip('#ceva-top-toolbar #language-selector-list');

    $.ceva && $.ceva.toolbar.tooltip('#ceva-top-toolbar #subnav');
    $.ceva && $.ceva.toolbar.closeTooltip();

    $.ceva && $.ceva.toolbar.init();
});

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

    $.ceva && $.ceva.toolbar.cookie.init('#toolbar-cookie', '.toolbar-cookie-link');

});


(function($){
    $.ceva = $.ceva || {};
    $.ceva.toolbar = $.ceva.toolbar || {};
    $.ceva.toolbar.languages = $.ceva.toolbar.languages || {};

    $.extend(true, $.ceva.toolbar.languages,
    {
        root: '',

        init: function(root)
        {
            this.root = root;

            $('#languages input').click( this.switchTo );
            $('#language-selector-list a').click( this.switchTo );
        },

        switchTo: function()
        {
            var url = $.ceva.toolbar.languages.root
                + "/switchlanguage/to/"
                + $(this).attr('id')
                + document.location.href.replace($.ceva.toolbar.languages.root, '')
            ;
            document.location.href = url;
        }
    });
})(jQuery);


(function($){
    $.ceva = $.ceva || {};
    $.ceva.toolbar = $.ceva.toolbar || {};
    $.ceva.toolbar.user = $.ceva.toolbar.user || {};

    $.extend(true, $.ceva.toolbar.user,
    {
        name: null,
        edit_url: null,

        redirect_uri: null,

        render: function()
        {
            if  ( $.ceva.user.isLogguedIn() )
            {
                $('#block_member_link').attr('title', this.name);
                $('#block_member_link span').html( this.name );

                $('#block_member_action #edit a').attr('href', this.edit_url);

                $('#ceva-top-toolbar .ceva-top-toolbar-member').css('display', 'block');
                $('#ceva-top-toolbar #block_login').css('display', 'none');

            }
            else
            {
                $('input[name="RedirectURI"]').val( this.redirect_uri );

                $('#ceva-top-toolbar .ceva-top-toolbar-member').css('display', 'none');
                $('#ceva-top-toolbar #block_login').css('display', 'block');
            }
        },

        setName: function(name)
        {
            this.name = name;

            return this;
        },

        setEditUrl: function(edit_url)
        {
            this.edit_url = edit_url;

            return this;
        },

        setRedirectUri: function(redirect_uri)
        {
            this.redirect_uri = redirect_uri;

            return this;
        }
    });
})(jQuery);

$(document).ready(function() {

    function Fadeout_Switcher() {
        $( "#switcher_button ~ .other-countries").fadeTo( "40000", '0', function() {
            $(this).css('height', '0');
            $(this).css('z-index', '-9999');
        });
    }

    function Fadein_Switcher() {
        $("#switcher_button ~ .other-countries").css('z-index', '1000');
        $( "#switcher_button ~ .other-countries").fadeTo( "40000", '1', function() {
            $("#switcher_button ~ .other-countries").css('height', 'auto');
        });
    }

    $(document).click(function(e) {
        var target = $(e.target);
        if( !target.is('input#switcher_button') && !target.is('label[for="switcher_button"]') && !target.is('.other-countries') && !(target.is('use#selectorLanguages'))) {
            if ($('input#switcher_button').is(':checked')) {
                Fadeout_Switcher();
                $('#switcher_button').prop('checked', false);
            }
        }
    });

    $('#switcher .other-countries li a').on('click', function(event) {
        var location_uri = $(location).attr('pathname');
        var link_click = $(this).attr('href');

        if (link_click.length) {
            var link_click_search = '/' + link_click + '/';
            if (location_uri.search(link_click_search) !== -1) {
                event.preventDefault();
                Fadeout_Switcher();
                $('#switcher_button').prop('checked', false);
            }
        }
    });
    $('input#switcher_button').change(function() {
        if ($(this).is(':checked')) {
            Fadein_Switcher();
        } else {
            Fadeout_Switcher();
        }
    });
});

$(document).ready(function() {
    $('iframe').each(function(i, element) {
        var youtubeLink = $(element).data('src');
        var substring = "rel=";

        if (typeof(youtubeLink) !== 'undefined') {
            if (youtubeLink.indexOf(substring) === -1 && youtubeLink.indexOf('?') === -1) {
                youtubeLink = youtubeLink + '?rel=0'
            } else if (youtubeLink.indexOf(substring) === -1 && youtubeLink.indexOf('?') !== -1) {
                youtubeLink = youtubeLink + '&rel=0'
            }

            if (typeof(youtubeLink) !== 'undefined') {
                $(element).attr('src', youtubeLink);
            }
        }
    });
});

$(document).ready(function () {
    if ($('#ezwt').length) {

        let selector = null;

        if ($('#header').length) {
            selector = $('#header');
        }

        if (selector === null && $('#main').length) {
            selector = $('#main');
        }

        if (selector === null && $('.content-container').length) {
            selector = $('.content-container');
        }

        if (selector != null && selector.length) {
            var offset = selector.innerHeight() - selector.height();
            if ($('#ezwt').height() !== offset && offset === 0) {
                selector.css('padding-top', $('#ezwt').height());
                if (selector.css('top') !== 0) {
                    selector.css('top', 0);
                }
            }
        }
    }
});

$(window).bind("load", function () {
    ! function(e) {
        var o = {};

        function t(n) {
            if (o[n]) return o[n].exports;
            var i = o[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }
        t.m = e, t.c = o, t.d = function(e, o, n) {
            t.o(e, o) || Object.defineProperty(e, o, {
                enumerable: !0,
                get: n
            })
        }, t.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, t.t = function(e, o) {
            if (1 & o && (e = t(e)), 8 & o) return e;
            if (4 & o && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (t.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & o && "string" != typeof e)
                for (var i in e) t.d(n, i, function(o) {
                    return e[o]
                }.bind(null, i));
            return n
        }, t.n = function(e) {
            var o = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(o, "a", o), o
        }, t.o = function(e, o) {
            return Object.prototype.hasOwnProperty.call(e, o)
        }, t.p = "", t(t.s = 4)
    }([function(e, o, t) {
        "use strict";
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        o.createCookie = function(e, o, t, n) {
            var i = void 0,
                c = new Date;
            t && (c.setTime(c.getTime() + 24 * t * 60 * 60 * 1e3), i = "; expires=" + c.toGMTString()), document.cookie = e + "=" + o + i + "; path=/;domain=" + n + ";"
        }, o.getCookie = function(e) {
            if (document.cookie.length > 0) {
                var o = document.cookie.indexOf(e + "=");
                if (-1 !== o) {
                    o = o + e.length + 1;
                    var t = document.cookie.indexOf(";", o);
                    return -1 === t && (t = document.cookie.length), unescape(document.cookie.substring(o, t))
                }
            }
            return ""
        }, o.popinTmpl = function(e, o) {
            document.getElementsByTagName("body")[0];
            return '\n<div class="CookieOverlay hidden">\n  <section class="CookieModal">\n     <div class="CookieModal-inner">\n        <button class="CookieModal-close">\n           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"/>\n           </svg>\n           </button>\n        <header class="CookieModal-header">\n           <div class="CookieModal-title">' + o.popincookie.title + "\n           </div>\n           <p>" + o.popincookie.description + '</p>\n        </header>\n        <div class="CookieModal-content">\n           <ul class="CookieModal-paramList">\n            ' + function(e, o) {
                var t = "",
                    i = "";
                if (!o || !e) return !1;
                for (var c in e.cookies)
                    if ("object" == n(e.cookies[c])) {
                        var a = e.cookies[c],
                            r = a.isConsentChangeable,
                            s = a.id,
                            l = a.displayCookiesDetails,
                            u = a.isActive,
                            k = o.popincookie[c],
                            d = k.title,
                            v = k.description,
                            p = o.popincookie[c].cookiesReadmore,
                            f = p.label,
                            m = p.content;
                        u && (r && (i = ' <input type="checkbox" id="' + s + '" class="CookieCheck-input">\n          <label for="' + s + '" class="CookieCheck-label" aria-label="..."></label>'), t += '<li class="CookieParam" data-id="' + c + '">\n          <div class="CookieParam-head">\n            <div class="CookieParam-title">' + d + '</div>\n            <div class="CookieCheck">\n                ' + i + '\n                <div class="CookieCheck-statut"></div>\n            </div>\n          </div>\n          <p class="CookieParam-info">' + v + "</p>", l && (t += '<button class="CookieToogle-btn">\n                ' + f + '\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\n                    <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>\n                </svg>\n              </button>\n              <div class="CookieToogle-content" aria-hidden="true">\n                ' + m + "\n              </div>"), t += "</li>")
                    }
                return t
            }(e, o) + '\n           </ul>\n        </div>\n     </div>\n     <footer class="CookieModal-actions">\n        <button class="CookieBtn">' + o.popincookie.labelbutton + "</button>\n     </footer>\n  </section>\n</div>"
        }, o.bannerTmpl = function(e) {
            var o = e.bannercookie,
                t = '<div class="CookieBanner">\n      <div class="CookieBanner-inner">\n      <div class="CookieBanner-text">\n          <div class="CookieBanner-title">' + o.title + '</div>\n          <p class="CookieBanner-info">' + o.info + '</p>\n      </div>\n      <div class="CookieBanner-actions">\n          <button class="CookieBtn">' + o.ctaAccept + '</button>\n          <button class="CookieBtn is-alt">' + o.ctaPersonnalize + "</button>\n      </div>\n      </div>\n  </div>";
            return t
        }
    }, function(e, o, t) {
        "use strict";
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = Object.assign || function(e) {
                for (var o = 1; o < arguments.length; o++) {
                    var t = arguments[o];
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                return e
            },
            c = t(0);
        o.default = function(e, o) {
            this.trads = e, this.config = o, this.cookie = {
                cookie_consent: 0,
                consent_cookie_fonc: o.cookies.functionalcookie.defaultConsentStatus,
                consent_cookie_stats: o.cookies.performancecookie.defaultConsentStatus,
                consent_cookie_mkg: o.cookies.adscookie.defaultConsentStatus
            }, this.init = function() {
                var e = this;
                this.initGtm(), this.initCookie(), setTimeout(function() {
                    e.trigerPopinFromBtns()
                }, 3e3), this.injectBanner(), this.injectPopin()
            }, this.initGtm = function() {
                this.cookieGtm = i({}, this.cookie)
            }, this.parseCookie = function(e) {
                return JSON.parse(e)
            }, this.stringifyCookie = function(e) {
                return JSON.stringify(e)
            }, this.updateCookie = function(e) {
                if ("object" !== (void 0 === e ? "undefined" : n(e))) throw new Error("UpdateCookie must have a Object param");
                var o = i({}, this.cookieGtm),
                    t = Object.keys(e);
                for (var a in e) t[0] in e && (o[a] = e[a]);
                this.cookieGtm = o, (0, c.createCookie)(this.config.cookiename, this.stringifyCookie(this.cookieGtm), this.config.cookieexpiration, this.config.cookiedomain)
            }, this.initCookie = function() {
                "" == (0, c.getCookie)(this.config.cookiename) && (0, c.createCookie)(this.config.cookiename, this.stringifyCookie(this.cookieGtm), this.config.cookieexpiration, this.config.cookiedomain), (0, c.getCookie)(this.config.cookiename) && (this.cookieGtm = this.parseCookie((0, c.getCookie)(this.config.cookiename)), dataLayer.push(this.cookieGtm), dataLayer.push({
                    event: "cookie_banner_ready"
                }))
            }, this.triggerGtmEventCustom = function(e) {
                dataLayer.push(e)
            }, this.updateRadioInputs = function(e) {
                for (var o = document.querySelectorAll(".CookieParam .CookieParam-head .CookieCheck .CookieCheck-input"), t = this.trads.popincookie.labelOn, n = this.trads.popincookie.labelOff, i = 0, c = o.length; i < c; i++)
                    if (o[i].getAttribute("id") in e) switch (e[o[i].getAttribute("id")]) {
                        case 1:
                            o[i].setAttribute("checked", ""), o[i].parentNode.querySelector(".CookieCheck-statut").innerHTML = t;
                            break;
                        case 0:
                            o[i].removeAttribute("checked"), o[i].parentNode.querySelector(".CookieCheck-statut").innerHTML = n
                    }
            }, this.buildElementsPopin = function() {
                for (var e = this, o = document.querySelectorAll(".CookieParam"), t = this.config, n = (t.domain, t.subdomain, t.cookiename, this.trads.popincookie.labelOn), i = this.trads.popincookie.labelOff, c = function(t, c) {
                    var a = o[t],
                        r = a.getAttribute("data-id"),
                        s = e.config.cookies[r],
                        l = !0,
                        u = "close",
                        k = a.querySelector(".CookieParam-head .CookieCheck .CookieCheck-input"),
                        d = a.querySelector(".CookieParam-head .CookieCheck .CookieCheck-statut");
                    if (void 0 !== e.cookieGtm && void 0 !== s.id && "number" == typeof e.cookieGtm[s.id]) switch (e.cookieGtm[s.id]) {
                        case 1:
                            k.setAttribute("checked", "");
                        case 0:
                            k.removeAttribute("checked")
                    }
                    if ("mandatorycookie" === a.getAttribute("data-id") && (1 == e.cookieGtm[s.id] ? d.innerHTML = i : d.innerHTML = n), null !== k) {
                        var v = !1,
                            p = null,
                            f = s.id,
                            m = s.eventGTM.eventGTM_name_change;
                        k.addEventListener("change", function(o) {
                            (v = !v) ? k.setAttribute("checked", ""): k.removeAttribute("checked"), p = k.checked ? 1 : 0, k.checked ? d.classList.add("is-active") : d.classList.remove("is-active"), k.checked ? d.innerHTML = n : d.innerHTML = i;
                            var t = {};
                            t[f] = p;
                            var c = {};
                            c.event = m, c[s.id] = p, c.cookie_consent = 1, e.updateCookie(t), e.triggerGtmEventCustom(c), e.triggerGtmEventCustom({
                                event: "cookiebanner_event_ga",
                                cookie_consent_event_ga_action: s.eventGTM.eventGA_action_change,
                                cookie_consent_event_ga_libelle: p
                            })
                        })
                    }
                    s.displayCookiesDetails && a.querySelector(".CookieToogle-btn").addEventListener("click", function(o) {
                        var t = o.target || o.srcElement;
                        t.classList.toggle("is-toggle");
                        var n = t.nextElementSibling;
                        if (!n) return !1;
                        u = (l = !l) ? "cookiepopin_close" : "cookiepopin_open", o.preventDefault, setTimeout(function() {
                            n.setAttribute("aria-hidden", l.toString()), "cookiepopin_open" == u && e.triggerGtmEventCustom({
                                event: "cookiebanner_event_ga",
                                cookie_consent_event_ga_action: "Ouverture Détail Cookies",
                                cookie_consent_event_ga_libelle: "" + s.eventGTM.eventGA_libelle_toggle
                            })
                        }, 100)
                    })
                }, a = 0, r = o.length; a < r; a++) c(a)
            }, this.trigerPopinFromBtns = function() {
                var e = this;
                [].slice.call(document.querySelectorAll(".OpenCookieConsent")).map(function(o, t) {
                    o.removeEventListener("click", null), o.addEventListener("click", function(o) {
                        e.triggerGtmEventCustom({
                            event: "cookiebanner_event_ga",
                            cookie_consent_event_ga_action: "Ouverture Popin",
                            cookie_consent_event_ga_libelle: "Lien Page"
                        }), e.showPopin()
                    })
                })
            }, this.injectBanner = function() {
                var e = this;
                document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", (0, c.bannerTmpl)(this.trads));
                var o = [document.querySelectorAll(".CookieBanner .CookieBanner-actions button")[0], document.querySelectorAll(".CookieBanner .CookieBanner-actions button")[1]];
                o[0].addEventListener("click", function(o) {
                    o.preventDefault, e.updateCookie({
                        cookie_consent: 1,
                        consent_cookie_fonc: 1,
                        consent_cookie_stats: 1,
                        consent_cookie_mkg: 1
                    }), e.hideBanner(), e.triggerGtmEventCustom({
                        event: "accept_all_cookies",
                        cookie_consent: 1,
                        consent_cookie_fonc: 1,
                        consent_cookie_stats: 1,
                        consent_cookie_mkg: 1
                    }), e.triggerGtmEventCustom({
                        event: "cookiebanner_event_ga",
                        cookie_consent_event_ga_action: "Accepter tous les cookies",
                        cookie_consent_event_ga_libelle: "Clic bandeau"
                    })
                }), o[1].addEventListener("click", function(o) {
                    o.preventDefault, e.updateCookie({
                        cookie_consent: 1
                    }), e.triggerGtmEventCustom({
                        event: "open_popin_cookies_consent",
                        cookie_consent: 1,
                        clic_origin: "banner"
                    }), e.triggerGtmEventCustom({
                        event: "cookiebanner_event_ga",
                        cookie_consent_event_ga_action: "Ouverture Popin",
                        cookie_consent_event_ga_libelle: "Lien Bandeau Cookie"
                    }), e.showPopin()
                })
            }, this.injectPopin = function() {
                var e = this;
                document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", (0, c.popinTmpl)(this.config, this.trads));
                for (var o = document.querySelectorAll(".CookieOverlay")[0], t = [o.querySelectorAll(".CookieModal-actions button")[0], o.querySelectorAll(".CookieModal .CookieModal-inner .CookieModal-close")[0]], n = 0; n < t.length; n++) t[n].addEventListener("click", function(o) {
                    o.stopPropagation(), document.getElementsByClassName("CookieModal-inner")[0].scrollTop = 0, e.updateCookie({
                        cookie_consent: 1
                    }), "CookieBtn" == o.srcElement.className ? e.triggerGtmEventCustom({
                        event: "cookiebanner_event_ga",
                        cookie_consent_event_ga_action: "Fermeture Popin",
                        cookie_consent_event_ga_libelle: "Bouton bas popin"
                    }) : e.triggerGtmEventCustom({
                        event: "cookiebanner_event_ga",
                        cookie_consent_event_ga_action: "Fermeture Popin",
                        cookie_consent_event_ga_libelle: "Lien fermeture haut"
                    }), e.hidePopin(), e.hideBanner()
                });
                this.buildElementsPopin()
            }, this.hidePopin = function() {
                document.querySelectorAll(".CookieOverlay")[0].classList.add("hidden")
            }, this.showPopin = function() {
                document.querySelectorAll(".CookieOverlay")[0].classList.remove("hidden"), this.updateRadioInputs(this.cookieGtm)
            }, this.hideBanner = function() {
                document.querySelectorAll(".CookieBanner")[0].classList.add("hidden")
            }, this.init(), 1 == this.cookieGtm.cookie_consent && this.hideBanner()
        }
    }, , function(e, o, t) {}, function(e, o, t) {
        "use strict";
        t(3);
        var n, i = t(1);
        new((n = i) && n.__esModule ? n : {
            default: n
        }).default(cookie_banner_translations, cookie_banner_config)
    }]);
});

$(document).ready(function() {
    if($('[class=g-recaptcha-response]').length > 0) {
        let form = $('[class=g-recaptcha-response]').parents('form');
        $('[class=g-recaptcha-response]').parents('form').submit(function(event) {
            if($('[class=g-recaptcha-response]').val() === ""){
                event.preventDefault();
                $('html, body').animate({scrollTop: $(".g-recaptcha").offset().top - 100}, 300)
            }
        })
    }
});
$( document ).ready(function() {
    $('#department').hide();
    $('#country select').change(function() {
        if ($('#country select').val() == "FR"){
            $('#department').show();
        }
        else{
            $('#department').hide();
        }
    });
    if ($('#country select').val() == "FR"){
        $('#department').show();
    }
});