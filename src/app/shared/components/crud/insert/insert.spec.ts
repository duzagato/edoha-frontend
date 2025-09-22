import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insert } from './insert';

describe('Insert', () => {
  let component: Insert;
  let fixture: ComponentFixture<Insert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Insert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Insert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
