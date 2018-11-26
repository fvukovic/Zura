angular.module('starter')
.controller('EditProfileCtrl', function($scope,$http,$ionicLoading) {
    $scope.ime =   window.localStorage.getItem("ime");
    $scope.prezime =   window.localStorage.getItem("prezime");
    $scope.lozinka =   window.localStorage.getItem("lozinka");  
    $scope.email =   window.localStorage.getItem("email");
    $scope.telefon =   window.localStorage.getItem("telefon");
    $scope.font =window.localStorage.getItem("font");  
    var request = $http({
        method: "POST",
        url: 'http://dckzz-volonteri.hr/rest/getUserById.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data:{user:window.localStorage.getItem("id")}

    });
    request.success(function (data2) { 
        $scope.level= data2[0].Bodovi  
        console.log(JSON.stringify(data2))
        $scope.user=[]; 
        $scope.name ="Detalji Korisnika";
        for (var key2 in data2[0]) {
            if (data2[0].hasOwnProperty(key2)) {
                console.log(key2 + " -> " + data2[0][key2]);
                $scope.user.push({
                    key:key2,
                    value:data2[0][key2]
                })
            }
        }
             
    });

    $scope.createProfile = function(){ 
        const ime = document.getElementById("ime");
        const prezime = document.getElementById("prezime");
        const lozinka = document.getElementById("lozinka"); 
        const email = document.getElementById("email");
        const telefon = document.getElementById("telefon");
        

        if(  lozinka==null ||  email==null  ){ 
            $ionicLoading.show({ template: 'Email i lozinka su obavezna polja! ', noBackdrop: true, duration: 3000 });
             return;
        }
      
        var request = $http({ 
                            method: "POST",
                            url: 'https://www.dckzz-volonteri.hr/rest/profileUpdate.php',
                            data: { ime: ime.value, prezime: prezime.value, lozinka:lozinka.value,email: email.value,telefon:  telefon.value,token:window.localStorage.getItem("token"),os:"an" },
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            
                        });
                        request.success(function (data) { 
                            window.localStorage.setItem("ime",ime.value);
                            window.localStorage.setItem("prezime",prezime.value); 
                            window.localStorage.setItem("lozinka",lozinka.value);  
                            window.localStorage.setItem("email",email.value);
                            window.localStorage.setItem("telefon",telefon.value); 
                            window.localStorage.setItem("login",ime.value + " "+ prezime.value);
            
                        });     


    }
    
})