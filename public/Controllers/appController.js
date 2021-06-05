var inventoryApp = angular.module("inventoryManagement", ['ui.router']);

inventoryApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('home');
      $stateProvider.state('addInventory', {
        url: '/home',
        templateUrl:'./views/addInventory.html',
        controller: "addInventoryController"
           
    })
    .state('inventoryList', {
        url: '/inventoryList',
        templateUrl:'./views/inventoryList.html',
        controller: "inventoryListController"
    });
});


inventoryApp.directive('inventroyDetails', [function() {
 return {
    restrict: 'E',
    template:'<div class="row">'+
                '<div class="col-md-6 ">'+
                    '<div class="inventory-img-box" >'+
                       '<img class="inventory-img" ng-src="{{selectedInventory.productImage}}"/>'+
                    '</div>'+
                    '<div class="form-group" ng-if=!selectedInventory.isView style="margin-top:10px">'+
                      '<div class="custom-file">'+
                        '<input type="file" class="custom-file-input" id="inputGroupFile02" onchange="angular.element(this).scope().imageUpload(event)">'+
                        '<label class="custom-file-label" for="inputGroupFile02">{{fileName}}</label>'+
                       '</div>'+
                     '</div>'+
               '</div>'+

               '<div class="col-md-6">'+
                  '<div class="form-group">'+
                     '<label for="inputAddress2">Name</label>'+
                     '<input type="text" class="form-control" ng-disabled=selectedInventory.isView ng-model="selectedInventory.name" required>'+
                   '</div>'+
                   '<div class="form-group">'+
                     '<label for="inputAddress2">Price</label>'+
                     '<input type="text" class="form-control" ng-disabled=selectedInventory.isView ng-model="selectedInventory.price" required>'+
                   '</div>'+
                   '<div class="form-group">'+
                     '<label for="inputAddress2">Description</label>'+
                     '<input type="text" class="form-control" ng-disabled=selectedInventory.isView ng-model="selectedInventory.description" required>'+
                   '</div>'+
                   '<div class="form-group">'+
                     '<label for="inputAddress2">Keyword</label>'+
                     '<input type="text" class="form-control" ng-disabled=selectedInventory.isView ng-model="selectedInventory.keywords" required>'+
                   '</div>'+
                   '<div class="form-group" >'+
                     '<button type="submit" class="btn btn-primary" ng-if="!selectedInventory.isView" style="float: right" ng-click="editInventory()">Submit</button>'+
                     '<button type="submit" class="btn btn-primary" ng-if="selectedInventory.isView" style="float: right" ng-click="editInventory()">Ok</button>'+
                   '</div>'+
               '</div>'+
             '</div>'
 }
}]);

inventoryApp.controller('appController' , function($scope, commonService, $state) {
  $scope.selectedMenu = "home";
  $state.go('home')
  $scope.changeMenu = function(menu) {
      $scope.selectedMenu = menu;
  };

});

function getBase64(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(reader.result);
    }
    reader.onerror = function() {
      reject();
    } 
  });
};