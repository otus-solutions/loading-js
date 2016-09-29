(function() {
    'use strict';

    angular
        .module('loading.player')
        .factory('LoadingContainerFactory', factory);

    function factory() {
        var self = this;
        self.create = create;

        function create($scope, $element) {
            return new LoadingContainer($scope, $element);
        }

        return self;

    }

    function LoadingContainer($scope, $element) {
        var self = this;
        var DEFAULT_MESSAGE = 'Carregando Informações';

        self.$scope = $scope;
        self.$element = $element;
        self.changeMessage = changeMessage;
        self.show = show;
        self.hide = hide;

        _init();

        function _init(){
            self.changeMessage(DEFAULT_MESSAGE);
            self.hide();
        }

        function changeMessage(message) {
            $scope.message = message;
        }

        function show() {
            $scope.hide = false;
        }

        function hide() {
            $scope.hide = true;
            self.changeMessage(DEFAULT_MESSAGE);
        }
    }

}());
