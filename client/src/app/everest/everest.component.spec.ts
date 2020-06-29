import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EverestComponent } from './everest.component';

describe('EverestComponent', () => {
  let component: EverestComponent;
  let fixture: ComponentFixture<EverestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EverestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EverestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
