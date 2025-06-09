import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsAlerteComponent } from './contrats-alerte.component';

describe('ContratsAlerteComponent', () => {
  let component: ContratsAlerteComponent;
  let fixture: ComponentFixture<ContratsAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsAlerteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
