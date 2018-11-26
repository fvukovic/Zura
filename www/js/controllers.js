angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope,$stateParams, $state, $ionicModal, $timeout,$ionicListDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.firstSide ="plus.png";
    $scope.firstSide2 ="plus.png";
    $scope.firstSide3 ="plus.png";
    $scope.firstSide4 ="plus.png";
    $scope.login; 
    if(window.localStorage.getItem("login")==null){
        $scope.login = 1;
    }else{
      if(window.localStorage.getItem("login")==1){ 
        $scope.login = 1;
      }else{
        $scope.login = 2;

      }
     
    } 
    $scope.font =window.localStorage.getItem("font");  
    $scope.openState = function (state) {  
      $state.go(state);
    };
    $scope.openStateSolo = function (state) {  
      $state.go(state);
    };
    $scope.openStateTim = function (state,id) {
      window.localStorage.setItem("team",id); 
      $state.transitionTo(state, $stateParams, { reload: true, inherit: false, notify: true });
    };
    $scope.logout = function(){ 
      window.localStorage.setItem("login",1);
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("ime" );
      window.localStorage.removeItem("prezime" );
      window.localStorage.removeItem("lozinka" );
      window.localStorage.removeItem("email" );
      window.localStorage.removeItem("telefon" );
      window.localStorage.removeItem("login" ); 
      window.location.reload(); $state.go("app.home");
    }

    $scope.openState = function (state,id,type) { 
      if(type==1) { 
      window.localStorage.setItem("typeContact",id);
      $state.transitionTo(state, $stateParams, { reload: true, inherit: false, notify: true });
      }else{  
        window.localStorage.setItem("category",id);
        $state.transitionTo(state, $stateParams, { reload: true, inherit: false, notify: true });
      }
      
    };
    $scope.checked=false;
    $scope.checked2=false; 
    $scope.checked3=false; 
    $scope.checked4=false; 
    $scope.openSideMenu=function(){ 
      if($scope.checked == true){
        $scope.firstSide ="plus.png";
        $scope.checked = false;
      }else{
       $scope.firstSide ="minus.png";
        $scope.checked = true;
      }
     
    }
      $scope.openSideMenu2=function(){ 
        if($scope.checked2 == true){
          $scope.firstSide2 ="plus.png";
          $scope.checked2 = false;
        }else{
         $scope.firstSide2 ="minus.png";
          $scope.checked2 = true;
        }
       
      }
      $scope.openSideMenu3=function(){ 
        if($scope.checked3 == true){
          $scope.firstSide3 ="plus.png";
          $scope.checked3 = false;
        }else{
         $scope.firstSide3 ="minus.png";
          $scope.checked3 = true;
        }
       
      }
      $scope.openSideMenu4=function(){ 
        if($scope.checked4 == true){
          $scope.firstSide4 ="plus.png";
          $scope.checked4 = false;
        }else{
         $scope.firstSide4 ="minus.png";
          $scope.checked4 = true;
        }
       
      }

    // Triggered in the login modal to close it



  })