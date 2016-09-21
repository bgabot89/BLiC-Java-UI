import { Component, ViewEncapsulation,  OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import { MODAL_DIRECTIVES, ModalComponent } from './components/modal/index';
import { CollapseDirective } from './components/collapse/index';

import { SearchAPI } from './services/search-service';
import { SpinnerComponent } from './components/spinner/index';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    MODAL_DIRECTIVES,
    SpinnerComponent,
    CollapseDirective
  ],
  providers: [
    SearchAPI
  ],
  template: `
  <h1 class="title">Broken links checker</h1>
  
  <form class="search" [formGroup]="searchForm" #f="ngForm" (ngSubmit)="search(f.value)" novalidate>
    <div class="input-container">
      <input type="url"
             name="url"
             class="search-input" 
             placeholder="Enter a url here and press enter"
             formControlName="url"
      >
      <button type="submit" class="submit-button" [disabled]="!f.valid">
        <i *ngIf="!isLoading" class="fa fa-search" aria-hidden="true"></i>
        <spinner></spinner>       
      </button>               
      <div class="input-border"></div>  
    </div>
  </form>
  
  <div class="footer">      
    <p><a (click)="redirectTo(resultModal)">open modal popup here </a></p>
  
    <i class="fa fa-code" aria-hidden="true"></i>
  
    by <a href="https://github.com/jaykan" target="blank">Jay Kan</a> with
  
    <i class="fa fa-heart" aria-hidden="true"></i>
    <div>
      Fork on
      <a href="https://github.com/codeforsanjose/BLiC-Java-UI" target="blank">
        <i class="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
  </div>
  
  <modal (onClose)="reset()" (onDismiss)="reset()" #resultModal>
    <modal-header [show-close]="true">
      <h4 class="modal-title">Search Result <small>{{ searchResults?.total }}</small></h4>
    </modal-header>
  
    <modal-body>         
      <template ngFor [ngForOf]="searchResults" let-t="$implicit">
        <div class="margin-bottom-20" (click)="collapse(t);">
          <header class="result-table-header" [ngClass]="{'error': t.key === 'Errors', 'success': t.key === 'Success', 'others': t.key === 'Others'}">
            <h5>{{ t.key }} <small> ({{ t.value.length }})</small></h5>
            <i class="fa" [ngClass]="{'fa-angle-down': !t.isCollapsed, 'fa-angle-up': t.isCollapsed}" aria-hidden="true"></i>
          </header>
          
          <section [collapse]="t.isCollapsed">
            <header class="result-table-headline">
              <span class="url">URL</span>
              <span class="status">STATUS</span>
              <span class="linked-pages">LINKED PAGES</span> 
            </header>
            
            <div class="result-table-body">                
            <section *ngFor="let record of t.value; let i = index;" [ngClass]="{'error-border': t.key === 'Errors', 'success-border': t.key === 'Success', 'others-border': t.key === 'Others'}">
              <span style="width:40%;display: inline-block;font-size:11px;overflow-wrap: break-word;">
                {{ record.url }}
              </span>
              <span style="width:12%;display: inline-block;font-size:11px;overflow-wrap: break-word;padding: 0 8px;">
                {{ record.status }}
              </span>
              
              <span style="width:45%;display: inline-block;font-size:11px;overflow-wrap: break-word;">
                <section *ngFor="let link of record.linkPages">
                  <span>{{ link }}</span> <br>
                </section>
              </span>                                             
            </section>
          </div>
          </section>
        </div>             
      </template>      
    </modal-body>
  
    <modal-footer>
      <button type="button" class="btn btn-default" data-dismiss="modal" (click)="resultModal.close()">Done</button>
    </modal-footer>
  </modal>
  `,
  styles: [`
.error {
    background: #dd2c00;
}
.error-border {    
    margin-bottom: 10px;
}
.success {
    background: #558B2F;
}
.success-border {   
    margin-bottom: 10px;
}
.others {
    background: #FB8C00;
}
.others-border {
    /*border: 1px solid #FB8C00;    */
}
.margin-bottom-20 {
    margin-bottom:20px;
}
.result-table-header {
    padding: 10px;
    min-height: 42px;
    height: 42px;
    width: 100%;
    position: relative;
}
.result-table-header h5,
.result-table-header small, 
.result-table-header i {
    color: rgba(255,255,255,0.87);
}
.result-table-header i.fa {
    float: right;
    line-height: 22px;
    font-size: 16px;
    font-weight: bold;   
}
.result-table-header i.fa:hover {
    cursor: pointer;
}
.result-table-header h5 {
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    float: left;
    padding-right: 10px;
    position: relative;
}
.result-table-headline {
    position: relative;
     overflow: hidden; 
    display: block;
    height: 34px;
    min-height: 34px;
    line-height: 16px;
    padding: 10px;               
    -webkit-box-shadow: 0 0 3px 0 rgba(123, 123, 123, 0.3),0 0 1px 0 rgba(0,0,0,.2),0 1px 1px -1px rgba(51, 51, 51, 0.2);
    -moz-box-shadow: 0 0 3px 0 rgba(123, 123, 123, 0.3),0 0 1px 0 rgba(0,0,0,.2),0 1px 1px -1px rgba(51, 51, 51, 0.2);
    box-shadow: 0 0 3px 0 rgba(123, 123, 123, 0.3),0 0 1px 0 rgba(0,0,0,.2),0 1px 1px -1px rgba(51, 51, 51, 0.2);
}
.result-table-headline > span {
    display: inline-block;  
    font-size:13px;
    color:rgba(0,0,0,0.65);           
}
.result-table-headline > span.url {
    width:40%;               
}
.result-table-headline > span.status {
    width:12%;   
}
.result-table-headline > span.linked-pages {
    width:45%;  
}
.result-table-body {
    padding: 10px;
    -webkit-box-shadow: 0 1px 3px 0 rgba(123, 123, 123, 0.3),0 1px 1px 0 rgba(0,0,0,.2),0 1px 1px -1px rgba(51, 51, 51, 0.2);
    -moz-box-shadow: 0 1px 3px 0 rgba(123, 123, 123, 0.3),0 1px 1px 0 rgba(0,0,0,.2),0 1px 1px -1px rgba(51, 51, 51, 0.2);
    box-shadow: 0 1px 3px 0 rgba(123, 123, 123, 0.3),0 1px 1px 0 rgba(0,0,0,.2),0 1px 1px -1px rgba(51, 51, 51, 0.2);
}
  `]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalComponent) private _modalCmp: ModalComponent;
  @ViewChild(SpinnerComponent) private _spinnerCmp: SpinnerComponent;

  searchForm: FormGroup;
  searchResults: any;
  isLoading: boolean = false;

  isCollapsed: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _searchAPI: SearchAPI) {
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      url: ['http://kylefalconercodes.com', Validators.compose([Validators.required,])]
    });
  }

  ngAfterViewInit(): void {
    // @ViewChild and @ViewChildren decorators can be used here.
  }

  collapse(t): any {
    t.isCollapsed = !t.isCollapsed;
  }

  search(query: {url: string}): void {
    const { url } = query;
    this.isLoading = !this.isLoading;
    this._spinnerCmp.show();

    this._searchAPI.query(url)
      .subscribe(
        data => {
          this.searchResults = data;
        },
        error => console.log('Error: ', error),
        () => {
          this._spinnerCmp.hide();
          this._modalCmp.open();
        }
      );
  }

  redirectTo(modal: ModalComponent): any {
    modal.open();
  }

  reset(): void {
    for (let c in this.searchForm.controls) {
      this.searchForm.controls[c].updateValue('');
    }
    this.isLoading = false;
    this.searchResults = [];
  }
}
