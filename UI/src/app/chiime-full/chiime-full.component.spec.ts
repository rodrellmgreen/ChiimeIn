/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChiimeFullComponent } from './chiime-full.component';

describe('ChiimeFullComponent', () => {
  let component: ChiimeFullComponent;
  let fixture: ComponentFixture<ChiimeFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiimeFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiimeFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
