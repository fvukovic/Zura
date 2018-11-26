angular.module('starter')
    .controller('LoginCtrl', function ($scope, $http,$state,$ionicLoading) {
        $scope.font = window.localStorage.getItem("font");
        if(window.localStorage.getItem("id")!=null){
            $state.go("app.home");
        }
        $scope.login = function () { 
            const email = document.getElementById("email");
            const lozinka = document.getElementById("lozinka");
            if (email == null || lozinka == null) { 
                $ionicLoading.show({ template: 'Nisu uneseni svi parametri! ', noBackdrop: true, duration: 3000 });    
                
            }
            var request = $http({
                method: "POST",
                url: 'https://www.dckzz-volonteri.hr/rest/login.php',
                data: { lozinka: lozinka.value, username: email.value, token: window.localStorage.getItem("token"), os: "an" },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            });
            request.success(function (data) {

                console.log("OVO: " + JSON.stringify(data)); 
                if(data[0]["login"] ==1){ 
                    $ionicLoading.show({ template: 'Neuspješna prijava! ', noBackdrop: true, duration: 3000 });    
                    return;
                }
                window.localStorage.setItem("id", data[0].id);
                window.localStorage.setItem("ime", data[0].ime);
                window.localStorage.setItem("prezime", data[0].prezime);
                window.localStorage.setItem("lozinka", lozinka.value);
                window.localStorage.setItem("email", email.value);
                window.localStorage.setItem("telefon", data[0].telefon);
                window.localStorage.setItem("login", data[0].ime + " " + data[0].prezime); 
                window.location.reload();
                $state.go("app.home");
                

            });


        }

    })