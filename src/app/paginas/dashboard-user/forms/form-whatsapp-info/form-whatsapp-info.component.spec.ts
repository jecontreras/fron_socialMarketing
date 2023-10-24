import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWhatsappInfoComponent } from './form-whatsapp-info.component';

describe('FormWhatsappInfoComponent', () => {
  let component: FormWhatsappInfoComponent;
  let fixture: ComponentFixture<FormWhatsappInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWhatsappInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWhatsappInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
