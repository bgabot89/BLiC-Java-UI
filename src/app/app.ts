import { Component, ViewEncapsulation,  OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from './components/modal';
import { SearchAPI } from './services/search-service';
import { SpinnerComponent } from './components/spinner';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html'),
  styles: [
    require('./app.scss')
  ]
})
export class AppComponent implements OnInit {

  @ViewChild(ModalComponent) private _modalCmp: ModalComponent;
  @ViewChild(SpinnerComponent) private _spinnerCmp: SpinnerComponent;

  searchForm: FormGroup;
  searchResults: any;
  isLoading: boolean = false;

  isCollapsed: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _searchAPI: SearchAPI) {}

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      url: ['http://kylefalconercodes.com', Validators.compose([Validators.required])]
    });
  }

  search(query: { url: string }): void {
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

  reset(): void {
    this.searchForm.reset();
    this.isLoading = false;
    this.searchResults = [];
  }

  collapse(t): any {
    t.isCollapsed = !t.isCollapsed;
  }
}
