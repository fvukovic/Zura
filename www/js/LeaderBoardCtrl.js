angular.module('starter')
.controller('LeaderBoardCtrl', function($scope,$http) {
    $scope.font =window.localStorage.getItem("font"); 
    $scope.x=0;
    var team = window.localStorage.getItem("team");
    if(team==2){
        $scope.team = "Mali interventni timovi";
    } 
    if(team==3){
        $scope.team = "Vršnjačka podrška \n učenicima i djeci migrantima";
    }
    if(team==6){
        $scope.team = "Klinci čuvalice životinja";
    }    
    var request = $http({
        method: "POST",
        url: 'https://www.dckzz-volonteri.hr/rest/leaderboards.php',
        data: {   "team" :window.localStorage.getItem("team")  },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

    });
    request.success(function (data) {   
        $scope.users = data;  
    });
    
})