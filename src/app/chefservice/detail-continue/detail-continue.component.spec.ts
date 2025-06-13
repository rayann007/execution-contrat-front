import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContinueComponent } from './detail-continue.component';

describe('DetailContinueComponent', () => {
  let component: DetailContinueComponent;
  let fixture: ComponentFixture<DetailContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailContinueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
