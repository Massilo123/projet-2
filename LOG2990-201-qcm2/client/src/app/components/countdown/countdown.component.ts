import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
    @Input() duration: number; // Durée du compte à rebours en secondes
    @Output() timeUp: EventEmitter<void> = new EventEmitter<void>(); // Événement pour indiquer que le temps est écoulé

    remainingTime: number;
    countdownInterval: any;

    ngOnInit() {
        this.remainingTime = this.duration;
        this.startCountdown();
    }

    ngOnDestroy() {
        clearInterval(this.countdownInterval);
    }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            if (this.remainingTime <= 0) {
                clearInterval(this.countdownInterval);
                this.timeUp.emit(); // Émettre l'événement timeUp lorsque le temps est écoulé
            } else {
                this.remainingTime--;
            }
        }, 1000);
    }

    resetCountdown() {
        this.remainingTime = this.duration;
    }
}
