(function() {
    'use strict';

    angular
        .module('loading.player')
        .service('LoadingPlayer', service);

    service.$inject = ['LoadingContainerFactory'];

    function service(LoadingContainerFactory) {
        var self = this;
        var loadingContainer = null;

        self.start = start;
        self.stop = stop;
        self.changeMessage = changeMessage;
        self.init = init;

        function init($scope, $element){
            loadingContainer = LoadingContainerFactory.create($scope, $element);
        }

        function start() {
            loadingContainer.show();
        }

        function stop() {
            loadingContainer.hide();
        }

        function changeMessage(value) {
            loadingContainer.changeMessage(value);
        }
    }

}());
