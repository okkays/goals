import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.chartConfiguration = {};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fail to create with missing config', () => {
    expect(() => component.ngOnChanges()).toThrowError();
  });

  it('should show a chart', () => {
    fixture.detectChanges();
    component.chartConfiguration = {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: [
              {
                x: 10,
                y: 20,
              },
            ],
          },
        ],
      },
    };
    component.ngOnChanges();
    expect(document.querySelector('canvas svg')).toBeTruthy();
  });
});
