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
      <img class="close-icon" src="app/assets/icons/ic_close_24px.svg" alt="close icon">
    </button>
    <ng-content></ng-content>
  </div>
  `,
  styles: [`
  .modal-header .modal-title {
    font-size: 20px;
    color: #636363;
  }
  .modal-header .close-icon {
    margin-top: 5px;
  }
  `]
})
export class ModalHeaderComponent {
  @Input('show-close') showClose: boolean = false;
  constructor(private _modal: ModalComponent) {}
}