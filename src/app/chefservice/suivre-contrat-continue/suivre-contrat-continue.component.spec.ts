import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivreContratContinueComponent } from './suivre-contrat-continue.component';

describe('SuivreContratContinueComponent', () => {
  let component: SuivreContratContinueComponent;
  let fixture: ComponentFixture<SuivreContratContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuivreContratContinueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivreContratContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
