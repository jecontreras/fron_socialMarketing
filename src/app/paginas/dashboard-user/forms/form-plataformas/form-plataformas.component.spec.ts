import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlataformasComponent } from './form-plataformas.component';

describe('FormPlataformasComponent', () => {
  let component: FormPlataformasComponent;
  let fixture: ComponentFixture<FormPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlataformasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
