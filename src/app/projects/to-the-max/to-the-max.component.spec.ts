import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToTheMaxComponent } from './to-the-max.component';

describe('ToTheMaxComponent', () => {
  let component: ToTheMaxComponent;
  let fixture: ComponentFixture<ToTheMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToTheMaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToTheMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
