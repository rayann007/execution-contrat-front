import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsNettoyageComponent } from './contrats-nettoyage.component';

describe('ContratsNettoyageComponent', () => {
  let component: ContratsNettoyageComponent;
  let fixture: ComponentFixture<ContratsNettoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsNettoyageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsNettoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
