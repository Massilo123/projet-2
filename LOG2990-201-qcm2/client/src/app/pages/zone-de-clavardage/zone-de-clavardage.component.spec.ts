import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDeClavardageComponent } from './zone-de-clavardage.component';

describe('ZoneDeClavardageComponent', () => {
  let component: ZoneDeClavardageComponent;
  let fixture: ComponentFixture<ZoneDeClavardageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneDeClavardageComponent]
    });
    fixture = TestBed.createComponent(ZoneDeClavardageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input field for typing messages', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
  });

  it('should have a section for displaying messages', () => {
    const messageSection = fixture.nativeElement.querySelector('.chat-messages');
    expect(messageSection).toBeTruthy();
  });
  
});
