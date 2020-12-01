function CampaignHeaderAnimated(element) {
    this.el = element;
    this.loadimagecache = {};

    this.scene1 = this.el.find('.scene-first').first();
    this.scene2 = this.el.find('.scene-second').first();
    this.images = this.el.find('[preload-src]');

    this.timeText = this.scene1.find('.scene-first--text').first();
    this.scene1ImageMask = this.scene1.find('img.mask').first();

    this.finalText = this.scene2.find('.scene-second--text').first();
    this.finalTime = this.finalText.find('.time').first();

    var self = this;

    // preaload iamges since animation doesn't work without them
    this.preloadImages(this).then(function(){
        self.setUpTime();
        self.el.css('opacity',1);

        setTimeout(function(){
            self.doAnimation();
        }, 2000);
    });
}

CampaignHeaderAnimated.prototype.doAnimation = function() {
    var self = this;

    this.timeText.addClass('animate-text');

    setTimeout(function(){
        self.timeText.addClass('finished');
        self.scene1ImageMask.remove();

        self.scene2Transition();
    }, 1800);

};

CampaignHeaderAnimated.prototype.scene2Transition = function() {
    var self = this;

    this.scene2.addClass('active');
    this.scene1.find('img').css('opacity',0);

    setTimeout(function(){
        self.showFinal();
    }, 2000);
};

CampaignHeaderAnimated.prototype.showFinal = function() {
    var self = this;
    this.timeText.addClass('text-out');
    this.scene1.addClass('disable');
    this.finalText.addClass('text-active');


};

CampaignHeaderAnimated.prototype.setUpTime = function() {
    var date = new Date(),
        rawhours = date.getHours(),
        rawminutes = date.getMinutes(),
        hours = (rawhours > 12) ? (rawhours - 12) : rawhours,
        minutes = (rawminutes < 10) ? String('0' + rawminutes) : rawminutes,
        ampm = (rawhours >= 12) ? 'pm' : 'am',
        composedtime = String(hours + ':' + minutes + '' + ampm),
        hoursminutes = String(hours + '' + minutes),
        hoursminutessplit = hoursminutes.split(''),
        timelength = hoursminutessplit.length;

    this.finalTime.text(composedtime);

    if(timelength < 4){
        this.timeText.find('.item-3').remove();
    }

    var iset = (timelength-1);1
    for(var i=iset;i>=0;i--){
        var len = (i === (timelength - 1)) ? 3 : 1,
            targetEl = this.timeText.find('.item-' + (iset - i) + '> .slider');

        var markup = this.getNumberMarkup( hoursminutessplit[i],  len);

        targetEl.prepend(markup);

    }
};

CampaignHeaderAnimated.prototype.getNumberMarkup = function( number, itemstoget ) {
    var markup = [];

    for(var i=0;i<itemstoget;i++) {
        var numbercalc = Number(number - i);
        var numberfinal = (numbercalc >= 0) ? numbercalc : (10 + numbercalc);
        markup.push('<span>'+numberfinal+'</span>');
    }

    return markup.join('');
};

CampaignHeaderAnimated.prototype.preloadImages = function(){
  var imagesArray = [],
      self = this,
      deferred = $.Deferred();

  this.images.each(function(){
      imagesArray.push($(this).attr('preload-src'));
  });

  function preloadImage( index ) {
    if (index < imagesArray.length) {
        self.loadImage(imagesArray[index]).then(function (url) {
             var img = self.el.find('[preload-src="' + imagesArray[index] + '"]').first();
             img.attr('src', imagesArray[index]);
            preloadImage((index + 1));
        });
    } else {
        deferred.resolve();
    }
  }

  preloadImage(0);

  return deferred.promise();

};

CampaignHeaderAnimated.prototype.loadImage = function( imagesrc ){
    if(typeof this.loadimagecache[imagesrc] === "undefined") {
        var deferred = $.Deferred(),
            preloader = new Image();

            preloader.onload = function() {
                deferred.resolve(this.src);
            };

            preloader.onerror = function() {
                deferred.reject(this.src);
            };

            preloader.src = imagesrc;

            this.loadimagecache[imagesrc] = deferred;
    }

    return this.loadimagecache[imagesrc];
};

$(function() {
    $(".campaign-header-animated").each(function() {
        new CampaignHeaderAnimated($(this));
    });
});