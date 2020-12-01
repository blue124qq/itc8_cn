var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var players = [];

function onYouTubeIframeAPIReady() {
    if (players.length === 0 && $('.video-holder').length) {
        $('.video-item').each(function () {
            var closeBtn = $(this).siblings('.close');
            var textHolder = $(this).parent().parent().siblings('.text-holder');
            var player = new YT.Player(this, {
                height: '360',
                width: '640',
                videoId: $(this).data('video-id'),
                events: {
                    'onStateChange': function (state) {
                        if (state.data === 1) {
                            ytvideoFunction.careerContentVideo(false, closeBtn, textHolder);
                        }
                        if (state.data === 0) {
                            ytvideoFunction.careerContentVideoEnded(false, closeBtn);
                        }
                    }
                }
            });
            players.push(player);
        });
    }
}

var ytvideoFunction = {
    careerContentVideo: function (playing, closeBtn, textHolder) {
        if (!playing) {
            closeBtn.show();
            textHolder.addClass('move');
        }
    },
    careerContentVideoEnded: function (playing, closeBtn) {
        if (!playing) {
            closeBtn.click();
        }
    }
};

$(window).load(function () {
    $('.media-content-block .video-holder .close').click(function () {
        var $self = $(this);
        $self.hide();
        $(players).each(function () {
            if ($(this.a).is($self.siblings('iframe'))) {
                this.stopVideo();
            }
        });
        $self.parent().parent().siblings('.text-holder').removeClass('move');
    });    
});
