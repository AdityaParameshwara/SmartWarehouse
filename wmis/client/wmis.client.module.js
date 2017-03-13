/**
 * Created by Ganapati on 19-03-2016.
 */
(function (app) {
    'use strict';

    app.registerModule('wmis', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
    app.registerModule('wmis.services');
    app.registerModule('wmis.routes', ['ui.router', 'wmis.services']);
}(ApplicationConfiguration));
