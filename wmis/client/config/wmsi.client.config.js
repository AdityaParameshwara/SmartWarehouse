/**
 * Created by Ganapati on 19-03-2016.
 */
(function () {
    'use strict';

    angular
        .module('wmis')
        .run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Dashboard',
            state: 'dashboard'
        });
        // Menus.addMenuItem('topbar', {
        //     title: 'Insurance',
        //     state: 'insurance'
        // });
    }
}());
