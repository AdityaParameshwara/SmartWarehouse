/**
 * Created by Ganapati on 19-03-2016.
 */
(function () {
    'use strict';

    angular
        .module('wmis.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/wmis/client/views/dashboard.client.view.html',
                controller: 'DashboardController',
                controllerAs: 'dc'
            })
            .state('insurance', {
                url: '/insurance',
                templateUrl: 'modules/wmis/client/views/insurance.client.view.html',
                controller: 'InsuranceController',
                controllerAs: 'ic'
            })
    }
}());
