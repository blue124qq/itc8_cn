/**
 * @param {string} token
 */
function captchaCallback(token) {
	$("form input[name=\"CaptchaToken\"]").val(token);
}

var forms = $("form fieldset").filter(function () {
	return $(this).find("input[name=\"CaptchaToken\"]").length > 0;
});

if (forms.length > 0) {
	forms.each(function(index, form) {
		var captcha = $("<div class=\"g-recaptcha\" data-callback=\"captchaCallback\" data-sitekey=\"" + $(form).find("input[name=\"CaptchaToken\"]").first().data("key") + "\"></div>");

		$(this).append(captcha);
	});

	var script = document.createElement("script");
	script.src = "https://www.google.com/recaptcha/api.js";
	document.body.appendChild(script);
}