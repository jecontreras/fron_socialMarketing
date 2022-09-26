import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGaleriaComponent } from './form-galeria.component';

describe('FormGaleriaComponent', () => {
  let component: FormGaleriaComponent;
  let fixture: ComponentFixture<FormGaleriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGaleriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
