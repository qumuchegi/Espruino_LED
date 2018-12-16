var wifi=require('Wifi');
var http=require('http');
//var net=require('net');
var WebSocket=require('ws');
var ESP8266=require('ESP8266');
//ESP8266.reboot();

var WIFI_NAME = "cg";
var WIFI_OPTIONS = { password : "ch123456" };

//wifi.scan((msg)=>console.log(msg));
console.log('BH1750的SDA:',digitalRead(NodeMCU.D7));
/*** wifi连接热点，从而使ESP8266 连上inter网 ***/

wifi.connect(WIFI_NAME, WIFI_OPTIONS , function(err) {
  if (err) {
    console.log("Connection error: "+err);
    return;
  }
  console.log("wifi Connected!");
  //console.log(WebSocket);
  
  /** ws 连接云服务器，获取APP控制信号  **/
  
  var ws = new WebSocket('chegi.xyz',{
     path:'/',
     port:'80',
     protocolVersion: 13,
     protocol : "echo-protocol", // optional websocket protocol
     origin: 'Espruino',
     keepAlive: 60,  // Ping Interval in seconds.
     headers:{ some:'header', 'another-header':42 } // optional websocket headers
  });
  ws.on('open',function(){console.log('ws connected');});
  ws.on('message',function(data){
         console.log(data);
        // console.log(JSON.parse(data).light);
         if(typeof(JSON.parse(data))==='object'){
            console.log('light');
         }else                        
         digitalWrite(NodeMCU.D3,data);
         
         
         });
  
  /**                  **/
  
  
  
  
});