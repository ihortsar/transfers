import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerManagerComponent } from './reviewer-manager.component';

describe('ReviewerManagerComponent', () => {
  let component: ReviewerManagerComponent;
  let fixture: ComponentFixture<ReviewerManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
