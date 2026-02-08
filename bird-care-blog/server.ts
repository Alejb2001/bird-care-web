import 'zone.js/node';

import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = join(serverDistFolder, '../browser');

  const angularApp = new AngularAppEngine();

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.use('*', (req, res, next) => {
    angularApp
      .handle(req)
      .then(response => {
        if (response) {
          res.status(response.status);
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          response.text().then(body => res.send(body));
        } else {
          next();
        }
      })
      .catch(next);
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`🚀 Node Express server listening on http://localhost:${port}`);
  });
}

run();

export * from './src/main.server';
