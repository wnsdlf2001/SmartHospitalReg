
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onResume, false);
    },
    onResume:function(){
        console.log('onResume');
    },
    onDeviceReady: function() {
        console.log('onDeviceReady');
        app.fcmInit();

        /*
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.on('activate', function() {
            cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
            console.log('onBackground');
        });
        */

        //app.beaconInit();


    },
    fcmInit:function(){
        if(device.platform.toUpperCase() === 'ANDROID'){
            localStorage.uuid=device.uuid; // 이부분 순서 수정해야함 일단 가라로
            FCMPlugin.getToken(function(token){
                $.get("http://13.124.174.108:3000/api/setDevice",{
                    uuid: device.uuid,
                    fcmid: token
                }).done(function(data){                    
                    console.log("request setDevice done");
                });
            },function(err){
                alert('error retrieving token: ' + err);
            });

            FCMPlugin.onNotification(
                function(data){
                    //alert(data);

                    if(data.isMove){
                       // alert(data.isMove);
                        $.get("http://13.124.174.108:3000/api/isReserve",{
                            user:localStorage.user
                        }).done(function(data){
                            localStorage.hospitalId = 1;
                            if(data.isReserve===true) {
                                document.location = 'beacon2.html';
                            }
                            else
                                document.location = 'beacon.html';
                        });
                    }
                    if(data.isCall){
                        document.location='myturn.html';
                    }
                    //data.deviceId


                    // 푸쉬 날라오면 실행되는거
                    //alert(data.num1);
                    //alert(data.num2);
                },
                function(msg){
                    console.log('onNotification callback successfully registered: ' + msg);
                },
                function(err){
                    console.log('Error registering onNotification callback: ' + err);
                }
            );
        }
    },
    beaconInit:function(){


        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function(pluginResult){
            console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
        };
        delegate.didStartMonitoringForRegion = function(pluginResult){
            console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };
        delegate.didRangeBeaconsInRegion = function(pluginResult){
            console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
            console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult.beacons[0].minor));

            console.log("inflag before : "+ window.inFlag);
            if(pluginResult.beacons[0].minor == "14030"){
                var beacon = pluginResult.beacons[0];    
                console.log('checking..');
                if(beacon.proximity === 'ProximityNear' || beacon.proximity === 'ProximityImmediate'){
                    console.log('Near');
                    console.log(JSON.stringify(beacon));

                    if(window.inFlag===0){
                        window.inFlag=1;
                        console.log('testCall');
                        localStorage.hospitalId = 1;
                        $.get("http://13.124.174.108:3000/api/isReserve",{
                            user:localStorage.user
                        }).done(function(data){
                            console.log(data.isReserve)

                            if(data.isReserve===true)
                                document.location='beacon2.html';
                            else
                                document.location='beacon.html';
                        });
                        console.log("inflag after : "+window.inFlag);
                    }
                }
                else if(beacon.proximity === 'ProximityFar' || beacon.proximity === 'ProximityUnknown' ){
                    console.log('Far');
                    console.log(JSON.stringify(beacon));
                    window.inFlag=0;
                }
            }
            else if(pluginResult.beacons[0].minor == "13635"){
                var beacon = pluginResult.beacons[0];
                console.log('checking..');
                if(beacon.proximity === 'ProximityNear' || beacon.proximity === 'ProximityImmediate'){
                    console.log('Near');
                    console.log(JSON.stringify(beacon));
                    if(window.inFlag===0){
                        window.inFlag=1;
                        console.log('testCall');
                        localStorage.hospitalId = 2;
                        $.get("http://13.124.174.108:3000/api/isReserve",{
                            user:localStorage.user
                        }).done(function(data){
                            console.log(data.isReserve)
                            if(data.isReserve===true)
                                document.location='beacon2.html';
                            else
                                document.location='beacon.html';
                        });
                        console.log("inflag after : "+window.inFlag);
                    }
                }
                else if(beacon.proximity === 'ProximityFar' || beacon.proximity === 'ProximityUnknown'){
                    console.log('Far');
                    console.log(JSON.stringify(beacon));
                    window.inFlag=0;
                }
            }
        }

        var hospitala = new cordova.plugins.locationManager.BeaconRegion('hospitala', 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0', 30001, 14030);
        var hospitalb = new cordova.plugins.locationManager.BeaconRegion('hospitalb', 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0', 30001, 13635);
        cordova.plugins.locationManager.setDelegate(delegate);

        cordova.plugins.locationManager.startMonitoringForRegion(hospitala)
        .fail(console.error)
        .done();

        cordova.plugins.locationManager.startMonitoringForRegion(hospitalb)
            .fail(console.error)
            .done();

        cordova.plugins.locationManager.startRangingBeaconsInRegion(hospitala)
        .fail(console.error)
        .done();

        cordova.plugins.locationManager.startRangingBeaconsInRegion(hospitalb)
            .fail(console.error)
            .done();

        cordova.plugins.notification.local.schedule({
            id: 1,
            title: '톡톡 어플을 실행하여 접수해주세요!'
        });

        /*cordova.plugins.locationManager.stopMonitoringForRegion(beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();

        cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
        cordova.plugins.locationManager.isBluetoothEnabled()
            .then(function(isEnabled){
                console.log("isEnabled: " + isEnabled);
                if (isEnabled) {
                    cordova.plugins.locationManager.disableBluetooth();
                } else {
                    cordova.plugins.locationManager.enableBluetooth();
                }
            })
            .fail(function(e) { console.error(e); })
            .done();*/
    }

};

app.initialize();
