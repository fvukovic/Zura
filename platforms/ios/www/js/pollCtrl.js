angular.module('starter')
.controller('PollCtrl', function($scope,$http,$state) {
    $scope.font =window.localStorage.getItem("font");  
    var request = $http({
        method: "POST",
        url: 'https://www.dckzz-volonteri.hr/rest/polls.php', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

    });
    request.success(function (data) {   
        $scope.users = data;  
    });
    $scope.openPool = function(id){  
        var request = $http({
            method: "POST",
            url: 'https://www.dckzz-volonteri.hr/rest/pollsquestions.php',
            data: {   polltitle :1 },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        
        });
        request.success(function (data) {
            localStorage.setItem("pushQuestion","[]");
            localStorage.setItem('allQuestions', JSON.stringify(data)); 
            localStorage.setItem("questions",data.length)
            localStorage.setItem("index",0)  
            window.localStorage.setItem("poll",id) 
            $state.go("app.poolDetail")
        });
    
    }
})