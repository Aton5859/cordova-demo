/*
 * 服务模块
 */
angular.module('starter.services', [])

.factory('Chats', function() {
  var chats = [{
    id: 0,
    name: '采购收货',
    lastText: 'P0577461',
    //face: 'img/ben.png'
  }, {
    id: 1,
    name: '库存转储',
    lastText: 'T0186545'
  }, {
    id: 2,
    name: '销售交货',
    lastText: 'S68785668'
  }, {
    id: 3,
    name: '销售交货',
    lastText: 'S682868'
  }, {
    id: 4,
    name: '销售交货',
    lastText: 'S68168'
  }];
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
