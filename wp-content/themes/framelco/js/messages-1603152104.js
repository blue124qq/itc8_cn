/* TODO: make popover instead of alert */
function getQueryParams() {
	var params = {};location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){params[k]=v});
	return params;
}
(function($) {
	$(document).ready(function() {		
		var params = getQueryParams();
		if (params.error_message) {
			var alertMessage = unescape(params.error_message).replace(/^\/+|\/+$/g, '');
			setTimeout(function() {
				alert(alertMessage);
			},500);
		} else if (params.notification_message) {
			var notificationMessage = unescape(params.notification_message).replace(/^\/+|\/+$/g, '');
			setTimeout(function() {
				alert(notificationMessage);
			},500);
		}

        $("a[data-confirm]").on('click',function(e) {
            var url = $(this).attr('href');
            e.preventDefault();
            if (confirm($(this).data('confirm'))) {
                document.location.href = url;
            }
        });

	})
})(jQuery);