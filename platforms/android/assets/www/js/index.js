/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  }
};

app.initialize();

function startDDP() {
  var options = {
    endpoint: "wss://localhost:3000",
    SocketConstructor: WebSocket
  };

  var ddp = new DDP(options);

  ddp.on("connected", function () {
    console.log("Connected");

    ddp.sub("Photos");
    ddp.on("added", function (data) {
        console.log(data.collection);
    });
  console.log(ddp);
  return ddp;
  });
}

function capturePhoto() {
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
}

function uploadPhoto(data){
// this is where you would send the image file to server

//output image to screen
    console.log(data);
    cameraPic.src = data;
}
