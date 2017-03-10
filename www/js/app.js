(function () {

    var app = angular.module('myreddit', ['ionic', 'angularMoment']);

    app.controller('redditCtrl', function ($scope, $http) {
        $scope.stories = [];

        function buscarStories(parametros, funcaoRetorno) {
            $http.get('https://www.reddit.com/r/funny/new/.json', {
                params: parametros
            })
            .success(function (response) {
                var stories = [];
                angular.forEach(response.data.children, function (child) {
                    stories.push(child.data);
                });
                funcaoRetorno(stories);
            });
        };

        $scope.carregarMaisAntigas = function () {
            var parametros = {};
            if ($scope.stories.length > 0) {
                parametros['after'] = $scope.stories[$scope.stories.length - 1].name;
            }
            buscarStories(parametros, function(historiasAntigas){
               $scope.stories = $scope.stories.concat(historiasAntigas);
               $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };

        $scope.atualizar = function () {
            var parametros = {'before': $scope.stories[0].name};
            buscarStories(parametros, function(novasHistorias){
                $scope.stories = novasHistorias.concat($scope.stories);
                 $scope.$broadcast('scroll.refreshComplete');
            });
        };

    });

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

}());