/*
 * 加载所需要的各个模块
 * 上篇教程中加载了controllers控制器模块
 * 本篇教程加载了services服务模块
 */
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    // 对页面进行tab的隐藏/显示设置
    .directive('showTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $rootScope.hideTabs = false;
            }
        };
    })
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $rootScope.hideTabs = true;
            }
        };
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //用来配置各个平台导航条样式（统一导航条位置）
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        //配置路由
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
            })
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'AppCtrl'
                    }
                }
            })
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('tab.chats', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/dash/:objectKey',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
            .state('tab.stockreport', {
                url: '/stockreport',
                params: { 'stocktask': null },
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/stockreport.html',
                        controller: 'StockReportCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.stockreporthistory', {
                url: '/stockreporthistory',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/stockreporthistory.html',
                        controller: 'StockReportHistoryCtrl'
                    }
                }
            })
            .state('tab.stockreporthistorydetail', {
                url: '/stockreporthistory/:docEntry',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/stockreporthistorydetail.html',
                        controller: 'StockReportHistoryDetailCtrl'
                    }
                }
            })
        //tab页的初始页面
        $urlRouterProvider.otherwise('/tab/home');
    });