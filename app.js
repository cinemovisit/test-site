'use strict'

const express = require('express');
const q = require('q');
const EventEmitter = require('events')

const app = express()
const eventEmitter = new EventEmitter();
const pkg = require('./package.json');

function getVersion() {
    return pkg.version;
}

function createRoutes() {

    app.get('/api/version', (req, res) => res.send(getVersion()));

    return q();
}

function serve() {
    
    app.listen(pkg.config.service.port, () => console.log(`cinemo listening on port ${pkg.config.service.port}`));
    
    return q();
}

function main() {

    createRoutes()
        .then(serve)
        .catch(function(err) {
            console.log(err);
            eventEmitter.emit('done');
        });

    // keep alive
    eventEmitter.on('done', function(r) {});
}

(function() {
    main();
})();
