/*
 * 服务模块
 */
angular.module('starter.services', [])
    .factory('Chats', function ($http) {
        var chats = [];
        var getTask = {
            method: "jsonp",
            url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
            params: {
                "token": "59af77833ab84e0d8d37df2de08a0dab"
            }
        };
        return {
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
