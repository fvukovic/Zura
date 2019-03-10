angular.module('starter')
  .controller('JoinUsCtrl', function ($scope, $ionicLoading, $stateParams, $ionicLoading,$ionicPopup, $ionicPlatform, $http, $state, $ionicPopup, $filter, $cordovaSQLite, $cordovaGeolocation, $cordovaSocialSharing, ionicTimePicker, ionicDatePicker, $cordovaLocalNotification) {

    $ionicPlatform.ready(function () { 
      callApi();
      function callApi() {
        var request = $http({
          method: "POST",
          url: 'http://freezura.eu/rest/detailsTexts.php',
          data:{id:2},
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        request.success(function (data) {
            $scope.data = data[0]  
        });

        var request2 = $http({
          method: "POST",
          url: 'http://freezura.eu/rest/detailsTexts.php',
          data:{id:5},
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        request2.success(function (data) {
            $scope.popup = data[0]  
        });

      }

      $scope.openPrivacyPopup = function(){ 
          $scope.popUp = $ionicPopup.show({
              templateUrl: 'templates/privacy-popup.html',
              controller: this,
              scope: $scope,
          }) 
      }
      $scope.closePopUp = function () {
        $scope.popUp.close();
    }

      $scope.joinUs = function () {
        var ime = document.getElementById("ime").value;
        if (ime == "") {
          ime = ime
          alert("Molim Vas ispunite sva polja!")
          return;
        }

        var prezime = document.getElementById("prezime").value;
        if (prezime == "") { 
          alert("Molim Vas ispunite sva polja!")
          return;
        }

        var adresa = document.getElementById("adresa").value;
        if (adresa == "") {
          alert("Molim Vas ispunite sva polja!")
          return;
        } 

        var pBroj = document.getElementById("pBroj").value;
        if (pBroj == "") {
          alert("Molim Vas ispunite sva polja!")
          return;
        }

        var mjesto = document.getElementById("mjesto").value;

        if (mjesto == "") {
          alert("Molim Vas ispunite sva polja!")
          return;
        }

        var mail = document.getElementById("mail").value;
        if (mail == "") {
          alert("Molim Vas ispunite sva polja!")
          return;
        }

        var tel = document.getElementById("tel").value;
        if (tel == "") {
          alert("Molim Vas ispunite sva polja!")
          return;
        }

        var poruka = document.getElementById("poruka").value;
        if (poruka == "") {
          alert("Molim Vas ispunite sva polja!")
          return;
        }  
        var request = $http({
          method: "POST",
          url: 'http://freezura.eu/rest/sendukljucise.php',
          data: { "ime": ime + " " + prezime, "adresa":  adresa, "pBroj":pBroj,"mjesto" :mjesto,"mail":mail, "tel": tel,"poruka": poruka },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }


        });

        request.success(function (data) {
            alert(data)
        });
      }
    });

    //Log in to the event


    /* Function for redirect to detailed page for the news by ID */
    $scope.viewNews = function (id) {
      $state.go('app.news-detail', {
        newsId: id
      });
    }
  })
