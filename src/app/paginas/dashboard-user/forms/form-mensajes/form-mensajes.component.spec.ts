import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMensajesComponent } from './form-mensajes.component';

describe('FormMensajesComponent', () => {
  let component: FormMensajesComponent;
  let fixture: ComponentFixture<FormMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
