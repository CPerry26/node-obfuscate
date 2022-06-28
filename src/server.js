var app = require('./app');

var port = 3000;

// Start a new server which listens on the port. This should really come
// from a configuration (i.e. config file, ENV, ConfigMap in K8s).
var server = app.listen(port, () => {
    console.log("Server up and running on port " + port);
});