import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedProductsComponent } from './flagged-products.component';

describe('FlaggedProductsComponent', () => {
  let component: FlaggedProductsComponent;
  let fixture: ComponentFixture<FlaggedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
