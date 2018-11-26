angular.module('starter')
.controller('UserDetailController', function ($scope, $http,$state) { 
    var request = $http({
        method: "POST",
        url: 'http://dckzz-volonteri.hr/rest/getUserById.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data:{user:window.localStorage.getItem("UserProfile")}

    });
    request.success(function (data2) { 
        $scope.level= data2[0].Bodovi 
        console.log(JSON.stringify(data2))
        $scope.user=[]; 
        $scope.name ="Detalji Korisnika";
        for (var key2 in data2[0]) {
            if (data2[0].hasOwnProperty(key2)) {
                console.log(key2 + " -> " + data2[0][key2]);
                $scope.user.push({
                    key:key2,
                    value:data2[0][key2]
                })
            }
        }
             
    });

})