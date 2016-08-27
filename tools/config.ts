import { argv } from 'yargs';

// --------------
// Configuration.
const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

export const TOOLS_DIR      = 'tools';
export const DOCS_DEST      = 'docs';
export const DIST_DIR       = 'dist';
export const APP_SRC        = 'src';
export const APP_PRO        = 'public';
export const APP_PRO_LIB    = 'public/lib';
export const ASSETS_SRC     = `${APP_SRC}/assets`;

export const PORT           = argv['port']           || 4000;
export const DOCS_PORT      = argv['docs-port']      || 4003;
export const COVERAGE_PORT  = argv['coverage-port']  || 4004;

export const ENV            = _getEnvironment();
export const APP_BASE       = argv['base']           || '/';

export const APP_DEST       = `${DIST_DIR}/${ENV}`;
export const CSS_DEST       = `${APP_DEST}/css`;
export const JS_DEST        = `${APP_DEST}/js`;
export const DEV_DEST       = `${DIST_DIR}/dev`;
// export const PROD_DEST      = `${DIST_DIR}/prod`;
export const PROD_DEST      =  `${APP_PRO}`;
export const TMP_DEST       = `${DIST_DIR}/tmp`;

export const APP_ASSETS: InjectableDependency[] = [];

// Declare NPM dependencies (Note that globs should not be injected).
export const DEV_NPM_DEPENDENCIES: InjectableDependency[] = _normalizeDependencies([
  { src: 'core-js/client/shim.min.js',            inject: 'libs',  dest: JS_DEST     },
  { src: 'systemjs/dist/system.src.js',           inject: 'libs',  dest: JS_DEST     },
  { src: 'reflect-metadata/Reflect.js',           inject: 'libs',  dest: JS_DEST     },
  { src: 'rxjs/bundles/Rx.js',                    inject: 'libs',   dest: JS_DEST    },
  { src: 'zone.js/dist/zone.js',                  inject: 'libs',   dest: JS_DEST    }
]);
export const PROD_NPM_DEPENDENCIES: InjectableDependency[] = _normalizeDependencies([
  { src: 'core-js/client/shim.min.js',             inject: 'libs',   dest: JS_DEST   },
  { src: 'reflect-metadata/Reflect.js',            inject: 'libs',   dest: JS_DEST   },
  { src: 'systemjs/dist/system.js',                inject: 'libs',   dest: JS_DEST   },
  { src: 'rxjs/bundles/Rx.min.js',                 inject: 'libs',   dest: JS_DEST   },
  { src: 'zone.js/dist/zone.min.js',               inject: 'libs',   dest: JS_DEST   }
]);

export const DEV_DEPENDENCIES   = DEV_NPM_DEPENDENCIES.concat(APP_ASSETS);
export const PROD_DEPENDENCIES  = PROD_NPM_DEPENDENCIES.concat(APP_ASSETS);

// ---------------
// Private methods
// ---------------
function _getEnvironment(): string {
  let base: string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}

function _normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}

interface InjectableDependency {
  src: string;
  inject: string | boolean;
  dest?: string;
}