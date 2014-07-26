'use strict';

angular.module('mean.messages').controller('MessagesController', ['$scope', 'Global', 'Messages',
    function($scope, Global, Messages) {
        $scope.global = Global;
        $scope.package = {
            name: 'messages'
        };
    }
]);
