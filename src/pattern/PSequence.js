/**
 * @depends Pattern.js
 */

var PSequence = new Class({
    Extends: Pattern,
    initialize: function(list, repeats, offset) {
        Pattern.prototype.initialize(this);
        this.list = list;
        this.repeats = repeats || 1;
        this.position = 0;
        this.offset = offset || 0;
    },

    next: function() {
        var returnValue;
        if (this.position < this.repeats * this.list.length) {
            var index = (this.position + this.offset) % this.list.length;
            var item = this.list[index];
            var value = this.valueOf(item);
            if (value != null) {
                if (!instanceOf(item, Pattern)) {
                    this.position += 1;
                }
                returnValue = value;
            }
            else {
                if (instanceOf(item, Pattern)) {
                    item.reset();
                }
                this.position += 1;
                returnValue = this.next();
            }
        }
        else {
            returnValue = null;
        }
        return (returnValue);
    },

    reset: function() {
        this.position = 0;
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            if (instanceOf(item, Pattern)) {
                item.reset();
            }
        }
    }
});
var Pseq = PSequence;

