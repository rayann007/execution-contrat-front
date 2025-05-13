import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsCoursComponent } from './contrats-cours.component';

describe('ContratsCoursComponent', () => {
  let component: ContratsCoursComponent;
  let fixture: ComponentFixture<ContratsCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
