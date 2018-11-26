angular.module('starter')
    .controller('SendUserMessageCtrl', function ($ionicLoading,$scope, $http, $state) {
        $scope.name = window.localStorage.getItem("names");
        $scope.sendMessage = function () {
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/messagesend.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { sender: window.localStorage.getItem("id"), receiver: window.localStorage.getItem("UserProfile"), msgtext: document.getElementById("message").value }

            });

            request.success(function (data) {
                document.getElementById("message").value = ""; 
                $ionicLoading.show({ template: 'Poruka je poslana! ', noBackdrop: true, duration: 3000 });
                
            }); 
        } 
    })