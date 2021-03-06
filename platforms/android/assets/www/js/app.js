angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngMap','ionic-timepicker','ionic-datepicker'])

  .run(function ($ionicPlatform, $http, $state, $cordovaSQLite) { 
    if(window.localStorage.getItem("font")==null){
      window.localStorage.setItem("font",17);
    }
    $ionicPlatform.ready(function () { 
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

     

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true, 
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('app.category', {
        url: '/category',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/categories.html',
            controller: 'CategoryCtrl'
          }
        }
      })
 
      .state('app.cdk-teams', {
        url: '/cdk-teams',
        views: {
          'menuContent': {
            templateUrl: 'templates/cdk-teams.html',
            controller: 'CdkTeamsCtrl'
          }
        }
      })
      .state('app.cdk-teams-detail', {
        url: '/cdk-teams-detail/:newsId',
        views: {
          'menuContent': {
            templateUrl: 'templates/cdk-teams-detail.html',
            controller: 'cdkTeamsDetailCtrl'
          }
        }
      })
 

      .state('app.contact-us', {
        cache: false,
        url: '/contact',
        views: {
          'menuContent': {
            templateUrl: 'templates/contact-us.html',
            controller: 'ContactCtrl'
          }
        }
      })
 
      .state('app.about-the-app', {
        url: '/about-the-app',
        views: {
          'menuContent': {
            templateUrl: 'templates/about-the-app.html',
            controller: 'AboutTheAppCtrl'
          }
        }
      })
 
      .state('app.news-detail', {
        url: 'news-detail/:newsId',
        views: {
          'menuContent': {
            templateUrl: 'templates/news-detail.html',
            controller: 'NewsDetailCtrl'
          }
        }
      })
 
      .state('app.leader', {
        cache: false,
        url: '/leader', 
        views: {
          'menuContent': {
            templateUrl: 'templates/leaderboard.html',
            controller: 'LeaderBoardCtrl'
          }
        }
      })

      .state('app.join', {
        cache: false,
        url: '/join-us', 
        views: {
          'menuContent': {
            templateUrl: 'templates/join-us.html',
            controller: 'JoinUsCtrl'
          }
        }
      })
 
      
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });