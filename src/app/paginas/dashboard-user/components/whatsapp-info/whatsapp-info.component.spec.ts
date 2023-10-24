import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappInfoComponent } from './whatsapp-info.component';

describe('WhatsappInfoComponent', () => {
  let component: WhatsappInfoComponent;
  let fixture: ComponentFixture<WhatsappInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
