var options = {
  endpoint: "ws://localhost:3000/websocket",
  SocketConstructor: WebSocket
};

function start() {
  window.ddp = new DDP(options);

  ddp.on("connected", connected);}

function connected() {
  subscriptons();
  events();
}

function subscriptions() {
  ddp.sub("Photos");
}

function events() {
  ddp.on("added", function (data) {
  });
}

function postFile(title, file) {
  ddp.method("newPost", [title, file], function (err, res) {
    if (err) throw err;
  });
}

start();
