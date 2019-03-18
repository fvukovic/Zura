angular.module('starter')

    .controller('NewsDetailCtrl', function ($scope, $ionicLoading, $ionicPlatform, $ionicModal, $http, $stateParams , $state, $ionicPopup, $filter, $cordovaSQLite, $cordovaGeolocation, $cordovaSocialSharing, ionicTimePicker, ionicDatePicker, $cordovaLocalNotification) {
        $scope.news;
        $scope.comments= [];  
        $scope.loggedIn=false; 
        $scope.font = window.localStorage.getItem("font"); 

        var request = $http({
            method: "POST",
            url: 'http://freezura.eu/rest/getAllLoggedEvents.php', 
            data: { user_id: window.localStorage.getItem("id")},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        }); 
        request.success(function (data) {  
           for(var x=0;x<data.length;x++){
               console.log(data[x].event + "   "+$stateParams.newsId )
               if(data[x].event==$stateParams.newsId){ 
                $scope.loggedIn=true;
               }
           }
        });  


        var request = $http({
            method: "POST",
            url: 'http://freezura.eu/rest/details.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{id:$stateParams.newsId}

        });
        request.success(function (data) { 
            alert(JSON.stringify(data))
            $scope.vijest = data[0]; 
            if($scope.vijest.category == 1){
                $scope.title = "Radionice"
            }else if($scope.vijest.category == 2){
                $scope.title = "Vijesti"   
            }else if($scope.vijest.category == 3){
                $scope.title = "Freezura preporučuje" 
             }

            var request = $http({
                method: "POST",
                url: 'http://freezura.eu/rest/commentsget.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data:{event:$stateParams.newsId}
    
            });
            request.success(function (data2) { 
                console.log(JSON.stringify(data2))
                $scope.comments=data2;   
    
            });

        });

        $scope.logInToEvent = function () { 
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/eventsusers.php',
                data: { event:  $stateParams.newsId, user_id: window.localStorage.getItem("id") },
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
                url: 'http://dckzz-volonteri.hr/rest/comment.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data:{idUser:window.localStorage.getItem("id"),idNews:$stateParams.newsId, comment : document.getElementById("comment").value}
    
            });
            request.success(function (data2) { 
                console.log(JSON.stringify(data2))
                $scope.comments=data2;    
                window.location.reload();
            });
        }

        $scope.showMap = function (longitude, latitude) {
            window.localStorage.setItem("longitude", longitude);
            window.localStorage.setItem("latitude", latitude);
            $state.go('app.popup-map');
        }

        /**
  * Opening pop up for showing the event on map
  */
        $scope.PopupShowMap = function (longitude, latitude) {
            $scope.latitude = latitude;
            $scope.longitude = longitude;
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-map.html',
                scope: $scope,
            })
        }

        $scope.PopupComment = function (id) { 
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-comment.html',
                scope: $scope,
            })
        }

        $scope.comment = function(){ 
        }
        $scope.PopupCreateReminder = function (id) { 
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-reminder.html',
                controller: this,
                scope: $scope,
            })
        }
        $scope.PopupAddToFavorites = function (id) {
            $scope.id = id;
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-favorites.html',
                scope: $scope,
            })
        }
        $scope.PopupShare = function (link) {
            url = link; 
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-share.html',
                controller: this,
                scope: $scope,
            })
        }
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

        /**
     * Function for sharing title of event on Facebook.
     */
        $scope.shareViaFacebook = function () {
            $ionicLoading.show({ template: 'Connecting to Facebook, please wait! ', noBackdrop: true, duration: 3000 });
            $cordovaSocialSharing.canShareVia("facebook", "null", null, url).then(function (result) {
                $cordovaSocialSharing.shareViaFacebook("null", null, url);
            }, function (error) { 
            });
        }

        $scope.shareViaTwitter = function () {
            $ionicLoading.show({ template: 'Connecting to Twitter, please wait! ', noBackdrop: true, duration: 3000 });
            $cordovaSocialSharing.canShareVia("twitter", "null", null, url).then(function (result) {
                $cordovaSocialSharing.shareViaTwitter("null", null, url);
            }, function (error) { 
            });
        }

        $scope.shareViaInstagram = function () {
            $ionicLoading.show({ template: 'Connecting with Facebook, please wait! ', noBackdrop: true, duration: 3000 });
            $cordovaSocialSharing.canShareVia("instagram", "null", null, url).then(function (result) {
                $cordovaSocialSharing.shareViaInstagram("null", null, url);
            }, function (error) { 
            });
        }

        /**
 * Date and time picker object and functions
 * 
 */
        var ipObj = {
            callback: function (val) {  //Mandatory 

                $scope.date = $filter('date')(new Date(val), 'dd-MM-yyyy');
            },
            disabledDates: [            //Optional
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2017, 1, 1), //Optional
            to: new Date(2100, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional
        };

        $scope.openDatePicker2 = function () {
            ionicDatePicker.openDatePicker(ipObj);
        };

        var ipObj1 = {
            callback: function (val) {      //Mandatory


                var selectedTime = new Date(val * 1000);
                $scope.time = selectedTime.getHours() - 1 + ":" + selectedTime.getMinutes();




            },
            inputTime: 50400,   //Optional
            format: 24,         //Optional
            step: 15,           //Optional
            setLabel: 'Set'    //Optional

        };

        $scope.openTimePicker = function () {
            ionicTimePicker.openTimePicker(ipObj1);
        }

        $ionicModal.fromTemplateUrl('image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
      
          $scope.openModal = function() {
            $scope.modal.show();
          };
      
          $scope.closeModal = function() {
            $scope.modal.hide();
          };
      
          //Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
          // Execute action on hide modal
          $scope.$on('modal.hide', function() {
            // Execute action
          });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });
          $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
          });
      
          $scope.imageSrc = 'https://ionicframework.com/img/ionic-logo-blog.png';
      
          $scope.showImage = function(image) { 
              $scope.imageSrc = image;
            $scope.openModal();
          }
        






    }) 