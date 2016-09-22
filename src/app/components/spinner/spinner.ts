import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'spinner',
  encapsulation: ViewEncapsulation.None,
  template:`
  <div class="spinner">
    <div *ngIf="_visible" class="sk-circle">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div>
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </div>
  </div>
  `,
  styles:[
    require('./spinner.scss')
  ]
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private _visible: boolean = false;

  ngOnInit(): void {
    this.hide();
  }

  ngOnDestroy(): void {
    this.hide();
  }

  show(): void {
    this._visible = true;
  }

  hide(): void {
    this._visible = false;
  }
}