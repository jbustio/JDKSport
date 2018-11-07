import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDialogComponent } from './jugador-dialog.component';

describe('JugadorDialogComponent', () => {
  let component: JugadorDialogComponent;
  let fixture: ComponentFixture<JugadorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
