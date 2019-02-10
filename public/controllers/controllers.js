var angercount = 0;
var joycount = 0;
var fearcount = 0;
var sadnesscount = 0;
var analyticalcount = 0;
var confidentcount = 0;
var tentativecount = 0;

var angerscores = 0.0;
var joyscores = 0.0;
var fearscores = 0.0;
var sadnessscores = 0.0;
var analyticalscores = 0.0;
var confidentscores = 0.0;
var tentativescores = 0.0;
var tonescores = [];
var barchart;



var newarr;
app.controller("main-ctrl", ["$scope", "$http", function ($scope, $http) {
    $scope.title = "Political Sentiment Analysis";
    $scope.newtitle = "Tonal Analysis";
       $scope.getResponse = function () {
           $http.get("/results/" + $scope.searchInput).then(function (data) {
                console.log(data);
               var twitterData = data.data;
               twitterData = twitterData.split(/[{}]+/);

               var scores = "{" + twitterData[1] + "}";
               scores = JSON.parse(scores);

               var finalScores = [scores["Very Negative"], scores["Negative"], scores["Neutral"], scores["Positive"], scores["Very Positive"]];
               var canvas = document.getElementById('tweet-chart'),
                   ctx = canvas.getContext('2d'),
                   startingData = {
                       labels: ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
                       datasets: [
                           {   
                               fillColor: "rgba(66,66,66,0.5)",
                               strokeColor: "#000000",
                               pointColor: "rgba(0,0,0,1)",
                               pointStrokeColor: "#fff",
                               data: finalScores
                           }
                       ]
                   };
        

         
           var tweetChart = new Chart(ctx).Line(startingData, {animationSteps: 50});    
           var canvas2 = document.getElementById('radarchart');
           var ctx2 = canvas2.getContext('2d');
           var data = {
                labels:["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
                datasets: [{
                    
                    fillColor: "rgba(66,66,66,0.5)",
                    strokeColor: "#000000",
                    pointColor: "rgba(0,0,0,1)",
                    pointStrokeColor: "#fff",
                    data: finalScores
                }]
            };
            document.getElementById('radcard').style.visibility='visible';
               var myRadarChart = new Chart(ctx2).Radar(data,{animationSteps:50});

               $scope.tweets = JSON.parse(twitterData[0]);


           });

     
       };
}]);

app.controller("tone-ctrl", ["$scope", "$http", function ($scope, $http) {
    $scope.title = "Political Sentiment Analysis";
    $scope.newtitle = "Tonal Analysis";
    
           $http.get("/tone").then(function (data) {
                newarr = data.data;
                console.log(data.data.length);
                for(i=0;i<newarr.length;i++){
                    console.log(newarr[i]);
                    
                
                    for(j=0;j<newarr[i].length;j++){
                        console.log(newarr[i][j].tone_id);
                        if(newarr[i][j].tone_id == "anger"){
                            angercount += 1;
                            angerscores = angerscores + newarr[i][j].score;
                        }
                        else if(newarr[i][j].tone_id == "fear"){
                            fearcount += 1;
                            fearscores += newarr[i][j].score;
                        }
                        else if(newarr[i][j].tone_id == "joy"){
                            joycount += 1;
                            joyscores += newarr[i][j].score;
                        }
                        else if(newarr[i][j].tone_id == "sadness"){
                            sadnesscount += 1;
                            sadnessscores += newarr[i][j].score;
                        }
                        else if(newarr[i][j].tone_id == "analytical"){
                            analyticalcount += 1;
                            analyticalscores += newarr[i][j].score;
                        }
                        else if(newarr[i][j].tone_id == "confident"){
                            confidentcount += 1;
                            confidentscores += newarr[i][j].score;
                            

                        }
                        else if(newarr[i].tone_id == "tentative"){
                            tentativecount += 1;
                            tentativescores += newarr[i][j].score;

                        }

                    }
                    if(angercount>0){
                        angerscores = angerscores/angercount;
                    }
                    else{
                        angerscores = 0;
                    }

                    if(joycount>0){
                        joyscores = joyscores/joycount;
                    }
                    else{
                        joyscores = 0;
                    }

                    if(fearcount>0){
                        fearscores = fearscores/fearcount;
                    }
                    else{
                        fearscores = 0;
                    }

                    if(analyticalcount>0){
                        analyticalscores = analyticalscores/analyticalcount;
                    }
                    else{
                        analyticalscores = 0;

                    }

                    if(sadnesscount>0){
                        sadnessscores = sadnessscores/sadnesscount;
                    }
                    else{
                        sadnessscores = 0;

                    }

                    if(confidentcount>0){
                        confidentscores = confidentscores/confidentcount;
                    }
                    else{
                        confidentscores = 0
                    }

                    if(tentativecount>0){
                        tentativescores = tentativescores/tentativecount;
                    }
                    else{
                        tentativescores = 0;
                    }
                    
                    
                   
                    
                    
                    
                    

                    
                    tonescores = [angerscores,joyscores,fearscores,analyticalscores,sadnessscores,confidentscores,tentativescores];
                    
                    var tonecanvas = document.getElementById('tonecanvas'),
                    ctx3 = tonecanvas.getContext('2d'),
                    newdata = {
                        labels: ["Anger", "Joy", "Fear", "Analytical", "Sadness","Confident","Tentative"],
                        datasets: [
                            {   
                                fillColor:"rgba(255,0,0,0.5)",
                                strokeColor: "#000000",
                                pointColor: "rgba(0,0,0,1)",
                                pointStrokeColor: "#fff",
                                data: tonescores
                            }
                        ]
                    };
                    if(barchart != undefined){
                        barchart.destroy();
                    }
                    barchart = new Chart(ctx3).Bar(newdata, {animationSteps: 50});
         



                   
                }
                // $scope.chartdata = data;

             

           });

 
       
}]);

// app.controller("tone-ctrl", ["$scope", "$http", function ($scope, $http) {
//     $scope.newtitle = "Tonal Analysis";

//            $http.get("/tone").then(function(data){
//                $scope.chartdata = data;
//            });   

//            }]);

