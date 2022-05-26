var xPathToCss = require('xpath-to-css');

var actionsHolder = {
    XPathCSSFilter : (selectorValue) => {
        let cssValue;
        if(selectorValue[0] === '/') {
            cssValue = xPathToCss(selectorValue);
        } else {
            cssValue = selectorValue;
        }
        return cssValue;
    },

    RetreiveSelectorClass : (value, page) => {
        const elementSelector = page[value];
        const cssValue = elementSelector || this.XPathCSSFilter(value);
        return cssValue;
    }
};

module.exports = actionsHolder;
