import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodDocumentsComponent } from './uplod-documents.component';

describe('UplodDocumentsComponent', () => {
  let component: UplodDocumentsComponent;
  let fixture: ComponentFixture<UplodDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UplodDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UplodDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
