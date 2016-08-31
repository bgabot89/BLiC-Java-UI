import { bootstrap } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Type, enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

// enable prod for faster renders
enableProdMode();

bootstrap(<Type>AppComponent,[
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err));
