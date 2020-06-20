import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
var compress = require('compression');

import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Fix the `Event is not defined` error https://github.com/angular/universal/issues/844
global['Event'] = null;

// Express server
const app = express();
app.use(compress());

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files from /browser
const router = express.Router();

router.use(express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
router.get('*', (req, res) => {
  // res.render('index', { req });
  // this is for i18n
  const supportedLocales = ['bg', 'en'];
  const defaultLocale = 'bg';

  let locale = req.acceptsLanguages(supportedLocales);
  if (!locale) locale = defaultLocale;

  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }

  // not working now: we're using one dist/browser build and server per each language
  res.render(`index`, {
    req,
    providers: [
      { provide: 'language', useFactory: () => locale, deps: [] },
      { provide: 'locale', useFactory: () => locale, deps: [] },
      { provide: 'ip', useFactory: () => ip, deps: [] },

    ]
  });
});

app.use(process.env.WEBCLIENT_BASE_HREF, router);

// Start up the Node server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
