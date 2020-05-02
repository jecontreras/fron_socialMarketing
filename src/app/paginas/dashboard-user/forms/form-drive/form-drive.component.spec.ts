import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDriveComponent } from './form-drive.component';

describe('FormDriveComponent', () => {
  let component: FormDriveComponent;
  let fixture: ComponentFixture<FormDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
