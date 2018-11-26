angular.module('starter')
    .controller('MyProfileCtrl', function ($scope, $http, $state, $ionicPopup,$ionicLoading) {
        $scope.font = window.localStorage.getItem("font");
        $scope.popUp;
        $scope.checkbox={
            checked :false
        };

        $scope.openPopUp = function () {
 
            const ime = document.getElementById("ime");
            const prezime = document.getElementById("prezime");
            const lozinka = document.getElementById("lozinka");
            const email = document.getElementById("email");
            const telefon = document.getElementById("telefon");
            const plozinka = document.getElementById("plozinka");
            const kor_ime = document.getElementById("kor_ime");
            if ( plozinka == null || email == null || ime ==null || prezime ==null || kor_ime == null) { 
                $ionicLoading.show({ template: 'Niste popunili sva polja', noBackdrop: true, duration: 3000 });
                return;
            } 
            if (lozinka.value != plozinka.value) { 
                $ionicLoading.show({ template: 'Lozinke se ne podudaraju', noBackdrop: true, duration: 3000 });
                return;
            }
            $scope.popUp = $ionicPopup.show({
                templateUrl: 'templates/accept-rights.html',
                scope: $scope,
            })
        }
        $scope.checkboxClick= function(bool){
            $scope.checkbox=bool; 
        }
 
        $scope.createProfile = function () {
            if(  $scope.checkbox.checked==false){ 
                $ionicLoading.show({ template: 'Niste prihvatili uvjete korištenja!', noBackdrop: true, duration: 3000 });
                return;
            }
            const ime = document.getElementById("ime");
            const prezime = document.getElementById("prezime");
            const lozinka = document.getElementById("lozinka");
            const email = document.getElementById("email");
            const telefon = document.getElementById("telefon");
            const plozinka = document.getElementById("plozinka");
            const kor_ime = document.getElementById("kor_ime");
            if (lozinka == null || plozinka == null || email == null) { 
                $ionicLoading.show({ template: 'Lozinke i E-mail su obavezna polja!', noBackdrop: true, duration: 3000 });
                return;
            } 
            if (lozinka.value != plozinka.value) { 
                $ionicLoading.show({ template: 'Lozinke se ne podudaraju!', noBackdrop: true, duration: 3000 });
                return;
            }
            var request = $http({
                method: "POST",
                url: 'https://www.dckzz-volonteri.hr/rest/createUser.php',
                data: { ime: ime.value, prezime: prezime.value, lozinka: lozinka.value,username:kor_ime.value, email: email.value, telefon: telefon.value, token: window.localStorage.getItem("token"), os: "an" },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            });
            request.success(function (data) { 
                console.log("REGISTRACIJOOO MOJA: "+data);  
                $ionicLoading.show({ template: 'Uspješna registracija!', noBackdrop: true, duration: 3000 });
                $scope.popUp.close();
                window.location.reload();
                $state.go("app.home");

            });
            request.error(function (data) {
                console.log("REGISTRACIJOOO MOJA: "+data); 
             

            });


        }

    })