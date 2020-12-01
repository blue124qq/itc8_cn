function TimedContentContainer(element) {
    this.el = element;
    this.targetEl = this.el.find('.timed-markup').first();
    this.dataEl = this.el.find('.timed-data').first();
    this.dataJson = JSON.parse(this.dataEl.text());
    this.userTime = this.getUserTime();
    this.defaultMarkup = this.getDefaultItem(this.dataJson);
    this.currentMarkup = this.getCurrentMarkup(this.dataJson);

    if(this.currentMarkup !== "") {
        this.targetEl.html( this.currentMarkup );
    } else {
        this.targetEl.html( this.defaultMarkup );
    }

    this.jsComponent = this.targetEl.find("[data-jsclass]").first();
    this.jsClassInvoke = this.jsComponent.data('jsclass');

    // initiate the loaded component
    // var invokedCOmponent = new window[this.jsClassInvoke](this.jsComponent);

}

TimedContentContainer.prototype.getDefaultItem = function(json){
    var items = json.items,
        markup = "";

    items.forEach(function (item, i) {
        if(item.timeOfDay === "default") {
            markup = item.htmlMarkup;
        }
    });

    return markup;
};

TimedContentContainer.prototype.getCurrentMarkup = function(json){
    var self = this,
        items = json.items,
        markup = "";

    items.forEach(function (item, i) {
        if(item.timeOfDay !== "default") {
            var timeSplit = item.timeOfDay.split('-');

            if (self.userTime >= Number(timeSplit[0]) && self.userTime <= Number(timeSplit[1])) {
                markup = item.htmlMarkup;
            }
        }
    });

    return markup;
};

TimedContentContainer.prototype.getUserTime = function(){
    var date = new Date(),
        hours = (date.getHours() < 10) ? Number('0' + date.getHours()) : date.getHours(),
        minutes = (date.getMinutes() < 10) ? Number('0' + date.getMinutes()) : date.getMinutes();

    return (Number(hours +""+ minutes));
};

$(function () {
    $(".campaign-timedcontainer").each(function () {
        new TimedContentContainer($(this));
    });
});
