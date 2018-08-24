import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAskComponent } from './single-ask.component';

describe('SingleAskComponent', () => {
  let component: SingleAskComponent;
  let fixture: ComponentFixture<SingleAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
