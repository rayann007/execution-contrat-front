import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsEnAlerteComponent } from './contrats-en-alerte.component';

describe('ContratsEnAlerteComponent', () => {
  let component: ContratsEnAlerteComponent;
  let fixture: ComponentFixture<ContratsEnAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsEnAlerteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsEnAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
