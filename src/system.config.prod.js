;(function() {
  'use strict';

  // map tells the System loader where to look for things
  var map = {
    'app':                                'dist/dev/app',
    'rxjs':                               'node_modules/rxjs',
    '@angular':                           'node_modules/@angular'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'bootstrap.js', defaultExtension: 'js'  },
    'rxjs':                       { defaultExtension: 'js'                        }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };
  packages['@angular/forms'] =  { main: 'index.js', defaultExtension: 'js' };

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);
})();