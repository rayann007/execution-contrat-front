import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratEnAlerteComponent } from './contrat-en-alerte.component';

describe('ContratEnAlerteComponent', () => {
  let component: ContratEnAlerteComponent;
  let fixture: ComponentFixture<ContratEnAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratEnAlerteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratEnAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
