import { Component, ViewEncapsulation,  OnInit } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import { MODAL_DIRECTIVES, ModalComponent } from '../modal/index'

@Component({
  // moduleId: module.id,
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [REACTIVE_FORM_DIRECTIVES, MODAL_DIRECTIVES],
  templateUrl: 'components/demo-app/app.component.html'
})
export class AppComponent implements OnInit {
  selected: string;
  output: string;

  keyboard: boolean = true;
  animation: string | boolean = true;
  backdrop: string | boolean  = true;

  // loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // initialize login form
    // this.loginForm = this._formBuilder.group({
    //   email: ['jkan@gmail.com', Validators.compose([Validators.required,])],
    //   password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    // });

  }

  redirectTo(modal: ModalComponent): any {
    modal.open();
  }

  closed() {
    this.output = '(closed)';
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  opened() {
    this.output = '(opened)';
  }


}
