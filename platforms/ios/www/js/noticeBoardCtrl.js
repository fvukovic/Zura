angular.module('starter')
.controller('NoticeBoardCtrl', function($scope) {
    $scope.font =window.localStorage.getItem("font");    
})