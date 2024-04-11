import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsGuiaComponent } from './forms-guia.component';

describe('FormsGuiaComponent', () => {
  let component: FormsGuiaComponent;
  let fixture: ComponentFixture<FormsGuiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsGuiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
