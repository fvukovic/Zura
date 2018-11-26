angular.module('starter')
    .controller('MyAngCtrl', function ($scope, $http, $state, $ionicPopup,$ionicLoading) {
        $scope.font = window.localStorage.getItem("font");
        $scope.popUp;

        var request = $http({
            method: "POST",
            url: 'http://dckzz-volonteri.hr/rest/getUserById.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{user:window.localStorage.getItem("id")}
    
        });
        request.success(function (data2) { 
            $scope.level= data2[0].Bodovi  
        });

        $scope.checkbox={
            checked :false
        };
        var request = $http({
            method: "POST",
            url: 'http://dckzz-volonteri.hr/rest/profileEvents.php',
            data: {id:window.localStorage.getItem("id") },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });
        
            request.success(function (data) { 
                $scope.events = data;  
            });
            request.error(function (data) {
                console.log("REGISTRACIJOOO MOJA: "+data); 
             

            });

 

    })