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

        //$scope.doLogin = function () {
        //    console.log('Doing login', $scope.loginData);
        //    $timeout(function () {
        //        $scope.closeLogin();
        //    }, 1000);
        //};
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
    .controller('HomeCtrl', function ($scope) { })
    .controller('DashCtrl', function ($scope) { })
    .controller('ChatsCtrl', function ($scope, Chats, $http) {
        $scope.chats = $http(
            {
                method: "jsonp",
                url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
                params: {
                    "token": "59af77833ab84e0d8d37df2de08a0dab"
                }
            })
            .success(function (newItems) {
                $scope.chats = newItems.data;
            })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        //$scope.remove = function (chat) {
        //    Chats.remove(chat);
        //};
    })
    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.objectkey);
    })
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    //.controller('actionsheetCtl', function ($scope, $timeout, $http) {
    //    $http(
    //        {
    //            method: "jsonp",
    //            url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
    //            params: {
    //                "token": "59af77833ab84e0d8d37df2de08a0dab"
    //            }
    //        })
    //        .success(function (newItems) {
    //            $scope.items = newItems.data;
    //        })
    //        .finally(function () {
    //            $scope.$broadcast('scroll.refreshComplete');
    //        });
    //    $scope.doRefresh = function () {
    //        $http(
    //            {
    //                method: "jsonp",
    //                url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
    //                params: {
    //                    "token": "59af77833ab84e0d8d37df2de08a0dab"
    //                }
    //            })
    //            .success(function (newItems) {
    //                $scope.items = newItems.data;
    //            })
    //            .finally(function () {
    //                $scope.$broadcast('scroll.refreshComplete');
    //            });
    //    };
    //})