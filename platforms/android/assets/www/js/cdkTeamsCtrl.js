angular.module('starter')
.controller('CdkTeamsCtrl', function($scope, $ionicLoading, $ionicPlatform, $http, $stateParams, $state, $ionicPopup, $filter, $cordovaSQLite, $cordovaSocialSharing) {
    $scope.font =window.localStorage.getItem("font");  
    var request = $http({
        method: "POST",
        url: 'http://freezura.eu/rest/teams.php', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

    });

    request.success(function (data) {  
        $scope.teams = data; 
        console.log(JSON.stringify(data));
    });

    $scope.logInToEvent = function () { 
        var request = $http({
            method: "POST",
            url: 'http://freezura.eu/rest/eventsusers.php',
            data: { event:  $scope.idLogged, user_id: window.localStorage.getItem("id") },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });
        request.success(function (data) {
            $scope.homeNews = data
            console.log(data)
        });
        $scope.popUp.close();
        window.location.reload();
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

    $scope.sendComment = function () {    
        var request = $http({
            method: "POST",
            url: 'http://dckzz-volonteri.hr/rest/commentteam.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{idUser:window.localStorage.getItem("id"),idNews: $scope.id, comment : document.getElementById("comment").value}

        });
        request.success(function (data2) { 
            console.log(JSON.stringify(data2))
            $scope.comments=data2;    
            window.location.reload();
        });
    }

           /**
         * 
         * 
         * 
         */
        $scope.logInToEvent = function () { 
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/eventsusers.php',
                data: { event:  $scope.idLogged, user_id: window.localStorage.getItem("id") },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    
            });
            request.success(function (data) {
                $scope.homeNews = data
                console.log(data)
            });
            $scope.popUp.close();
            window.location.reload();
        }

    /* Function for sharing title of event on Facebook. */
    $scope.shareViaFacebook = function () {
        $ionicLoading.show({ template: 'Connecting to Facebook, please wait! ', noBackdrop: true, duration: 3000 });
        $cordovaSocialSharing.canShareVia("facebook", "null", null, url).then(function (result) {
            $cordovaSocialSharing.shareViaFacebook("null", null, url);
        }, function (error) { 
        });
    }
    /* Function for sharing title of event on Twitter. */
    $scope.shareViaTwitter = function () {
        $ionicLoading.show({ template: 'Connecting to Twitter, please wait! ', noBackdrop: true, duration: 3000 });
        $cordovaSocialSharing.canShareVia("twitter", "null", null, url).then(function (result) {
            $cordovaSocialSharing.shareViaTwitter("null", null, url);
        }, function (error) { 
        });
    }
    /* Function for sharing title of event on Instagram. */
    $scope.shareViaInstagram = function () {
        $ionicLoading.show({ template: 'Connecting with Facebook, please wait! ', noBackdrop: true, duration: 3000 });
        $cordovaSocialSharing.canShareVia("instagram", "null", null, url).then(function (result) {
            $cordovaSocialSharing.shareViaInstagram("null", null, url);
        }, function (error) { 
        });
    }

    /* Function for closing popup window on the X button */
    $scope.closePopUp = function () {
        $scope.popUp.close();
    }

    /* Opening pop up for comment */
    $scope.PopupComment = function (id) { 
        $scope.id=id;
        $scope.popUp = $ionicPopup.show({
            templateUrl: 'templates/popup-comment.html',
            scope: $scope,
        })
    }

    /* Opening pop up for sharing news on social networks */
    $scope.PopupShare = function (link) {
        url = link; 
        $scope.popUp = $ionicPopup.show({
            templateUrl: 'templates/popup-share.html',
            controller: this,
            scope: $scope,
        })
    }

    /* Opening pop up for check in on the news */
    $scope.PopupCheckIn = function (id) {
        $scope.idLogged = id; 
        $scope.popUp = $ionicPopup.show({
            templateUrl: 'templates/popup-check-in.html',
            scope: $scope,
        })
    }

    /* Function for redirect to detailed page for the news by ID */
    $scope.viewNews = function (id) { 
        $state.go('app.cdk-teams-detail', { newsId: id });
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