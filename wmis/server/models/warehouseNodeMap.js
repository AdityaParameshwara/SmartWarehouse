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
var warehouseNodeMap = new Schema({
    warehouseId: {
        type: String,
        required: true
    },
    gatewayId: {
        type: String,
        required: true
    },
    node:{
        type: Array
    }
});

mongoose.model('warehouseNodeMap', warehouseNodeMap, 'WarehouseNodeMap');
