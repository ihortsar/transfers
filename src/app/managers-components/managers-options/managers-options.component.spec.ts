import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersOptionsComponent } from './managers-options.component';

describe('ManagersOptionsComponent', () => {
  let component: ManagersOptionsComponent;
  let fixture: ComponentFixture<ManagersOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagersOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagersOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
