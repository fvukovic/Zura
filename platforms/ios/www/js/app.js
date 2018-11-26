//ar.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngMap','ionic-timepicker','ionic-datepicker'])

  .run(function ($ionicPlatform, $http, $state, $cordovaSQLite) { 
    if(window.localStorage.getItem("font")==null){
      window.localStorage.setItem("font",17);
    }
    window.localStorage.setItem("start",0)
    $ionicPlatform.ready(function () {
      StatusBar.overlaysWebView(true);
      if (StatusBar.isVisible) {
       console.log("ddddd")
    }
    StatusBar.overlaysWebView(false);
      FCMPlugin.getToken(function(token){
        if(window.localStorage.getItem("token")==null){
          window.localStorage.setItem("token",token);
      }
       
        var request = $http({ 
          method: "POST",
          url: 'https://www.dckzz-volonteri.hr/rest/createDevice.php',
          data: { token : token,os:"an" },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

      });
      request.success(function (data) { 
        //window.location.reload();
        console.log("KITA: "+JSON.stringify(data));
       // $state.go("app.home");

    });     
    });
      window.localStorage.setItem("start",0)     
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

      var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });


      $cordovaSQLite.execute(db, "CREATE TABLE if not exists favorites (id integer primary key, title text,day text, date Date, description text)").then(function (res) {

      }, function (err) {
        console.error("DASD?" + err[0]);
      });
      $cordovaSQLite.execute(db, "CREATE TABLE if not exists events (id integer primary key, title text,day text, date Date, description text, favorit integer,notification integer)").then(function (res) {

      }, function (err) {
        console.error("DASD?" + err[0]);
      });


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
      .state('app.my-rights', {
        url: '/my-rights',
        views: {
          'menuContent': {
            templateUrl: 'templates/user-rights-and-obligations.html'
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
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('app.my-profile', {
        url: '/my-profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/my-profile.html',
            controller: 'MyProfileCtrl'
          }
        }
      })

      .state('app.edit-profile', {
        url: '/edit-profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/edit-profil.html',
            controller: 'EditProfileCtrl'
          }
        }
      })

      .state('app.my-ang', {
        url: '/my-ang',
        views: {
          'menuContent': {
            templateUrl: 'templates/my-ang.html',
            controller: 'MyAngCtrl'
          }
        }
      })

      .state('app.favorites', {
        url: '/favorites',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/favorites.html',
            controller: 'FavoritesCtrl'
          }
        }
      })

      .state('app.notice-board', {
        url: '/notice-board',
        views: {
          'menuContent': {
            templateUrl: 'templates/notice-board.html',
            controller: 'NoticeBoardCtrl'
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

      .state('app.poll', {
        url: '/poll',
        views: {
          'menuContent': {
            templateUrl: 'templates/poll.html',
            controller: 'PollCtrl'
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
      .state('app.private-messages', {
        url: '/private-messages',
        views: {
          'menuContent': {
            templateUrl: 'templates/private-messages.html',
            controller: 'PrivateMessagesCtrl'
          }
        }
      })
      .state('app.user-rights-and-obligations', {
        url: '/user-rights-and-obligations',
        views: {
          'menuContent': {
            templateUrl: 'templates/user-rights-and-obligations.html',
            controller: 'UserRightsAndObligationsCtrl'
          }
        }
      })
      .state('app.proposal-submit', {
        url: '/proposal-submit',
        views: {
          'menuContent': {
            templateUrl: 'templates/proposal-submit.html',
            controller: 'ProposalSubmitCtrl'
          }
        }
      })
      .state('app.popup-map', {
        url: '/popup-map',
        views: {
          'menuContent': {
            templateUrl: 'templates/popup-map.html',
            controller: 'PopupMapCtrl'
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
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
      .state('app.user_detail', {
        url: '/user_detail',
        cache:false,
        views: {
          'menuContent': {
            templateUrl: 'templates/user-detail.html',
            controller: 'UserDetailController'
          }
        }
      })
      .state('app.send_message', {
        url: '/send_message',
        views: {
          'menuContent': {
            templateUrl: 'templates/user-messages.html',
            controller: 'SendUserMessageCtrl'
          }
        }
      })

      .state('app.user_search', {
        url: '/user_search',
        views: {
          'menuContent': {
            templateUrl: 'templates/user-search.html',
            controller: 'SearchUserCtrl'
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
      .state('app.poolDetail', {
        cache: false,
        url: '/poolDetail', 
        views: {
          'menuContent': {
            templateUrl: 'templates/pool-detail.html',
            controller: 'PoolDetailCtrl'
          }
        }
      })

      .state('app.rules', {
        cache: false,
        url: '/rules', 
        views: {
          'menuContent': {
            templateUrl: 'templates/gemifikacija.html', 
          }
        }
      })
      
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });