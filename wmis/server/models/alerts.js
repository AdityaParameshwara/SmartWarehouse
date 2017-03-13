/**
 * Created by Ganapati on 20-03-2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var alerts = new Schema({
    nodeId: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    warehouseId: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true
    },
    sensor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    alertType: {
        type: String,
        required: true
    }
});

mongoose.model('alerts', alerts, 'Alerts');
