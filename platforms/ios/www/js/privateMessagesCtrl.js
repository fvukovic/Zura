angular.module('starter')
.controller('PrivateMessagesCtrl', function($scope,$http,$ionicPopup, $state) {
    $scope.font =window.localStorage.getItem("font");  
    var request = $http({
        method: "POST",
        url: 'http://dckzz-volonteri.hr/rest/messageget.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: { receiver: "1538" }

    });

    request.success(function (data) {
        $scope.messages = data; 
    });

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