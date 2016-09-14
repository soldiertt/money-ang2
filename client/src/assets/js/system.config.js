(function(global) {

  var paths = {
    // paths serve as alias
    'npm:': 'lib/'
  };

  // map tells the System loader where to look for things
  var map = {
    'app':                        'dist',
    'rxjs':                       'npm:rxjs',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    'angular2-cookie': 'npm:angular2-cookie'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: './boot.js',  defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'angular2-cookie': {
      main: './core.js',
      defaultExtension: 'js'
    }
  };

  var config = {
    paths: paths,
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
