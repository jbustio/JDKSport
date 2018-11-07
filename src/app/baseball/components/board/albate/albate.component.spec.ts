import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbateComponent } from './albate.component';

describe('AlbateComponent', () => {
  let component: AlbateComponent;
  let fixture: ComponentFixture<AlbateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
