import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshitorComponent } from './freshitor.component';

describe('FreshitorComponent', () => {
  let component: FreshitorComponent;
  let fixture: ComponentFixture<FreshitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
