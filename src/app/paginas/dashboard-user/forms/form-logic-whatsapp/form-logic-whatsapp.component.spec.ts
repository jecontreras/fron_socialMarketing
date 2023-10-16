import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLogicWhatsappComponent } from './form-logic-whatsapp.component';

describe('FormLogicWhatsappComponent', () => {
  let component: FormLogicWhatsappComponent;
  let fixture: ComponentFixture<FormLogicWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLogicWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLogicWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
