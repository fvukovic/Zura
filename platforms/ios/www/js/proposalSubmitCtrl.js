angular.module('starter')
.controller('ProposalSubmitCtrl', function($scope) {
    $scope.font =window.localStorage.getItem("font");  
})