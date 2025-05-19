import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivreContratComponent } from './suivre-contrat.component';

describe('SuivreContratComponent', () => {
  let component: SuivreContratComponent;
  let fixture: ComponentFixture<SuivreContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuivreContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivreContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
