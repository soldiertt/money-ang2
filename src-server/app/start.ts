import * as cluster from "cluster";
import app from "./server";

let stopSignals = [
  "SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT",
  "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM"
  ],
  production = process.env.NODE_ENV === "production";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

let stopping = false;

cluster.on("disconnect", function(worker) {
  if (production) {
    if (!stopping) {
      cluster.fork();
    }
  } else {
    process.exit(1);
  }
});

if (cluster.isMaster) {
  const workerCount = process.env.NODE_CLUSTER_WORKERS || 4;
  console.log(`Starting ${workerCount} workers...`);
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }

  if (production) {
    stopSignals.forEach(function (signal) {
      process.on(signal, function () {
        console.log(`Got ${signal}, stopping workers...`);
        stopping = true;
        cluster.disconnect(function () {
          console.log("All workers stopped, exiting.");
          process.exit(0);
        });
      });
    });
  }
} else {

  let port = process.env.NODE_PORT || 3000,
      ipaddress = process.env.NODE_IP || "127.0.0.1";
  app.listen(port, ipaddress);
  console.log("Server running at http://" + ipaddress + ":" + port + "/");

}
