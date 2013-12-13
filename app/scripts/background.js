'use strict';

chrome.commands.onCommand.addListener(function(command) {
    if (command === 'switch-tab-backwards') {
        var lastTab = manager.getLastTab();
        chrome.tabs.update(lastTab, {selected: true});
    }
});

// Register to tab change event
chrome.tabs.onHighlighted.addListener(function onHighlighted(info) {
    manager.insertAsLastTab(info.tabIds[0]);
});

var manager = (function () {
    var self = {};
    var tabStack = [];

    self.getLastTab = function getLastTab() {
        return tabStack[tabStack.length - 2];
    };

    self.insertAsLastTab = function insertAsLastTab(tab) {
        tabStack.push(tab);
    };

    return self;
})();