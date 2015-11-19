angular.module("serverApp", ['ngRoute', 'ngResource']) 
  .controller('home', ['$scope','$location', function ($scope,$location) {
        
    $scope.getServer = function() {       
      $location.path('/server');
    }

    $scope.notify = function(){
      $location.path('/notificationtemplate'); 
    }

    $scope.observe = function(){
      $location.path('/observetemplate'); 
    }

    $scope.writeAttributes = function(){
      $location.path('/writeAttributeTemplate'); 
    }        

    $scope.readDeviceData = function(){
      $location.path('/readDatatemplate'); 
    }

    $scope.writeDeviceData = function(){
      $location.path('/writeDatatemplate'); 
    }

    $scope.deleteDeviceData = function(){
      $location.path('/deleteDatatemplate'); 
    }

    $scope.executeOnDevice = function(){
      $location.path('/executeDatatemplate'); 
    }

    $scope.discoverDevice = function(){
      $location.path('/discovertemplate'); 
    }

    $scope.createDeviceRecord = function(){
      $location.path('/createDatatemplate'); 
    }
    
}])
  .controller('serverController', ['$scope','$location','$http','$window',function ($scope,$location,$http,$window) {
      
    $scope.dr={};
    $scope.dc={};
    $scope.da={};
    $scope.patient={};
    $scope.parecord = {};

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.clear = function(resource) {       
      if(resource == 'devregister')
        $scope.readDR='false';
      if(resource == 'devconfig')
        $scope.readDC='false';
      if(resource == 'devallocation')
        $scope.readDA='false';
      if(resource == 'patient')
        $scope.readPatient='false';
      if(resource == 'patient_record')
        $scope.readPatientRecord='false';
    }

    $scope.create = function(resource) {  
       
      var postdata = {}; 
      if(resource == 'devregister'){
        
        postdata = {
          device_id : $scope.dr.device_id,
          device_uri : $scope.dr.device_uri,        
          manufacturer : $scope.dr.manufacturer,
          model : $scope.dr.model,
          firmware : $scope.dr.firmware,
          serial : $scope.dr.serial
        };
      }
      else if(resource == 'devconfig'){
        postdata = {
          device_id : $scope.dc.device_id,
          parameter_name : $scope.dc.parameter_name,          
          frequency : $scope.dc.frequency,        
          disable : $scope.dc.disable,
          safe_value : $scope.dc.safe_value
        };
      }
      else if(resource == 'devallocation'){
        postdata = {
          device_id : $scope.da.device_id,
          room_no : $scope.da.room_no,        
          patient_id : $scope.da.patient_id,
          priority : $scope.da.priority
        };
      }
      else if(resource == 'patient'){
        postdata = {
          patient_name : $scope.patient.patient_name,
          symptoms : $scope.patient.symptoms          
        };
      }
      else if(resource == 'patient_record'){
        postdata = {
          device_id : $scope.parecord.device_id,
          parameter_name : $scope.parecord.parameter_name,          
          value : $scope.parecord.value
        };
      }
      else{
        // do nothing
      }

      $http.post('/server/'+resource,postdata).
        success(function (data){             
              console.log("Create " + data);
              $scope.dr={};
              $scope.dc={};
              $scope.da={};
              $scope.patient={};
              $scope.parecord={};
              alert('Record created successfully');
        }).
        error(function(data,status){            
          console.log('Opps error',data);
        });
    }

    $scope.read = function(resource) {      
      $http.get('/server/'+resource).
          success(function (data){                   
                
                if(resource == 'devregister'){
                  $scope.dr_Resdata = data;
                  $scope.readDR='true';
                }
                else if(resource == 'devconfig'){
                  $scope.dc_Resdata = data;
                  $scope.readDC='true';
                }
                else if(resource == 'devallocation'){
                  $scope.da_Resdata = data;
                  $scope.readDA='true';
                }
                else if(resource == 'patient'){
                  $scope.patient_Resdata = data;
                  $scope.readPatient='true';
                }
                else if(resource == 'patient_record'){
                  $scope.parecord_Resdata = data;
                  $scope.readPatientRecord='true';
                }
                else{
                  //do nothing
                }                
          }).
          error(function(data,status){            
            console.log('Opps error',data);
          });          
    }

    $scope.update = function(resource) {      
      
      if(resource == 'devregister'){
        angular.forEach($scope.dr_Resdata, function(drdata){
          if(drdata.Selected){               
            $http.put('/server/'+resource,drdata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'devconfig'){
        angular.forEach($scope.dc_Resdata, function(dcdata){
          if(dcdata.Selected){               
            $http.put('/server/'+resource,dcdata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'devallocation'){
        angular.forEach($scope.da_Resdata, function(dadata){
          if(dadata.Selected){               
            $http.put('/server/'+resource,dadata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'patient'){
        angular.forEach($scope.patient_Resdata, function(padata){
          if(padata.Selected){               
            $http.put('/server/'+resource,padata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'patient_record'){
        angular.forEach($scope.parecord_Resdata, function(parecorddata){
          if(parecorddata.Selected){               
            $http.put('/server/'+resource,parecorddata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else{
        //do nothing
      }
    }

    $scope.delete = function(resource) {       
      
      if(resource == 'devregister'){
        angular.forEach($scope.dr_Resdata, function(drdata){
          if(drdata.Selected){               
            $http.delete('/server/'+resource+'/'+drdata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'devconfig'){
        angular.forEach($scope.dc_Resdata, function(dcdata){
          if(dcdata.Selected){               
            $http.delete('/server/'+resource+'/'+dcdata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'devallocation'){
        angular.forEach($scope.da_Resdata, function(dadata){
          if(dadata.Selected){               
            $http.delete('/server/'+resource+'/'+dadata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'patient'){
        angular.forEach($scope.patient_Resdata, function(padata){
          if(padata.Selected){               
            $http.delete('/server/'+resource+'/'+padata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'patient_record'){
        angular.forEach($scope.parecord_Resdata, function(parecorddata){
          if(parecorddata.Selected){               
            $http.delete('/server/'+resource+'/'+parecorddata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else{
        //do nothing
      }     
    }
    
}])
.controller('operationController', ['$scope','$location','$http','$window',function ($scope,$location,$http,$window) {        

    $scope.readDeviceDataFlag=false;

    $scope.parameter={};
    $scope.parameters=['temperature','bloodpressure','pulse'];
    $scope.devices={};
    $scope.liveDevices=[];
    $scope.device={};
    $scope.deviceData = {};
    $scope.configurations={};
    $scope.modifyDC='false';
    var resource = 'devregister';
    var postdata = {};

    $http.get('/server/'+resource).
      success(function (data){                              
              $scope.devices = data;               
      }).
      error(function(data,status){            
        console.log('Opps error',data);            
      });

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.clear = function() {      
    }

    $scope.getDeviceRecord = function(device){

        $http.get('/server/chkdevconfig/'+device.device_id).
          success(function (data){                                                
                  if(data == ''){ 
                    $scope.modifyDC='false';
                    $scope.parameter = {};
                    $scope.configurations = {};
                  }                    
                  else{
                    $scope.configurations = data[0];
                    $scope.parameter.name = $scope.configurations.parameter_name;
                    $scope.parameter.frequency = $scope.configurations.frequency;
                    $scope.parameter.safe_value = $scope.configurations.safe_value;
                    if($scope.configurations.disable == 1)
                      $scope.parameter.disableFlag = 'yes';
                    else
                      $scope.parameter.disableFlag = 'no';
                    $scope.modifyDC='true';
                  }                    
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });
    }

    $scope.writeAttribute = function(device){
        
        var server_uri='http://localhost:3001/server/patient_record';
        var disableValue=0;
        if($scope.parameter.disableFlag == 'yes'){
          disableValue = 1;
        }
        else{
          disableValue = 0;
        }

        postdata = {
          device_id : parseInt($scope.device.device_id),
          parameter_name : $scope.parameter.name,          
          frequency : parseInt($scope.parameter.frequency),        
          disable : disableValue,
          safe_value : parseInt($scope.parameter.safe_value)
        };

        $http.put('/server/writeTodevconfig',postdata).
          success(function (data){
                  alert('Server Record updated successfully');            
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });

        postdata = {
          server_uri : server_uri,
          frequency : parseInt($scope.parameter.frequency),
          parameter_name : $scope.parameter.name,
          last_value : 0,      
          disable : disableValue
        };

        $http.put(device.device_uri+'/writeAttribReportingconfig',postdata).
          success(function (data){                                                
                  $scope.parameter={};
                  $scope.device={};
                  alert('Client Record updated successfully');            
          }).
          error(function(data,status){            
            $scope.parameter={};
            $scope.device={};
            console.log('Opps error',data);            
          });
    }

    $scope.readDeviceData = function(device){        
      $scope.deviceData = {};
      var headers = {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Headers' : 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, X-Requested-With',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE, OPTIONS'
      };

        $http.get(device.device_uri+'/readDataValue/'+$scope.parameter.name).
          success(function (data){                                                
                  $scope.deviceData=data[0];
                  $scope.readDeviceDataFlag=true;
                  console.log(data);
          }).
          error(function(data,status){            
            $scope.deviceData=data[0];            
            console.log('Opps error',data);            
          });
      //alert($scope.readDeviceDataFlag);
    }

    $scope.writeDeviceData = function(device){

      var server_uri='http://localhost:3001/server/patient_record';
      postdata = {              
        server_uri : server_uri,
        parameter_name : $scope.parameter.name,
        last_value : $scope.parameter.last_value
      };

      $http.put(device.device_uri+'/writereportingconfig',postdata).
        success(function (data){                                                
                $scope.parameter={};
                $scope.device={};
                alert('Client Record updated successfully');            
        }).
        error(function(data,status){            
          $scope.parameter={};
          $scope.device={};
          console.log('Opps error',data);            
        });
    }

    $scope.createDeviceRecord = function(device){
        
        var server_uri='http://localhost:3001/server/patient_record';
        var disableValue=0;
        if($scope.parameter.disableFlag == 'yes'){
          disableValue = 1;
        }
        else{
          disableValue = 0;
        }

        postdata = {
          device_id : parseInt($scope.device.device_id),
          parameter_name : $scope.parameter.name,          
          frequency : parseInt($scope.parameter.frequency),        
          disable : disableValue,
          safe_value : parseInt($scope.parameter.safe_value)
        };

        $http.post('/server/devconfig',postdata).
          success(function (data){
                  alert('Server Record created successfully');            
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });

        postdata = {
          server_uri : server_uri,
          frequency : parseInt($scope.parameter.frequency),
          parameter_name : $scope.parameter.name,
          device_id : $scope.device.device_id,
          last_value : 0,       
          disable : disableValue
        };

        $http.post(device.device_uri+'/reportingconfig',postdata).
          success(function (data){                                                
                  $scope.parameter={};
                  $scope.device={};
                  alert('Client Record created successfully');            
          }).
          error(function(data,status){            
            $scope.parameter={};
            $scope.device={};
            console.log('Opps error',data);            
          });
    }

    $scope.deleteDeviceRecord = function(device){
        
        var server_uri='http://localhost:3001/server/patient_record';        

        $http.delete('/server/deletedevconfigrecord/'+parseInt($scope.device.device_id)+'/'+$scope.parameter.name).
          success(function (data){
                  alert('Server Record deleted successfully');            
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });        

        $http.delete(device.device_uri+'/reportingconfig/'+$scope.parameter.name+'/'+parseInt($scope.parameter.frequency)).
          success(function (data){                                                
                  $scope.parameter={};
                  $scope.device={};
                  alert('Client Record deleted successfully');            
          }).
          error(function(data,status){            
            $scope.parameter={};
            $scope.device={};
            console.log('Opps error',data);            
          });
    }

    $scope.executeOnDevice = function(device){        

        $http.get(device.device_uri+'/execute/').
          success(function (data){                  
                  console.log(data);
                  alert("Execution Successful");
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });       
                
    }

    $scope.discoverDevices = function(){        

        var log =[];
        angular.forEach($scope.devices,function(device){
          $http.get(device.device_uri+'/discover').
          success(function (data){                  
                  console.log(data);                  
          }).
          error(function(data,status,headers){  
            if(device.device_id == 1505)
              $scope.liveDevices.push(device);
            console.log('Opps error',headers());            
          });
        },log);               
                
    }
    
}])
.controller('infoMgmtController', ['$scope','$location','$http','$window',function ($scope,$location,$http,$window) {
          

    $scope.devices={};
    $scope.device={};
    $scope.configurations={};
    $scope.parameter={};

    var resource = 'devregister';
    var postdata = {};

    $http.get('/server/'+resource).
      success(function (data){                              
              $scope.devices = data;               
      }).
      error(function(data,status){            
        console.log('Opps error',data);            
      });

    $scope.getNotifications = function(){
      var log=[];
      $scope.notifications=[];
      $scope.notiRecord={};
      var Arrdevice_id=[];
      var Arrparameter_name = [];
      var Arrpatient_name = [];
      var Arrsafe_value = [];
      var Arrroom_no=[];
      var Arrvalue=[];
      var i=0;

      var resource = 'devallocation';

      $http.get('/server/'+resource).
        success(function (allocateddevices){                                          
                angular.forEach(allocateddevices,function(record){
                  
                  Arrdevice_id.push(record.device_id);
                  Arrroom_no.push(record.room_no);

                  //fetching patient name
                  $http.get('/server/patient/'+record.patient_id).
                    success(function (patientData){                    
                      Arrpatient_name.push(patientData[0].patient_name);

                      //fetching parameter name and safe value
                      $http.get('/server/chkdevconfig/'+record.device_id).
                        success(function (deviceData){                        

                          Arrparameter_name.push(deviceData[0].parameter_name);
                          Arrsafe_value.push(deviceData[0].safe_value);

                          $http.get('/server/chkfornotifications/'+record.device_id+'/'+deviceData[0].safe_value).
                          success(function (notificationData){
                            if(notificationData.length > 0){

                              Arrvalue.push(notificationData[0].value);

                              $scope.notiRecord.device_id = Arrdevice_id[i];
                              $scope.notiRecord.room_no = Arrroom_no[i];
                              $scope.notiRecord.patient_name = Arrpatient_name[i];
                              $scope.notiRecord.parameter_name = Arrparameter_name[i];
                              $scope.notiRecord.safe_value = Arrsafe_value[i];
                              $scope.notiRecord.value = Arrvalue[i];                            
                              i++;                        
                            }
                            $scope.notifications.push($scope.notiRecord);
                            $scope.notiRecord = {};
                          });
                        });
                    });                          
                },log);
        }).
        error(function(data,status){            
          console.log('Opps error',data);            
        });
    }

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.getDeviceRecord = function(device){

        $http.get('/server/chkdevconfig/'+device.device_id).
          success(function (data){                                                
                  if(data == ''){ 
                    $scope.parameter = {};
                    $scope.configurations = {};
                  }                    
                  else{
                    $scope.configurations = data[0];
                    $scope.parameter.name = $scope.configurations.parameter_name;
                    $scope.parameter.frequency = $scope.configurations.frequency;
                    $scope.parameter.safe_value = $scope.configurations.safe_value;
                    if($scope.configurations.disable == 1)
                      $scope.parameter.disableFlag = 'yes';
                    else
                      $scope.parameter.disableFlag = 'no';
                  }                    
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });
    }

    $scope.writeAttribute = function(device){
        
        var server_uri='http://localhost:3001/server/patient_record';
        var disableValue=0;
        if($scope.parameter.disableFlag == 'yes'){
          disableValue = 1;
        }
        else{
          disableValue = 0;
        }

        postdata = {
          device_id : parseInt($scope.device.device_id),
          parameter_name : $scope.parameter.name,          
          frequency : parseInt($scope.parameter.frequency),        
          disable : disableValue,
          safe_value : parseInt($scope.parameter.safe_value)
        };

        $http.post('/server/devconfig',postdata).
          success(function (data){
                  alert('Server Record created successfully');            
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });

        postdata = {
          server_uri : server_uri,
          frequency : parseInt($scope.parameter.frequency),
          parameter_name : $scope.parameter.name,
          device_id : $scope.device.device_id,
          last_value : 0,       
          disable : disableValue
        };

        $http.post(device.device_uri+'/reportingconfig',postdata).
          success(function (data){                                                
                  $scope.parameter={};
                  $scope.device={};
                  alert('Client Record created successfully');            
          }).
          error(function(data,status){            
            $scope.parameter={};
            $scope.device={};
            console.log('Opps error',data);            
          });
    }
    
    $scope.observeStatus = function(device,state){
        
        var server_uri='http://localhost:3001/server/patient_record';
        var disableValue;
        if(state == 'observe')
          disableValue=0;
        else if(state == 'deobserve')      
          disableValue=1;
        else
          disableValue=0;

        postdata = {                  
          device_id : parseInt($scope.device.device_id),
          disable : disableValue
        };

        $http.put('/server/updatedevconfig',postdata).
          success(function (data){
                  alert('Server Record updated successfully');            
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });

        postdata = {              
          server_uri : server_uri,
          parameter_name : $scope.parameter.name,
          disable : disableValue
        };

        $http.put(device.device_uri+'/updatereportingconfig',postdata).
          success(function (data){                                                
                  $scope.parameter={};
                  $scope.device={};
                  alert('Client Record updated successfully');            
          }).
          error(function(data,status){            
            $scope.parameter={};
            $scope.device={};
            console.log('Opps error',data);            
          });
    }
}])
  .config(['$routeProvider',function($routeProvider){
  	$routeProvider
  	.when('/', {      
      templateUrl: '/home',
      controller: 'home'
    })
  	.when('/server', {
  		templateUrl: '/server',
  		controller: 'serverController'
  	})
    .when('/writeAttributeTemplate', {
      templateUrl: '/writeAttributeTemplate',
      controller: 'operationController'
    })
    .when('/notificationtemplate', {
      templateUrl: '/notificationtemplate',
      controller: 'infoMgmtController'
    })
    .when('/observetemplate', {
      templateUrl: '/observetemplate',
      controller: 'infoMgmtController'
    })
    .when('/readDatatemplate', {
      templateUrl: '/readDatatemplate',
      controller: 'operationController'
    })
    .when('/writeDatatemplate', {
      templateUrl: '/writeDatatemplate',
      controller: 'operationController'
     })
    .when('/createDatatemplate', {
      templateUrl: '/createDatatemplate',
      controller: 'operationController'
    })
    .when('/deleteDatatemplate', {
      templateUrl: '/deleteDatatemplate',
      controller: 'operationController'
    })
    .when('/executeDatatemplate', {
      templateUrl: '/executeDatatemplate',
      controller: 'operationController'
    })
    .when('/discovertemplate', {
      templateUrl: '/discovertemplate',
      controller: 'operationController'
    });
  }]);