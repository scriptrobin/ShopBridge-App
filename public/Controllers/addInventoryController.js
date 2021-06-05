angular.module("inventoryManagement").controller('addInventoryController' , function($scope, $state, commonService, $q) {
    
    $scope.inventoryDetails = {};
    $scope.selectedMenu = "inventoryList";
    $scope.fileName="Choose File"
    $scope.addInventory = function() {
      if(!$scope.inventoryDetails.name || !$scope.inventoryDetails.price || !$scope.inventoryDetails.description) {
          return false;
      }
      commonService.setInventoryData($scope.inventoryDetails);
      commonService.saveInventoryData(commonService._inventoryData).then(function() {
        commonService.showAlert("Successfully Added", "alert-success");
        $scope.selectedMenu = "inventoryList";
        $state.go("inventoryList");
      });
    };


    $scope.imageUpload = function(event) {
        var files = event.target.files;
        $scope.fileName = files[0].name;
        getBase64(files[0]).then(function(base64) {
            $scope.inventoryDetails.productImage = base64; 
            $scope.$apply();
        });
    };

});