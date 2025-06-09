import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsGardiennageComponent } from './contrats-gardiennage.component';

describe('ContratsGardiennageComponent', () => {
  let component: ContratsGardiennageComponent;
  let fixture: ComponentFixture<ContratsGardiennageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsGardiennageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsGardiennageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
