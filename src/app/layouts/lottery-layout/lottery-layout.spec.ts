import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryLayout } from './lottery-layout';

describe('LotteryLayout', () => {
  let component: LotteryLayout;
  let fixture: ComponentFixture<LotteryLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
