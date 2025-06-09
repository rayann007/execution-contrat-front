import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcheanceComponent } from './echeance.component';

describe('EcheanceComponent', () => {
  let component: EcheanceComponent;
  let fixture: ComponentFixture<EcheanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcheanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcheanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
