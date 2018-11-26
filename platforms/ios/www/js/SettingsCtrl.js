angular.module('starter')
.controller('SettingsCtrl', function($scope,$http) {
    $scope.font =window.localStorage.getItem("font"); 
    $scope.smjerovi = [];
    $scope.smjerovi.push({
     title: "14",
     id: "Manja",
    
    })
     $scope.smjerovi.push({
     title: "17",
     id: "Srednja",
    
    })
     $scope.smjerovi.push({
     title: "20",
     id: "Velika",
    
    }) 
    $scope.saveSettings = function(dont){
        window.localStorage.setItem("font",dont); 
        window.location.reload();
    }
})