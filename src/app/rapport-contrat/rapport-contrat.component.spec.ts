import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportContratComponent } from './rapport-contrat.component';

describe('RapportContratComponent', () => {
  let component: RapportContratComponent;
  let fixture: ComponentFixture<RapportContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
