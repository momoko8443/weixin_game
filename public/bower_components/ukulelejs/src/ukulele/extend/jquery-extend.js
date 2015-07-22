/**
 * @author momoko
 */
(function ($) {
    $.fn.directText = function (text) {
        var o = "";
        this.each(function () {
            var nodes = this.childNodes;
            for (var i = 0; i <= nodes.length - 1; i++) {
                var node = nodes[i];
                if (node.nodeType === 3) {
                    
                    if (text || text ==="" || text === 0) {
                        node.nodeValue = text;
                        return;
                    } else {
                        o += node.nodeValue;
                    }
                }
            }
        });
        return $.trim(o);
    };

    $.fn.fuzzyFind = function (text) {
        if (this.length === 1) {
            var element = this[0];
            if (element && element.attributes) {
                for (var i = 0; i < element.attributes.length; i++) {
                    var attr = element.attributes[i];
                    if (attr.nodeName.search(text) > -1) {
                        return element;
                    }
                }
            }
        }
        return null;
    };
})(jQuery);