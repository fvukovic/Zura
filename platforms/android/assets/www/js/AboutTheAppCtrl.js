angular.module('starter')
.controller('AboutTheAppCtrl', function($scope,$http) {
    $scope.font =window.localStorage.getItem("font");   
    var request = $http({
        method: "POST",
        url: 'http://freezura.eu/rest/detailsTexts.php',
        data:{id:4},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      request.success(function (data) {
          $scope.data = data[0]  
      });
})