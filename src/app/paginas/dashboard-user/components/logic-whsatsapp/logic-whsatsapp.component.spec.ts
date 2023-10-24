import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicWhsatsappComponent } from './logic-whsatsapp.component';

describe('LogicWhsatsappComponent', () => {
  let component: LogicWhsatsappComponent;
  let fixture: ComponentFixture<LogicWhsatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicWhsatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicWhsatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
