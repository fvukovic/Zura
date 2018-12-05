angular.module('starter')
    .controller('CategoryCtrl', function ($scope, $ionicLoading, $ionicPlatform, $http, $state, $ionicPopup, $filter, $cordovaSQLite, $cordovaGeolocation, $cordovaSocialSharing, ionicTimePicker, ionicDatePicker, $cordovaLocalNotification) {
        $scope.events = [];
        $scope.popUp;
        $scope.id;
        $scope.idLogged;
        $scope.font = window.localStorage.getItem("font");
        $scope.loggedInEvents=[];
        $scope.category;
        window.localStorage.setItem("start",0)
        var url = ""; 

 
        if (window.localStorage.getItem("category") == 1) {
            $scope.title = "Radionice"
            $scope.category =1;
        } else if (window.localStorage.getItem("category") == 2) {
            $scope.title = "Vijesti";
            $scope.category =2;
        }  
 

        $ionicPlatform.ready(function () {
      
            callApi();
            function callApi() {
                 
                    var request = $http({
                        method: "POST",
                        url: 'http://freezura.eu/rest/categoryevents.php',
                        data: { kategorija: window.localStorage.getItem("category"), start:  window.localStorage.getItem("start") },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                    });

                    request.success(function (data) { 
                        $scope.events = data;
                });
            }
            console.log("OVOOO: " + JSON.stringify($scope.events));
            $scope.addMoreNews = function () {
                window.localStorage.setItem("start", +window.localStorage.getItem("start") + 5);
                callApi();
            }
        });

        /*Login to a event with user_id*/

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
        /* Function for removing favorite news */
        $scope.removeFavorite = function (id) {
            var query = "DELETE from favorites where id = ?";
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, [id]).then(function (res) {
                console.log("insertId: " + res.insertId);
                for (var x = 0; x < $scope.events.length; x++) {
                    if (id == $scope.events[x].id) {
                        $scope.events[x].favorit = 1;
                    }
                }
            }, function (err) {
                console.error(err[0]);
            });
            $state.go($state.current, {}, { reload: true });
        }

        //adding favorite in database
        $scope.addFavorits = function () {
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/allEvents.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) {
                db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                for (var v = 0; v < data.length; v++) {
                    if (data[v]["id"] == $scope.id) {
                        $scope.title = data[v]["title"];
                        $scope.date = data[v]["date"];
                        $scope.text = data[v]["text"];

                        for (var x = 0; x < $scope.events.length; x++) {
                            if ($scope.id == $scope.events[x].id) {
                                $scope.events[x].favorit = 2;
                            }
                        }
                        var query = "INSERT INTO favorites (id, title,date,description) VALUES (?,?,?,?)";
                        $cordovaSQLite.execute(db, query, [$scope.id, $scope.title, $scope.date, $scope.text]).then(function (res) {
                            $state.go("app.home", {}, { reload: true });
                        }, function (err) {
                            console.error(err);
                        });

                    }
                }
                $scope.popUp.close();
            });
        }

        $scope.sendComment = function () {  
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/comment.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data:{idUser:window.localStorage.getItem("id"),idNews:$scope.id, comment : document.getElementById("comment").value}
    
            });
            request.success(function (data2) { 
                console.log(JSON.stringify(data2))
                $scope.comments=data2;    
                window.location.reload();
            });
        }

        /* Function for creating new local notification for one event */

        $scope.addNotification = function () {
            var timeForNotification = document.getElementById("time").value + "";
            var dateForNotification = document.getElementById("date").value + "";
            var dateArray = dateForNotification.split("-");
            var timeArray = timeForNotification.split(":");
            var alarmTime = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            alarmTime.setUTCHours(+timeArray[0] - 1);
            alarmTime.setUTCMinutes(timeArray[1]);

            cordova.plugins.notification.local.schedule({
                id: $scope.id,
                date: alarmTime,
                message: "Reminder for news",
                icon: 'res://logo.png',
                title: $scope.title
            });
            $scope.popUp.close();
        }

        /* Function for closing popup window on the X button */
        $scope.closePopUp = function () {
            $scope.popUp.close();
        }

        /* Opening pop up for showing the event on map */
        $scope.PopupShowMap = function (longitude, latitude) {
            $scope.latitude = latitude;
            $scope.longitude = longitude;
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-map.html',
                scope: $scope,
            })
        }

        /* Opening pop up for comment */
        $scope.PopupComment = function (id) { 
            $scope.id=id;
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-comment.html',
                scope: $scope,
            })
        }

        /* Opening pop up for creating a reminder */
        $scope.PopupCreateReminder = function (id) { 
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-reminder.html',
                controller: this,
                scope: $scope,
            })
        }

        /* Opening pop up for adding news to favorites */
        $scope.PopupAddToFavorites = function (id) {
            $scope.id = id;
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-favorites.html',
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
            if(window.localStorage.getItem("id")==null){
                $state.go("app.login");
                return;
            }
            $scope.idLogged = id;
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/popup-check-in.html',
                scope: $scope,
            })
        }
        /* Function for redirect to detailed page for the news by ID */
        $scope.viewNews = function (id) { 
            $state.go('app.news-detail', { newsId: id });
        }

        /* Date and time picker object and functions */
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
    })