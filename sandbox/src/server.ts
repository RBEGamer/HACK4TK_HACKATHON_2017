// enabling IE 11 and beyond
// import "polyfills";


import "zone.js/dist/zone-node";
import "reflect-metadata";
import "rxjs/Rx";
import "xmlbuilder/lib/index"
import * as express from "express";
import {MainServerModule} from "./main.node";
// import {ngExpressEngine} from "./system/express-engine";
import {enableProdMode} from "@angular/core";
import {ngExpressEngine} from "@nguniversal/express-engine";

const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;


// Include the cluster module
var cluster = require('cluster');

const compression = require('compression');

// Code to run if we're in the master process
if (cluster.isMaster) {
  let cpuCount;
  if (process.env.NODE_PROCESS_COUNT) {
    cpuCount = process.env.NODE_PROCESS_COUNT;
  }
  else {
    cpuCount = 2;
  }

  console.log('Running Server with', cpuCount, 'Threads');

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

// Code to run if we're in a worker process
}
else {


  if ('production' == process.env.NODE_ENV) {
    console.log('++ Running in Production Mode ++')
    enableProdMode();
  }

  app.engine('html', ngExpressEngine({
    bootstrap: MainServerModule
  }));

  app.set('view engine', 'html');
  app.set('views', 'src');

  app.use(compression());

  app.use('/', express.static('dist', {index: false}));
  app.use('/', express.static('assets', {index: false}));
  app.use('/assets', express.static('assets', {index: false}));

  ['/*'].forEach(route => {
    app.get(route, (req, res) => {
      console.time(`[${cluster.worker.id}] GET: ${req.originalUrl}`);
      res.render('../dist/index', {
        req: req,
        res: res
      });
      console.timeEnd(`[${cluster.worker.id}] GET: ${req.originalUrl}`);
    });
  });

  app.listen(port, () => {
    console.log(`Listening at ${baseUrl}`);
  });
}

