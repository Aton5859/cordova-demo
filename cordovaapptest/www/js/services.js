/*
 * 服务模块
 */
angular.module('starter.services', [])
    .factory('Chats', function ($http) {
        //var getTask = {
        //    method: "jsonp",
        //    url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
        //    params: {
        //        "token": "59af77833ab84e0d8d37df2de08a0dab"
        //    }
        //};
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

            //get: function (objectkey) {
            //    $http({
            //        async:false,
            //        url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktaskitems?callback=JSON_CALLBACK",
            //        method: "jsonp",
            //        //token: "59af77833ab84e0d8d37df2de08a0dab",
            //        //params:array,
            //        params: {
            //            "objectKey": objectkey.objectKey,
            //            "token": "59af77833ab84e0d8d37df2de08a0dab"
            //        }
            //    })
            //        .success(function (result) {
            //            //获取接口返回的数据
            //            if (result.code == 0 && result.data.length != 0) {
            //                return result.data[0];
            //            } else {
            //                return null;
            //            }
            //        })
            //}
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
