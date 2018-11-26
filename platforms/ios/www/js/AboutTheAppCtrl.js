angular.module('starter')
.controller('AboutTheAppCtrl', function($scope) {
    $scope.font =window.localStorage.getItem("font");  
    var x = 0;
    $scope.count = function(){  
        x=x+1;
        if(x==7){ 
            alert("Volim te Josipa!! <3");
        }
    }
})