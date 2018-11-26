angular.module('starter')
  .controller('PopupMapCtrl', function ($scope, $rootScope, NgMap) {
    $scope.font =window.localStorage.getItem("font");  
    NgMap.getMap().then(function (map) {

      $rootScope.map = map;

    });

    $scope.latitude = window.localStorage.getItem("latitude");
    $scope.longitude = window.localStorage.getItem("longitude");

  })