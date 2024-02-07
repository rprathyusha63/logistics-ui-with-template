import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbreadcrumbComponent } from './lbreadcrumb.component';

describe('LbreadcrumbComponent', () => {
  let component: LbreadcrumbComponent;
  let fixture: ComponentFixture<LbreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbreadcrumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LbreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
