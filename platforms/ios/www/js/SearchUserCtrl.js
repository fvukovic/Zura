angular.module('starter')
    .controller('SearchUserCtrl', function ($ionicPopup,$ionicLoading, $scope, $http, $state) {
        $scope.users = [];

        $scope.searchUser = function () {  
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/searchUsers.php',
                data: { search: document.getElementById("user").value },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            }); 
            request.success(function (data) { 
                console.log(JSON.stringify(data));
                $scope.users=data;
            });
           
        }

        
    $scope.openUserPopUp = function (name,surname,id) { 
        window.localStorage.setItem("UserProfile",id);
        window.localStorage.setItem("names",name+ " "+surname);
        $scope.username = name + " "+surname; 
        $scope.popUp = $ionicPopup.show({
            templateUrl: 'templates/popup-user-click.html',
            scope: $scope,
        })
    }

    $scope.closePopUp = function () {
        $scope.popUp.close();
    }

    $scope.goToUserProfile = function () { 
      
        $state.go("app.user_detail");
        $scope.popUp.close(); 
    }

    $scope.sendMessageToUser = function () { 
        
          $state.go("app.send_message");
          $scope.popUp.close(); 
      }
    })