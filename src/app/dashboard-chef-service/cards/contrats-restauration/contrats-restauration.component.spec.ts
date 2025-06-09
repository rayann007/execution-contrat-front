import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsRestaurationComponent } from './contrats-restauration.component';

describe('ContratsRestaurationComponent', () => {
  let component: ContratsRestaurationComponent;
  let fixture: ComponentFixture<ContratsRestaurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsRestaurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsRestaurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
