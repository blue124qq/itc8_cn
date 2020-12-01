(function($) {
    $('.contact-form > div > .wp-block-buttons .wp-block-button__link').click(function(){
        $(this).parents('.contact-form').toggleClass('open');
        $(this).hide();
    });

    $(document).ready(function() {
       $('.acf-field-true-false input[type="checkbox"]').on('change',function(e) {
            $(this).closest('label').toggleClass('selected');
        });
    })
})(jQuery);
