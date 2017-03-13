/**
 * Created by telsa on 19/3/16.
 */
var mongoose = require("mongoose");

var Oploggery = require('oploggery');

var oplogger = new Oploggery({
    uri: 'mongodb://localhost:27017/HackDev',
    format: 'pretty'
});

// Database is 'test', collection is 'users'
oplogger.watch('HackDev.Alerts', function(event) {
    console.log(event);
});

var warehouseDetails = mongoose.model('warehouseDetailsMaster', 'WarehouseDetails'),
    warehouseNodeMap = mongoose.model('warehouseNodeMap', 'WarehouseNodeMap'),
    alerts = mongoose.model('alerts','Alerts'),
    sensorData = mongoose.model('sensorData', 'SensorData');

exports.getWarehouseDetails = function(req, res){
    var warehouseMgr = req.body.user;
    warehouseDetails.find({warehouseManager: warehouseMgr}, function(err, details){
        if(err){
            res.send("Error in backend!");
        }
        else{
            if(details[0].warehouseId != undefined){
                var warehouseIds = [];
                for(var i = 0; i < details.length; i++){
                    warehouseIds.push(details[i].warehouseId);
                }
                getNodesForTheWarehouse(warehouseIds, details);
            }
        }
    });

    function getNodesForTheWarehouse(warehouseIds, details){
        warehouseNodeMap.find({warehouseId: {$in: warehouseIds}}, function(err, nodes){
           if(err){
               res.send("Error in backend!");
           }
            else{
               if(nodes[0].warehouseId != undefined){
                    getAlertsForNodes(nodes, details);
               }
           }
        });
    }

    function getAlertsForNodes(nodes, details){
        var nodes = nodes;
        var details = details;
        var totalNodeCount = 0;
        var nodeIds = [];

        for(var i = 0; i < nodes.length; i++){
            totalNodeCount += nodes[i].node.length;
        }

        for(var i = 0; i < nodes.length; i++){
            for(var j = 0; j < nodes[i].node.length; j++){
                nodeIds.push(nodes[i].node[j].nodeId);
            }
        }

        alerts.find({nodeId: {$in: nodeIds}}, function(err, resp){
           if(err){
               res.send("Error in backend!");
           }
            else{
               var nodeIdsParsed = [], breachedCount = 0, warningCount = 0;
               if(resp[0].nodeId != undefined){
                   for(var i = 0; i < resp.length; i++){
                       if(resp[i].alertType == 'ThresholdBased'){
                           if(nodeIdsParsed.indexOf(resp[i].nodeId) == -1){
                               nodeIdsParsed.push(resp[i].nodeId);
                               breachedCount++;
                           }
                       }
                       else if(resp[i].alertType == 'PredictionBased'){
                           if(nodeIdsParsed.indexOf(resp[i].nodeId) == -1){
                               nodeIdsParsed.push(resp[i].nodeId);
                               warningCount++;
                           }
                       }
                   }
                   var response = {details: details, nodes: nodes, totalNodes: totalNodeCount, breachedCount: breachedCount, warningCount: warningCount, safeCount : (totalNodeCount - (breachedCount+warningCount)), alerts: resp};
                   res.send(response);
               }
           }
        });
    }
};

exports.getWarehouseNodes = function(req, res){
    var warehouseId = req.body.id;
    warehouseNodeMap.find({warehouseId: warehouseId}, function(err, nodes){
       if(err){
           res.send('Error in backend!');
       }
        else{
           res.send(nodes);
       }
    });
};

exports.getAlerts = function(req, res){
  var id = req.body.id;
    var breach = [], warn = [];
    alerts.find({warehouseId: id}, function(err, resp){
        if(err){
            res.send('Error in backend!');
        }
        else{
            for(var i = 0; i < resp.length; i++){
                if(resp[i].alertType == 'ThresholdBased'){
                    breach.push(resp[i]);
            }
                else if(resp[i].alertType == 'PredictionBased'){
                    warn.push(resp[i]);
                }
            }
            getGrainsData(id, breach, warn);
        }
    });
    function getGrainsData(id, breach, warn){
        warehouseDetails.find({"warehouseId":id}, function(err, resp){
            if(resp){
                var respArr = [];
                var inventory = resp[0].inventory;
                for(var itr=0; itr<inventory.length; itr++){
                    var nodeArr = inventory[itr].nodeId;
                    var grain = inventory[itr].grain;
                    var qty = inventory[itr].qty/(nodeArr.length);

                    for(var idx=0; idx<nodeArr.length; idx++){

                        for(var x=0; x<breach.length; x++){
                            if(breach[x].nodeId == nodeArr[idx]){
                                respArr.push({"details":breach[x], "grain": grain, "qty": qty});
                                break;
                            }
                        }
                        for(var x=0; x<warn.length; x++){
                            if(warn[x].nodeId == nodeArr[idx]){
                                respArr.push({"details":warn[x], "grain": grain, "qty": qty});
                                break;
                            }
                        }
                    }
                }
                res.send(respArr);
            }
        });
    }
};

exports.getScore = function(req, res){
    var warehouseId = req.body.id;
    var appValuation = req.body.appValuation;
    var planCover = req.body.planCover;
    var premiumPercent = req.body.premiumPercent;
    warehouseNodeMap.find({warehouseId: warehouseId}, function(err, nodes){
        if(err){
            res.send('Error in backend!');
        }
        else {
            var nodeList = [];
            for(var i = 0; i < nodes[0].node.length; i++){
                nodeList.push(nodes[0].node[i].nodeId);
            }

            alerts.find({nodeId: {$in:nodeList}}, function (err, data) {
                if (err) {
                    res.send('Error in backend!');
                }
                else {
                    var noOfAlerts = data.length;
                    var score = 0.5 +noOfAlerts*(premiumPercent/100.0);
                    var premium = appValuation*(planCover/100.0)*(premiumPercent/100.0)*score;
                    res.send({premium: premium, score: score});
                }
            });
        }
    });
};

exports.getData = function(req, res){
    var nodeId = req.body.id;
    sensorData.find({nodeId: nodeId}, {},{sort: {timestamp: -1}}, function(err, data){
        if(err){
            res.send('Error in backend!');
        }
        else{
            res.send(data);
        }
    }).limit(20);
}
