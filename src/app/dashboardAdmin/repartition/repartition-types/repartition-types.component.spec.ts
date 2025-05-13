import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionTypesComponent } from './repartition-types.component';

describe('RepartitionTypesComponent', () => {
  let component: RepartitionTypesComponent;
  let fixture: ComponentFixture<RepartitionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
