/**
 * Created by Ganapati on 20-03-2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var warehouseDetails = new Schema({
    warehouseId: {
        type: String,
        required: true
    },
    warehouseName: {
        type: String,
        required: true
    },
    warehouseManager: {
        type: String,
        required: true
    },
    warehouseManagerContact: {
        type: String,
        required: true
    },
    warehouseLocation: {
        type: String,
        required: true
    },
    warehouseLatitude: {
        type: Number,
        required: true
    },
    warehouseLongitude: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    inventory:{
        type: Array
    }
});

mongoose.model('warehouseDetailsMaster', warehouseDetails, 'WarehouseDetails');
