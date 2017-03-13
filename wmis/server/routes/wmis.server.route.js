/**
 * Created by Ganapati on 20-03-2016.
 */

var warehouseController = require("../controllers/wmis.server.controller");

module.exports = function(app){

    app.route("/getWarehouseDetails").post(warehouseController.getWarehouseDetails);

    app.route("/getWarehouseNodes").post(warehouseController.getWarehouseNodes);

    app.route("/getAlerts").post(warehouseController.getAlerts);

    app.route("/getScore").post(warehouseController.getScore);

    app.route("/getData").post(warehouseController.getData);
};
