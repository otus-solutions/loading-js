(function() {
    'use strict';

    angular
        .module('loading.player')
        .directive('loadingContainer', loadingContainer);

    loadingContainer.$inject = ['LoadingPlayer'];

    function loadingContainer(LoadingPlayer) {
        var ddo = {
            templateUrl: 'app/player/ui/loading-control.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                LoadingPlayer.init(scope, element);
            }

        };

        return ddo;
    }

}());
