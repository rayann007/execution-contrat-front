import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeContratContinueComponent } from './cree-contrat-continue.component';

describe('CreeContratContinueComponent', () => {
  let component: CreeContratContinueComponent;
  let fixture: ComponentFixture<CreeContratContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreeContratContinueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeContratContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
