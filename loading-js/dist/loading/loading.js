(function() {
    'use strict';

    angular
        .module('loading', [
            'ngMaterial',
            'ngAnimate',
            'loading.player'
        ]);

}());

(function() {
    'use strict';

    angular
        .module('loading.player', []);

}());

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
            console.log(loadingContainer)
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

(function() {
    'use strict';

    angular
        .module('loading.player')
        .directive('loadingContainer', loadingContainer);

    loadingContainer.$inject = ['LoadingPlayer'];

    function loadingContainer(LoadingPlayer) {
        var ddo = {
            template:'<div ng-hide="hide" class="loading" layout="row" layout-align="center center" ng-cloack><div><div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div><div class="md-body-2 loading-message"><span>{{message}}</span></div></div></div>',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                LoadingPlayer.init(scope, element);
            }

        };

        return ddo;
    }

}());
