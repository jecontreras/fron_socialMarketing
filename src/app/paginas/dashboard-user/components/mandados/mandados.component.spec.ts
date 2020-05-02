import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandadosComponent } from './mandados.component';

describe('MandadosComponent', () => {
  let component: MandadosComponent;
  let fixture: ComponentFixture<MandadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
