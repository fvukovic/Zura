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
  
      
            callApi();

        $scope.addMoreNews = function () {
            window.localStorage.setItem("start", +window.localStorage.getItem("start") + 5);
            callApi();
        }

        function callApi() {
                 
            var request = $http({
                method: "POST",
                url: 'http://freezura.eu/rest/categoryevents.php',
                data: { kategorija: window.localStorage.getItem("category"), start:  window.localStorage.getItem("start") },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            });

            request.success(function (data) { 
                $scope.events.push.apply($scope.events,data);
        });
        } 

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
 
 

       
        /* Function for redirect to detailed page for the news by ID */
        $scope.viewNews = function (id) { 
            $state.go('app.news-detail', { newsId: id });
        }
 
    })