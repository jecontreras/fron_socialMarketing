import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWhatsappComponent } from './chat-whatsapp.component';

describe('ChatWhatsappComponent', () => {
  let component: ChatWhatsappComponent;
  let fixture: ComponentFixture<ChatWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
