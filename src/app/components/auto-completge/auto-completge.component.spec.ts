import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompletgeComponent } from './auto-completge.component';

describe('AutoCompletgeComponent', () => {
  let component: AutoCompletgeComponent;
  let fixture: ComponentFixture<AutoCompletgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompletgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompletgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
