import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDialogTestComponent } from './chat-dialog-test.component';

describe('ChatDialogTestComponent', () => {
  let component: ChatDialogTestComponent;
  let fixture: ComponentFixture<ChatDialogTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDialogTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDialogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
