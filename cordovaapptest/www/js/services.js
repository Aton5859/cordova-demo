/*
 * 服务模块
 */
angular.module('starter.services', [])
    .factory('Chats', function ($http) {
        return {
            //remove: function (chat) {
            //    chats.splice(chats.indexOf(chat), 1);
            //},
            get: function (objectKey, page) {
                for (var i = 0; i < page.$$prevSibling.chats.length; i++) {
                    if (page.$$prevSibling.chats[i].objectKey == objectKey.objectKey) {
                        return page.$$prevSibling.chats[i];
                    }
                    if (i == page.$$prevSibling.chats.length - 1) {
                        return null;
                    }
                }
            }
        };
    })

    .factory('Reports', function ($http) {
        return {
            get: function (docEntry, page) {
                for (var i = 0; i < page.$$prevSibling.reports.length; i++) {
                    if (page.$$prevSibling.reports[i].docEntry == docEntry.docEntry) {
                        return page.$$prevSibling.reports[i];
                    }
                    if (i == page.$$prevSibling.reports.length - 1) {
                        return null;
                    }
                }
            }
        };
    });
