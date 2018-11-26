angular.module('starter')
.controller('UserRigthsAndObligationsCtrl', function($scope) {
    $scope.font =window.localStorage.getItem("font");  
})