/*
 * 控制器模块
 */
angular.module('starter.controllers', [])
.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    $scope.loginData = {};
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    $scope.login = function () {
        $scope.modal.show();
    };

    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})
.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: '采购收货P0577461', id: 1 },
      { title: '库存转储T0186545', id: 2 },
      { title: '销售交货S68785668', id: 3 },
      { title: '销售交货S682868', id: 4 },
      { title: '销售交货S68168', id: 5 },
      { title: '销售交货S684167', id: 6 }
    ];
})
.controller('PlaylistCtrl', function ($scope, $stateParams) {
})
.controller('DashCtrl', function ($scope) { })
.controller('ChatsCtrl', function ($scope, Chats, $http) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
    $scope.doRefresh = function () {
        $http.get('http://www.runoob.com/try/demo_source/item.json')   //注意改为自己本站的地址，不然会有跨域问题
            .success(function (newItems) {
                $scope.items = newItems;
            })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
    };
})
.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})
.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});