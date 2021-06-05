angular.module("inventoryManagement").factory('commonService', function ($http, $q) {

     var commonService = {};
     commonService._inventoryData = [];
     commonService.setInventoryData = function(data) {
         this._inventoryData.push(data);
         this.saveInventoryData(this._inventoryData).then(function() {
             commonService.showAlert("Successfully Added", "alert-success");
         })

     };

     commonService.saveInventoryData = function(data) {
        var deffered = $q.defer();
        $http({
            method: 'POST',
            url: "/submitinventory",
            data: JSON.stringify(data)
        }).then(function successCallback(response) {
            deffered.resolve(response);
        }, function errorCallback(response) {
            commonService.showAlert("Response Failed", "alert-danger");
            deffered.reject();
        });
        return deffered.promise;
     };
     

     commonService.getInventoryData = function() {
        return this._inventoryData;
     };

     commonService.getInventoryDataApi = function() {
        var deffered = $q.defer();
        $http({
            method: 'GET',
            url: "/getInventory",
        }).then(function successCallback(response) {
            commonService._inventoryData = response.data;
            deffered.resolve();
        }, function errorCallback(response) {
            commonService.showAlert("Response Failed", "alert-danger");
            deffered.reject();
        });
        return deffered.promise;
     };

     commonService.showAlert = function(msg, className) {
        angular.element("#modalAlert")[0].innerHTML = msg;
        angular.element("#modalAlert").removeClass();
        angular.element("#modalAlert").addClass("alert "+className);
        angular.element("#alertMsgModal").modal('show');
    };


     return commonService;
});