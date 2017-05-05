(
    function(){
        'use strict';

        angular
            .module('wmis')
            .controller('DashboardController', DashboardController);

        DashboardController.$inject = ['$scope', '$state', '$window', 'Authentication', '$rootScope', '$http'];

        function DashboardController($scope, $state, $window, Authentication, $rootScope, $http) {
            
            $scope.showModal = function(data) {
                var nodeId = data.details.nodeId;
                $http.post('/getData', {id: nodeId}).success(function(data){
                    nv.addGraph(function() {
                        var chart = nv.models.lineChart()
                            .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                            .transitionDuration(350)  //how fast do you want the lines to transition?
                            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                            .showYAxis(true)        //Show the y-axis
                            .showXAxis(true)        //Show the x-axis
                            ;

                        chart.xAxis     //Chart x-axis settings
                            .axisLabel('')
                            .tickFormat(d3.format(',r'));

                        chart.yAxis     //Chart y-axis settings
                            .axisLabel('Moisture')
                            .tickFormat(d3.format('.02f'));

                        /* Done setting the chart up? Time to render it!*/
                        var myData = sinAndCos();   //You need data...

                        document.getElementById('chartMoisture').innerHTML = '';
                        d3.select('#chartMoisture').append("svg:svg")    //Select the <svg> element you want to render the chart in.
                            .datum(myData)         //Populate the <svg> element with chart data...
                            .call(chart);          //Finally, render the chart!

                        //Update the chart when window resizes.
                        nv.utils.windowResize(function() { chart.update(); });
                        return chart;
                    });
                    /**************************************
                     * Simple test data generator
                     */
                    function sinAndCos() {
                        var sin = [];

                        //Data is represented as an array of {x,y} pairs.
                        for (var i = 0; i < data.length; i++) {
                            console.log(data[i].sensorMoisture);
                            sin.push({x: i, y: data[i].sensorMoisture});
                        }

                        //Line chart data should be sent as an array of series objects.
                        return [
                            {
                                values: sin,      //values - represents the array of {x,y} data points
                                key: 'Moisture', //key  - the name of the series.
                                color: '#ff7f0e'  //color - optional: choose your own line color.
                            }
                        ];
                    }


                    nv.addGraph(function() {
                        var chart = nv.models.lineChart()
                            .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                            .transitionDuration(350)  //how fast do you want the lines to transition?
                            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                            .showYAxis(true)        //Show the y-axis
                            .showXAxis(true)        //Show the x-axis
                            ;

                        chart.xAxis     //Chart x-axis settings
                            .axisLabel('')
                            .tickFormat(d3.format(',r'));

                        chart.yAxis     //Chart y-axis settings
                            .axisLabel('Temperarure (C)')
                            .tickFormat(d3.format('.02f'));

                        /* Done setting the chart up? Time to render it!*/
                        var myData1 = sinCos();   //You need data...

                        document.getElementById('chartTemperature').innerHTML = '';
                        d3.select('#chartTemperature').append("svg")    //Select the <svg> element you want to render the chart in.
                            .datum(myData1)         //Populate the <svg> element with chart data...
                            .call(chart);          //Finally, render the chart!


                        setTimeout(
                            function(){
                                window.dispatchEvent(new Event('resize'));
                            }, 100
                        );
                        //Update the chart when window resizes.
                        nv.utils.windowResize(function() { chart.update() });
                        return chart;
                    });
                    /**************************************
                     * Simple test data generator
                     */
                    function sinCos() {
                        var sin = [];

                        //Data is represented as an array of {x,y} pairs.
                        for (var i = 0; i < data.length; i++) {
                            console.log(data[i].sensorTemperature);
                            sin.push({x: i, y: data[i].sensorTemperature});
                        }

                        //Line chart data should be sent as an array of series objects.
                        return [
                            {
                                values: sin,      //values - represents the array of {x,y} data points
                                key: 'Temperature', //key  - the name of the series.
                                color: '#ff7f0e'  //color - optional: choose your own line color.
                            }
                        ];
                    }

                    nv.addGraph(function() {
                        var chart = nv.models.lineChart()
                            .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                            .transitionDuration(350)  //how fast do you want the lines to transition?
                            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                            .showYAxis(true)        //Show the y-axis
                            .showXAxis(true)        //Show the x-axis
                            ;

                        chart.xAxis     //Chart x-axis settings
                            .axisLabel('')
                            .tickFormat(d3.format(',r'));

                        chart.yAxis     //Chart y-axis settings
                            .axisLabel('Humidity (%)')
                            .tickFormat(d3.format('.02f'));

                        /* Done setting the chart up? Time to render it!*/
                        var myData2 = sinCos1();   //You need data...

                        document.getElementById('chartHumidity').innerHTML = '';
                        d3.select('#chartHumidity').append("svg:svg")    //Select the <svg> element you want to render the chart in.
                            .datum(myData2)         //Populate the <svg> element with chart data...
                            .call(chart);          //Finally, render the chart!

                        //Update the chart when window resizes.
                        nv.utils.windowResize(function() { chart.update() });
                        return chart;
                    });
                    /**************************************
                     * Simple test data generator
                     */
                    function sinCos1() {
                        var sin = [];

                        //Data is represented as an array of {x,y} pairs.
                        for (var i = 0; i < data.length; i++) {
                            console.log(data[i].sensorHumidity);
                            sin.push({x: i, y: data[i].sensorHumidity});
                        }

                        //Line chart data should be sent as an array of series objects.
                        return [
                            {
                                values: sin,      //values - represents the array of {x,y} data points
                                key: 'Humidity', //key  - the name of the series.
                                color: '#ff7f0e'  //color - optional: choose your own line color.
                            }
                        ];
                    }



                });
            };


            var map = new L.Map('map');
            document.getElementById('map').style.height = (window.innerHeight - 60) + 'px';
            //document.getElementById('dashboardWarehouseColumn').style.maxHeight = (window.innerHeight - 60) + 'px';

            // create the tile layer with correct attribution
            var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

            map.setView(new L.LatLng(12.971599, 77.594563),9);
            map.addLayer(osm);

            $http.post('/getWarehouseDetails',{"user":Authentication.user.email}).success(function(data){
                console.log(data);
                var details = data.details;
                $scope.warehouses = data.details;
                if(details[0] != undefined){
                    for(var i = 0; i < details.length; i++){
                        var marker = L.marker([details[i].warehouseLatitude, details[i].warehouseLongitude], {data: details[i]}).addTo(map)
                            .bindPopup(details[i].warehouseName + '<br/>' + details[i].warehouseLocation);

                        marker.on('mouseover', function (e) {
                            this.openPopup();
                        });
                        marker.on('mouseout', function (e) {
                            this.closePopup();
                        });

                        marker.on('click', function(e){
                            $scope.warehouseClicked(e);
                        })
                    }
                }
                $scope.warehouseCount = [];
                for(var w = 0; w < data.nodes.length; w++){
                    var totCnt = data.nodes[w].node.length;
                    var breachCnt = 0;
                    var warnCnt = 0;
                    var nodeIdParsed = [];
                    for(var n = 0; n < totCnt; n++){
                        var nodeId = data.nodes[w].node[n].nodeId;
                        for(var a = 0; a < data.alerts.length; a++){
                            if(nodeId == data.alerts[a].nodeId && nodeIdParsed.indexOf(data.alerts[a].nodeId) == -1){
                                if(data.alerts[a].alertType =='ThresholdBased'){
                                    breachCnt++;
                                }
                                else{
                                    warnCnt++;
                                }
                            }
                        }
                    }
                    $scope.warehouseCount.push({warehouseDetails: details[w], warehouseNodes: data.nodes[w], totalCount: totCnt, breached: breachCnt, warn: warnCnt, safe: (totCnt - (breachCnt+warnCnt))});
                }
            });
            $scope.capacity;
            $scope.randomDuration = function(){
                var duration = Math.floor(Math.random() * (12 - 5 + 1)) + 5;
                return duration;
            }
            $scope.warehouseClicked = function(warehouse){
                console.log(warehouse.target.options.data);
                var warehouse = warehouse.target.options.data;
                $scope.warehousesGrain = warehouse.inventory;
                document.getElementById("warehouseIdHead").innerHTML = warehouse.warehouseId;
                // $scope.capacity = warehouse.capacity;
                document.getElementById('capacity').innerHTML = warehouse.capacity;
                document.getElementById('region').innerHTML = warehouse.warehouseLocation;
                document.getElementById('dashboardcontent').style.display = 'none';
                document.getElementById('warehouseDetails').style.display = 'block';

                $http.post('/getWarehouseNodes',{id:warehouse.warehouseId}).success(function(data){
                   $scope.siloCount = data[0].node.length;
                });

                $scope.redArr = [], $scope.orangeArr = [];
                $http.post('/getAlerts',{"id":warehouse.warehouseId}).success(function(data){
                    for(var i = 0; i < data.length; i++){
                        if(data[i].details.alertType == 'ThresholdBased'){
                            $scope.redArr.push(data[i])
                        }else{
                            $scope.orangeArr.push(data[i]);
                        }
                    }
                    console.log($scope.redArr);
                });
                $http.post('/getScore',{"id":warehouse.warehouseId, "appValuation": 10000, "planCover": 60, "premiumPercent": 5}).success(function(data){
                    // $scope.score = data.score;
                    $scope.premium = data.premium;
                    var score = new JustGage({
                        id: "scoreGauge",
                        value: (100-data.score*100+50),
                        min: 0,
                        max: 100,
                        title: "Warehouse Management Index"
                    });
                });
            }
        }
    }
)();
