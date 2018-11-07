import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterDialogComponent } from './roster-dialog.component';

describe('RosterDialogComponent', () => {
  let component: RosterDialogComponent;
  let fixture: ComponentFixture<RosterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
