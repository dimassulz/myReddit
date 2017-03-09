(function(){
    
var app = angular.module('myreddit', ['ionic']);

app.controller('redditCtrl',function($scope){
    $scope.stories = [{
        title: "Primeira História"
    },
    {
        title: "Segunda História"
    },
    {
        title: "Terceira História"
    }];    
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

}());
