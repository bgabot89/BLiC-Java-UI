import { Component, Input } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
  selector: 'modal-footer',
  template:`
  <div class="modal-footer">
    <ng-content></ng-content>
    <button *ngIf="showDefaultButtons" 
            type="button" 
            class="btn btn-default" 
            data-dismiss="modal" 
            (click)="_modal.dismiss()">Close
    </button>
    <button *ngIf="showDefaultButtons" 
            type="button" 
            class="btn btn-primary" 
            (click)="_modal.close()">Save
    </button>
  </div>
  `
})
export class ModalFooterComponent {
  @Input('show-default-buttons') showDefaultButtons: boolean = false;
  constructor(private _modal: ModalComponent) {}
}