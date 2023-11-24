import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminruComponent } from './adminru.component';

describe('AdminruComponent', () => {
  let component: AdminruComponent;
  let fixture: ComponentFixture<AdminruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminruComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
