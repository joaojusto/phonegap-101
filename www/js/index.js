function startDDP() {
  var options = {
    endpoint: "ws://localhost:3000/websocket",
    SocketConstructor: WebSocket
  };

  var ddp = new DDP(options);

  ddp.on("connected", function () {
    console.log("Connected");

    ddp.sub("Photos");
    ddp.on("added", function (data) {
    });
  });

  return ddp;
}

function capturePhoto() {
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
}

function uploadPhoto(data){
// this is where you would send the image file to serverlo

//output image to screen
    console.log(data);
    cameraPic.src = data;
}

function sendNew(title, source) {
  ddp.method("newPost", [title, source], function (err, res) {
    if (err) throw err;
  });
}

ddp = startDDP();
