/*
 * 控制器模块
 */
angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $window, $rootScope) {
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
        $scope.logout = function () {
            $http({
                dataType: "delete",
                url: "http://192.168.3.14:8080/edi.initialfantasy_Web/v1/userauthrization",
                data: {
                    "token": $window.sessionStorage.token
                }
            })
                .success(function (newItems) {
                    alert("退出成功");
                    $window.sessionStorage.token = "";
                    window.location.href = "login.html"
                })
        }
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
    .controller('DashCtrl', function ($scope, $state, $rootScope) {
        $scope.stocktask = function () {
            $state.go('app.tab.chats', {});
        }
        $scope.reporthistory = function () {
            $state.go('app.tab.stockreporthistory', {});
        }
        // 显示tabs
        $scope.$on('$ionicView.enter', function () {
            $rootScope.hideTabs = false;
        })
    })
    .controller('ChatsCtrl', function ($scope, Chats, $http, $window, $ionicTabsDelegate) {
        //绑定页面数据
        $scope.chats = $http(
            {
                method: "jsonp",
                url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
                params: {
                    "token": $window.sessionStorage.token
                },
                hasCode: false
            })
            .success(function (newItems) {
                if (newItems.code == 0) {
                    $scope.chats = newItems.data;
                } else {
                    alert("获取任务清单失败");
                }
            })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        //列表刷新事件
        $scope.doRefresh = function () {
            try {
                $scope.chats = $http(
                    {
                        method: "jsonp",
                        url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?callback=JSON_CALLBACK",
                        params: {
                            "token": $window.sessionStorage.token
                        },
                        hasCode: false
                    })
                    .success(function (newItems) {
                        if (newItems.code == 0) {
                            $scope.chats = newItems.data;
                        } else {
                            alert("获取任务清单失败");
                        }
                    })
                    .finally(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                    })
            } catch (err) {
                alert(err);
            }
        };
        //搜索事件
        $scope.search = function () {
            var data = [{ "key": this.searchContent }];
            //搜索历史为空
            try {
                if ($window.localStorage.length == 0) {
                    $window.localStorage.setItem("searchHistory", JSON.stringify(data));
                    $scope.searchHistoryContent = JSON.parse($window.localStorage.getItem("searchHistory"));
                } else if ($window.localStorage.searchHistory != "" && $window.localStorage.searchHistory != undefined) {
                    //搜索历史不为空则插入新元素
                    var obj = JSON.parse($window.localStorage.getItem("searchHistory"));
                    //限定只存最近8个历史记录，超出则删除相比最早的搜索历史、搜索了之前搜过的放到最新
                    if (obj.length == 8) {
                        obj.splice(7, 1);
                        $window.localStorage.setItem("searchHistory", JSON.stringify(obj));
                        // obj = JSON.parse($window.localStorage.getItem("searchHistory"));
                    };
                    //不重复向搜索历史中插入相同数据
                    for (var i = 0; i < obj.length; i++) {
                        //搜索内容存在于搜索历史，则将其置于历史记录最新
                        if (obj[i].key == this.searchContent) {
                            obj.splice(i, 1);
                            obj.unshift({ "key": event });
                            $window.localStorage.setItem("searchHistory", JSON.stringify(obj));
                            break;
                        }
                        if (i == obj.length - 1 && obj[i].key != this.searchContent) {
                            //最新搜索置于最前
                            obj.unshift({ "key": this.searchContent });
                            $window.localStorage.setItem("searchHistory", JSON.stringify(obj));
                            $scope.searchHistoryContent = obj;
                            break;
                        }
                    }
                } else {
                    $window.localStorage.setItem("searchHistory", JSON.stringify(data));
                    $scope.searchHistoryContent = JSON.parse($window.localStorage.getItem("searchHistory"));
                }
            } catch (err) {
                alert(err);
            }
        };
        //绑定页面搜索历史值
        if ($window.localStorage.getItem("searchHistory") != "" && $window.localStorage.searchHistory != undefined) {
            $scope.searchHistoryContent = JSON.parse($window.localStorage.getItem("searchHistory"));
        } else {
            $scope.searchHistoryContent = "";
        }
        //搜索历史框的显示与隐藏在前端实现：ng-focus="searchHistory='true'" ng-blur="searchHistory='false'"
        //默认隐藏
        $scope.isShowSearchHistory = false;
        //删除搜索框输入内容
        $scope.delSearchContent = function () {
            this.searchContent = "";
        };
        //删除搜索历史
        $scope.delSearchHistory = function () {
            $window.localStorage.searchHistory = "";
            $scope.searchHistoryContent = null;
        }
        //点击搜索历史item，对item进行搜索
        $scope.historyName = function (event) {
            try {
                var obj = JSON.parse($window.localStorage.getItem("searchHistory"));
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].key == event) {
                        obj.splice(i, 1);
                        obj.unshift({ "key": event });
                        $window.localStorage.setItem("searchHistory", JSON.stringify(obj));
                        $scope.searchHistoryContent = obj;
                        break;
                    }
                }
            } catch (err) {
                alert(err);
            }
        }
    })
    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, $http, $state, $ionicTabsDelegate) {
        //绑定页面数据
        $scope.chat = Chats.get($stateParams, $scope);
        //新建库存汇报
        $scope.createStockReport = function () {
            $state.go('app.tab.stockreport', { stocktask: $stateParams });
        }
        //进入该页面事件
        $scope.$on('$ionicView.beforeEnter', function () {
            //关闭tab选项卡      
            $ionicTabsDelegate.showBar(false);
        });
        //行明细默认不展开
        $scope.isShowLineDetail = false;
    })
    .controller('StockReportCtrl', function ($scope, $state, $stateParams, $http, $window, $ionicModal) {
        $scope.task = $scope.$$prevSibling.chat;

        var json = [];
        var j = {};
        //表头赋值
        j.docEntry = $scope.$$prevSibling.chat.objectKey;
        j.comanyName = "中石化";
        j.docNum = $scope.$$prevSibling.chat.objectKey;
        j.period = "1";
        j.objectCode = "DF20180604";
        j.transfered = "F";
        j.createDate = "2018-07-04 00:00:00.0";
        j.createTime = null;
        j.updateDate = null;
        j.updateTime = null;
        j.createUserSign = "362";
        j.updateUserSign = null;
        j.documentStatus = "Y";
        j.postingDate = "2018-07-04 00:00:00.0";
        j.deliveryDate = null;
        j.documentDate = null;
        j.reference1 = "";
        j.reference2 = "";
        j.remarks = "测试任务汇报";
        j.b1DocEntry = $scope.$$prevSibling.chat.objectKey;
        j.bydUUID = "3697459";
        j.customType = "1";
        j.transactionType = "类";
        j.businessPartnerCode = "3698769";
        j.businessPartnerName = "yy";
        j.baseDocumentType = "好";
        j.baseDocumentEntry = "33";

        j.stockReportItems = [];
        var item = {};
        //行赋值
        item.docEntry = $scope.$$prevSibling.chat.objectKey;
        item.lineId = "1";
        item.objectCode = "DF20180604";
        item.lineStatus = "Y";
        item.reference1 = "汇报明细";
        item.reference2 = "汇报明细";
        item.baseDocumentType = "A";
        item.baseDocumentEntry = "1";
        item.baseDocumentLineId = "1";
        item.projectCode = null;
        item.distributionRule1 = null;
        item.distributionRule2 = null;
        item.distributionRule3 = null;
        item.distributionRule4 = null;
        item.distributionRule5 = null;
        item.originalDocumentType = "1";
        item.originalDocumentEntry = "1";
        item.originalDocumentLineId = "1";
        item.targetDocumentType = "1";
        item.targetDocumentEntry = "1";
        item.targetDocumentLineId = "1";
        item.itemCode = "DF";
        item.itemDescription = "中石化明细";
        item.quantity = "1";
        item.inventoryUoM = null;
        item.serialNumberManagement = "P";
        item.batchNumberManagement = "P";
        item.serviceNumberManagement = "P";
        item.price = "481.000000";
        item.currency = "CNY";
        item.currencyRate = "0.000000";
        item.lineTotal = "481.000000";
        item.fromWarehose = "北京";
        item.fromLocation = "中石化";
        item.toWarehouse = "深圳";
        item.toLocation = "湿地公园";
        item.batchNumber = "32";
        item.serialNumber = "32";
        item.barCode1 = null;
        item.barCode2 = null;
        item.barCode3 = null;
        item.barCode4 = null;
        item.barCode5 = null;


        j.stockReportItems.push(item);


        json.push(j);
        var a = JSON.stringify(json);


        $scope.report = {};
        $scope.report.docEntry = $scope.$$prevSibling.chat.objectKey;
        $scope.report.comanyName = '中石化';
        //if ($scope.$$prevSibling.chat.stockTaskItems.length != 0) {
        //    $scope.report.stockReportItems.
        //}
        $scope.save = function () {
            var array = [];
            array.push($scope.report)
            $http({
                //对象转数组let arr2 = Array.from(对象); 
                url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stockreports?token=" + $window.sessionStorage.token,
                method: "post",
                // dataType: "json",
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                headers: { 'Content-Type': 'application/json' },
                data: a
                //data: [{ "comanyName": "中石化", "docEntry": 34, "docNum": 34, "period": "1", "objectCode": "DF20180604", "transfered": "F", "createDate": "2018-06 - 04 00: 00:00.0", "createTime": null, "updateDate": "2018- 06 - 04 00: 00:00.0", "updateTime": null, "createUserSign": "362", "updateUserSign": null, "documentStatus": "Y", "postingDate": "2018- 06 - 04 00: 00:00.0", "deliveryDate": null, "documentDate": null, "reference1": "", "reference2": "", "remarks": "测试任务汇报", "b1DocEntry": 1, "bydUUID": "3697459", "customType": "1", "transactionType": "类", "businessPartnerCode": "3698769", "businessPartnerName": "yy", "baseDocumentType": "好", "baseDocumentEntry": 34, "stockReportItems": [{ "docEntry": 34, "lineId": 1, "objectCode": "DF20180604", "lineStatus": "Y", "reference1": "汇报明细", "reference2": "汇报明细", "baseDocumentType": "A", "baseDocumentEntry": 1, "baseDocumentLineId": 1, "projectCode": null, "distributionRule1": null, "distributionRule2": null, "distributionRule3": null, "distributionRule4": null, "distributionRule5": null, "originalDocumentType": "1", "originalDocumentEntry": 1, "originalDocumentLineId": 1, "targetDocumentType": "1", "targetDocumentEntry": 1, "targetDocumentLineId": 1, "itemCode": "DF", "itemDescription": "中石化明细", "quantity": null, "inventoryUoM": null, "serialNumberManagement": "P", "batchNumberManagement": "P", "serviceNumberManagement": "P", "price": 369.600000, "currency": null, "currencyRate": 0.000000, "lineTotal": 2.000000, "fromWarehose": "北京", "fromLocation": "北京", "toWarehouse": "北京", "toLocation": "北京", "batchNumber": "32", "serialNumber": "32", "barCode1": "物品", "barCode2": null, "barCode3": null, "barCode4": null, "barCode5": null }, { "docEntry": 34, "lineId": 2, "objectCode": "DF20180604", "lineStatus": "N", "reference1": "汇报明细", "reference2": "汇报明细", "baseDocumentType": "B", "baseDocumentEntry": 2, "baseDocumentLineId": 2, "projectCode": null, "distributionRule1": null, "distributionRule2": null, "distributionRule3": null, "distributionRule4": null, "distributionRule5": null, "originalDocumentType": "2", "originalDocumentEntry": 2, "originalDocumentLineId": 2, "targetDocumentType": "2", "targetDocumentEntry": 2, "targetDocumentLineId": 2, "itemCode": "DF", "itemDescription": "中石化明细", "quantity": null, "inventoryUoM": null, "serialNumberManagement": "P", "batchNumberManagement": "P", "serviceNumberManagement": "P", "price": 379.000000, "currency": null, "currencyRate": 0.000000, "lineTotal": 2.000000, "fromWarehose": "北京", "fromLocation": "北京", "toWarehouse": "北京", "toLocation": "北京", "batchNumber": "32", "serialNumber": "32", "barCode1": "物品", "barCode2": null, "barCode3": null, "barCode4": null, "barCode5": null }] }],
            })
                .success(function (result) {
                    //获取接口返回的数据
                    if (result.code == 0) {
                        alert("保存成功");
                        alert(a)
                    } else {
                        alert("保存失败，数据不符合格式");
                        alert(a)
                    }
                })
                .error(function (error) {
                    alert("服务器连接失败");
                })
        };
        $ionicModal.fromTemplateUrl('templates/iteminfocheck.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modalCheck = modal;
        });
        $ionicModal.fromTemplateUrl('templates/iteminfoedit.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modalEdit = modal;
        });
        $scope.saveItemInfo = function () {
            $scope.modalEdit.hide();
            $scope.modalCheck.hide();
        }
        $scope.edit = function () {
            $scope.modalEdit.show();
        }
        $scope.scan = function () {
            $scope.modalCheck.show();
        }
    })
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
    .controller('StockReportHistoryCtrl', function ($scope, $http, $window, $ionicTabsDelegate) {
        $scope.history = $http(
            {
                method: "jsonp",
                url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stockreports?callback=JSON_CALLBACK",
                params: {
                    "token": $window.sessionStorage.token
                },
                hasCode: false
            })
            .success(function (newItems) {
                if (newItems.code == 0) {
                    $scope.reports = newItems.data;
                } else {
                    alert("获取任务汇报历史失败");
                }
            })
        $scope.$on('$ionicView.beforeEnter', function () {
            //关闭tab选项卡      
            $ionicTabsDelegate.showBar(false);
        });
    })
    .controller('StockReportHistoryDetailCtrl', function ($scope, $stateParams, Reports, $http, $ionicTabsDelegate) {
        // ajax http请求中设置async属性为false，则等待返回结果。
        $scope.report = Reports.get($stateParams, $scope);
        $scope.$on('$ionicView.beforeEnter', function () {
            //关闭tab选项卡      
            $ionicTabsDelegate.showBar(false);
        });
        //行明细默认隐藏
        $scope.isShowLineDetail = false;
    })