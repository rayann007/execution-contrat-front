import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResilierContratComponent } from './resilier-contrat.component';

describe('ResilierContratComponent', () => {
  let component: ResilierContratComponent;
  let fixture: ComponentFixture<ResilierContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResilierContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResilierContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
