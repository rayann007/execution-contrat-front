import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChefServiceComponent } from './dashboard-chef-service.component';

describe('DashboardChefServiceComponent', () => {
  let component: DashboardChefServiceComponent;
  let fixture: ComponentFixture<DashboardChefServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChefServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChefServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
