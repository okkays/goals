import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotComponent } from './plot.component';

describe('PlotComponent', () => {
  let component: PlotComponent;
  let fixture: ComponentFixture<PlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlotComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.xAxis = [10];
    component.plotKind = 'BAR';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fail to create with bad xAxis', () => {
    component.xAxis = {} as number[];
    component.plotKind = 'BAR';
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should fail to create with bad plot kind', () => {
    component.xAxis = [10];
    component.plotKind = 'BAT' as 'BAR';
    expect(() => fixture.detectChanges()).toThrowError();
  });
});
