
app.controller("main-ctrl", ["$scope", "$http", function ($scope, $http) {
    $scope.title = "Political Sentiment Analysis";

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

        // $http.get("/tone").then(function(data){
        //     var tonedata = data.data;
        //     console.log(tonedata);
           
        // });
       };
}]);

app.controller("tone-ctrl", ["$scope", "$http", function ($scope, $http) {
    $scope.newtitle = "Tonal Analysis";

       $scope.getResponse = function () {
           $http.get("/tone").then(function(data){
               console.log(data);
           });   
        };

           }]);

