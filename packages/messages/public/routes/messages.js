'use strict';

angular.module('mean.messages').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('all messages', {
                url: '/messages',
                templateUrl: 'messages/views/list.html'
            })
        .state('messages example page', {
            url: '/messages/example',
            templateUrl: 'messages/views/index.html'
        });


    }
]);
