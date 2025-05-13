import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcheancesMoisComponent } from './echeances-mois.component';

describe('EcheancesMoisComponent', () => {
  let component: EcheancesMoisComponent;
  let fixture: ComponentFixture<EcheancesMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcheancesMoisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcheancesMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
