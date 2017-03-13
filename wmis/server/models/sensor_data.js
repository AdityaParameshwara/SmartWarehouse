/**
 * Created by Ganapati on 20-03-2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var sensorData = new Schema({
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
    sensorHumidity: {
        type: Number,
        required: true
    }
    ,sensorTemperature: {
        type: Number,
        required: true
    }
    ,sensorMoisture: {
        type: Number,
        required: true
    }
});

    mongoose.model('sensorData', sensorData, 'SensorData');
