import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveContinueComponent } from './archive-continue.component';

describe('ArchiveContinueComponent', () => {
  let component: ArchiveContinueComponent;
  let fixture: ComponentFixture<ArchiveContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveContinueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
