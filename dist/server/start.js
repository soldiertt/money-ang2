"use strict";
var cluster = require("cluster");
var server_1 = require("./server");
var stopSignals = [
    "SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT",
    "SIGBUS", "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM"
], production = process.env.NODE_ENV === "production";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var stopping = false;
cluster.on("disconnect", function (worker) {
    if (production) {
        if (!stopping) {
            cluster.fork();
        }
    }
    else {
        process.exit(1);
    }
});
if (cluster.isMaster) {
    var workerCount = process.env.NODE_CLUSTER_WORKERS || 4;
    console.log("Starting " + workerCount + " workers...");
    for (var i = 0; i < workerCount; i++) {
        cluster.fork();
    }
    if (production) {
        stopSignals.forEach(function (signal) {
            process.on(signal, function () {
                console.log("Got " + signal + ", stopping workers...");
                stopping = true;
                cluster.disconnect(function () {
                    console.log("All workers stopped, exiting.");
                    process.exit(0);
                });
            });
        });
    }
}
else {
    var port = process.env.NODE_PORT || 3000, ipaddress = process.env.NODE_IP || "127.0.0.1";
    server_1.default.listen(port, ipaddress);
    console.log("Server running at http://" + ipaddress + ":" + port + "/");
}
