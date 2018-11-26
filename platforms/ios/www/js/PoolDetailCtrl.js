angular.module('starter')
    .controller('PoolDetailCtrl', function ($scope, $http, $state, $stateParams) {
        $scope.over = 1;
        $scope.myType;
        var answerFinish; 
        if (window.localStorage.getItem('questions') ==  (+window.localStorage.getItem('index')+1)) {
            $scope.over = 0; 
        }
    

        $scope.choice;
        $scope.font = window.localStorage.getItem("font");
        var x = JSON.parse(window.localStorage.getItem('allQuestions')); 
        $scope.quetion = (+window.localStorage.getItem('index')+1)+". "+x[window.localStorage.getItem('index')].Pitanje 
        var request = $http({
            method: "POST",
            url: 'https://www.dckzz-volonteri.hr/rest/pollsanswers.php',
            data: { pollquestion: x[window.localStorage.getItem('index')].id },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });
        request.success(function (data) {
            $scope.answers = data; 
        });

        $scope.nextQuestion = function () {
            if(checkAnswer()==false){
                alert("Niste ništa odgovorili!");
                return;
            } 
            var array = JSON.parse(window.localStorage.getItem("pushQuestion"));
            var final = answerFinish;
            if(answerFinish==null){
                final= document.getElementById("answer").value;
            }
            array.push({"question":x[window.localStorage.getItem('index')].id,"answer":final});
            window.localStorage.setItem("pushQuestion",JSON.stringify(array)); 
            window.localStorage.setItem('index',   +window.localStorage.getItem('index') + 1); 
            $state.transitionTo("app.poolDetail", $stateParams, { reload: true, inherit: false, notify: true });
        }

        $scope.finishPoll = function () { 
            if(checkAnswer()==false){
                alert("Niste ništa odgovorili!");
                return;
            }  
            var array = JSON.parse(window.localStorage.getItem("pushQuestion"));
            var final = answerFinish;
            if(answerFinish==null){
                final= document.getElementById("answer").value;
            } 
            array.push({"question":x[window.localStorage.getItem('index')].id,"answer":final}); 
                var request = $http({
                    method: "POST",
                    url: 'https://www.dckzz-volonteri.hr/rest/pollsinsert.php',
                    data: {  user:window.localStorage.getItem('id'),poll:window.localStorage.getItem('poll'),
                    allQuestions:array
                }, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                
                }); 
                request.success(function (data) {   
                }); 
                alert("Zahvaljujemo Vam se na trudu i vremenu koje ste posvetili ovoj anketi!")
           $state.go("app.home")
        }

        function checkAnswer(){
            if($scope.answers==""){
                if(document.getElementById("answer").value==""){
                    return false;
                }
            }else{ 
                if(answerFinish==null){ 
                    return false;
                }
            }
            return true;
        }

        $scope.addValue=function(answer){ 
                answerFinish=answer;
        }

    })