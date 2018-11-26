angular.module('starter')
    .controller('ContactCtrl', function ($scope, $http, $ionicLoading) {
        $scope.ime = window.localStorage.getItem("ime");
        $scope.prezime = window.localStorage.getItem("prezime");
        $scope.email = window.localStorage.getItem("email");
        $scope.telefon = window.localStorage.getItem("telefon");
        $scope.poruka = window.localStorage.getItem("poruka");
        $scope.font = window.localStorage.getItem("font");
        if (window.localStorage.getItem("typeContact") == 1) {

            $scope.title = "Pošalji ideju";
            $scope.$evalAsync();

        } else if (window.localStorage.getItem("typeContact") == 2) {
            $scope.title = "Prijavi problem";
            $scope.$evalAsync();

        } else if (window.localStorage.getItem("typeContact") == 3) {
            $scope.title = "Pošalji pitanje";
            $scope.$evalAsync();

        } 

        $scope.sendMessage = function(){  $ionicLoading.show({ template: 'Poruka je poslana! ', noBackdrop: true, duration: 3000 });
        return;
            const ime = document.getElementById("ime");
            const prezime = document.getElementById("prezime");
            const lozinka = document.getElementById("lozinka"); 
            const email = document.getElementById("email");
            const telefon = document.getElementById("telefon");
            const poruka = document.getElementById("poruka");  
            try{ 
            var request = $http({
                method: "POST",
                url: 'http://dckzz-volonteri.hr/rest/sendmail.php',  
                data:{ime:ime.value,prezime:prezime.value,mail:email.value,poruka:poruka.value,id: window.localStorage.getItem("user_id"),
            type:window.localStorage.getItem("typeContact") },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    
            });
        }catch(e){ 
            $ionicLoading.show({ template: 'Niste popunili sva potrebna polja! ', noBackdrop: true, duration: 3000 });
        }
    
            request.success(function (data) { 
                $ionicLoading.show({ template: 'Poruka je poslana! ', noBackdrop: true, duration: 3000 });
            });
        }
       

 
    })