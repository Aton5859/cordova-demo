var app = angular.module('myApp', []);
app.controller('customersCtrl', function ($scope, $http) {
    $http.get("http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks?token=59af77833ab84e0d8d37df2de08a0dab")
        .then(function (result) {
            $scope.infos = result.data.records;
        });
});