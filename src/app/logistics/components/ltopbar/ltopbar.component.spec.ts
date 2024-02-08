import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtopbarComponent } from './ltopbar.component';

describe('LtopbarComponent', () => {
  let component: LtopbarComponent;
  let fixture: ComponentFixture<LtopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
