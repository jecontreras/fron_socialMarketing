import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMandadosComponent } from './form-mandados.component';

describe('FormMandadosComponent', () => {
  let component: FormMandadosComponent;
  let fixture: ComponentFixture<FormMandadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMandadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
