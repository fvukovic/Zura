angular.module('starter')

    .controller('cdkTeamsDetailCtrl', function ($scope, $ionicLoading, $ionicPlatform, $http, $stateParams, $state, $ionicPopup, $filter, $cordovaSQLite, $cordovaSocialSharing) {
        $scope.news; 
        $scope.font = window.localStorage.getItem("font");

         /* Post request for selected news by ID on api */
         var request = $http({
            method: "POST",
            url: 'http://dckzz-volonteri.hr/rest/teams.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });
        request.success(function (data) {  
            for (var x = 0; x < data.length; x++) { 
                if (data[x].id == $stateParams.newsId) { 
                    $scope.vijest = data[x];
                }
            }   

            var request2 = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/commentsteamget.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data:{team:$stateParams.newsId}
    
            });
            request2.success(function (data2) { 
                console.log(JSON.stringify(data2))
                $scope.comments=data2;   
    
            });

        });


        
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
            data:{idUser:window.localStorage.getItem("id"),idNews:$stateParams.newsId, comment : document.getElementById("comment").value}

        });
        request.success(function (data2) { 
            console.log(JSON.stringify(data2))
            $scope.comments=data2;    
            window.location.reload();
        });
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
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-check-in.html',
                scope: $scope,
            })
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
    })
