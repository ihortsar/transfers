import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTransfersComponent } from './users-transfers.component';

describe('UsersTransfersComponent', () => {
  let component: UsersTransfersComponent;
  let fixture: ComponentFixture<UsersTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTransfersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
