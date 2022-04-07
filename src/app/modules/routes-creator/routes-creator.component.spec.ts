import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesCreatorComponent } from './routes-creator.component';

describe('RoutesCreatorComponent', () => {
  let component: RoutesCreatorComponent;
  let fixture: ComponentFixture<RoutesCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
