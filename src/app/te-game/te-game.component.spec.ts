import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TEGameComponent } from './te-game.component';
import { TESchemeComponent } from './scheme/te-scheme.component';
import { TEStartComponent } from './te-start/te-start.component';
import { TEWinnerComponent } from './te-winner/te-winner.component';
import { TEGameService } from './te-game.service';

describe('TEGameComponent', () => {
  let component: TEGameComponent;
  let fixture: ComponentFixture<TEGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TEGameComponent,
        TESchemeComponent,
        TEStartComponent,
        TEWinnerComponent
      ],
      providers: [ TEGameService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TEGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
