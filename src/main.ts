// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, Type } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

// import common styles
import './app/assets/styles/styles.scss';

// import app component
import { AppComponent } from './app/';

bootstrap(<Type>AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err));







