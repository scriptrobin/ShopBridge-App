angular.module("inventoryManagement").controller('inventoryListController' , function($scope, $state, commonService, $q) {

$scope.showList = true;
$scope.selectedMenu = "home";
$scope.fileName="Choose File";


$scope.applyDataTable = function() {
  if($scope.inventoryList  && $scope.inventoryList.length == 0) {
      $('#inventoryTable').DataTable().clear();
  }
};

$scope.showListDetails = function(list) {
    $scope.showList = false;
    list.isView = true;
    $scope.selectedInventory=list;
};

$scope.editDetails = function(list) {
    $scope.showList = false;
    list.isView = false;
    $scope.selectedInventory=list; 
};

$scope.editInventory = function() {
    if($scope.selectedInventory.isView) {
        $scope.showList = true;
        return;
    }
    commonService.saveInventoryData(commonService._inventoryData).then(function() {
       commonService.showAlert("Updated Successfully", "alert-success");
       $scope.showList = true;
    }, function() {
        
    });
};

$scope.deleteList = function(index) {
  $scope.inventoryList.splice(index, 1);
  commonService.saveInventoryData($scope.inventoryList).then(function(res) {
      commonService.showAlert("Deleted Successfully", "alert-success");
  }, function() {

  });
};

$scope.imageUpload = function(event) {
    var files = event.target.files;
    $scope.fileName = files[0].name;
    getBase64(files[0]).then(function(base64) {
        $scope.selectedInventory.productImage = base64; 
        $scope.$apply();
    });
};

commonService.getInventoryDataApi().then(function() {
    $scope.inventoryList = commonService.getInventoryData();
    $(document).ready( function () {
        $('#inventoryTable').DataTable();
    } );
})


});