import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerContratComponent } from './evaluer-contrat.component';

describe('EvaluerContratComponent', () => {
  let component: EvaluerContratComponent;
  let fixture: ComponentFixture<EvaluerContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluerContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluerContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
