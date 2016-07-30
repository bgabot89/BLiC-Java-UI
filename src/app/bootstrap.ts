import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Type, enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';

// enable prod for faster renders
enableProdMode();

bootstrap(<Type>AppComponent,[
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS
]).catch(err => console.error(err));
