import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsContinueComponent } from './contrats-continue.component';

describe('ContratsContinueComponent', () => {
  let component: ContratsContinueComponent;
  let fixture: ComponentFixture<ContratsContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratsContinueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
