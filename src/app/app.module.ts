import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app';
import { MODAL_DIRECTIVES } from './components/modal';
import { CollapseDirective } from './components/collapse';
import { IconComponent } from './components/icon';
import { SpinnerComponent } from './components/spinner';

import { SearchAPI } from './services/search-service';

@NgModule({
  declarations: [
    // components
    MODAL_DIRECTIVES,
    CollapseDirective,
    IconComponent,
    SpinnerComponent,

  ],
  exports: [
    // components
    MODAL_DIRECTIVES,
    CollapseDirective,
    IconComponent,
    SpinnerComponent,

    // modules
    CommonModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,

    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SearchAPI
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}