angular.module('starter')
    .controller('JoinUsCtrl', function ($scope,$ionicLoading, $stateParams, $ionicLoading, $ionicPlatform, $http, $state, $ionicPopup, $filter, $cordovaSQLite, $cordovaGeolocation, $cordovaSocialSharing, ionicTimePicker, ionicDatePicker, $cordovaLocalNotification) {
        $scope.events = [];
        $scope.popUp;
        $scope.id;
        $scope.idLogged;
        $scope.loggedInEvents=[];
        var url = "";
        $scope.font = window.localStorage.getItem("font");
 
        $ionicPlatform.ready(function () {
            callApi();
            function callApi() {  
                    var request = $http({
                        method: "POST",
                        url: 'http://freezura.eu/rest/frontevents.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                    });

                    request.success(function (data) {   
                        $scope.events = data;  
                    }); 
            } 
            // $scope.addMoreNews = function () {
            //     window.localStorage.setItem("start", +window.localStorage.getItem("start") + 5);
            //     callApi();
            // }
        });

        //Log in to the event
 
 
        /* Function for redirect to detailed page for the news by ID */
        $scope.viewNews = function (id) {
            $state.go('app.news-detail', { newsId: id });
        } 
    })