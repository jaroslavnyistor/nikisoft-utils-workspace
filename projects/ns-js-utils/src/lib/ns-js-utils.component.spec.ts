import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsJsUtilsComponent } from './ns-js-utils.component';

describe('NsJsUtilsComponent', () => {
  let component: NsJsUtilsComponent;
  let fixture: ComponentFixture<NsJsUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsJsUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsJsUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
