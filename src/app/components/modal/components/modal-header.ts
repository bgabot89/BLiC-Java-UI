import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
  selector: 'modal-header',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="modal-header">
    <button *ngIf="showClose"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            (click)="_modal.dismiss()">                
      <icon [name]="'close-icon'"></icon>
    </button>
    <ng-content></ng-content>
  </div>
  `,
  styles: [
    require('./modal-header.scss')
  ]
})
export class ModalHeaderComponent {
  @Input('show-close') showClose: boolean = false;
  constructor(private _modal: ModalComponent) {}
}