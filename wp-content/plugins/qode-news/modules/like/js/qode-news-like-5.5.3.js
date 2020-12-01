(function($) {
    'use strict';

    var like = {};
    
    like.qodeOnDocumentReady = qodeOnDocumentReady;

    $(document).ready(qodeOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function qodeOnDocumentReady() {
        qodeNewsLikes();
    }

    function qodeNewsLikes() {
    	var likeDislike = $('.qode-news-like-dislike');

        $(document).on('click','.qode-news-like, .qode-news-dislike', function() {
            var clicked = $(this),
            	id = likeDislike.attr('id'),
                type,
                reaction = 'like';

            if ( likeDislike.hasClass('liked') ) {
                return false;
            }

            if (typeof likeDislike.data('type') !== 'undefined') {
                type = likeDislike.data('type');
            }

            if (clicked.hasClass('qode-news-dislike')){
            	reaction = 'dislike';
            }

            var dataToPass = {
                action: 'qode_news_like',
                likes_id: id,
                type: type,
                reaction: reaction
            };

            var like = $.post(QodeAdminAjax.ajaxurl, dataToPass, function( data ) {
                likeDislike.html(data).addClass('liked').attr('title', 'You already like/dislike this!');
            });

            return false;
        });
    }
    
})(jQuery);