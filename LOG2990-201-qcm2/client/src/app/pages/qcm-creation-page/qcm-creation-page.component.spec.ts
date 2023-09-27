import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmCreationPageComponent } from './qcm-creation-page.component';

describe('QcmCreationPageComponent', () => {
    let component: QcmCreationPageComponent;
    let fixture: ComponentFixture<QcmCreationPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [QcmCreationPageComponent],
        });
        fixture = TestBed.createComponent(QcmCreationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
