import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '@app/services/quiz.service';
import { CountdownComponent } from '../countdown/countdown.component';
import { ReponseComponent } from '../reponse/reponse.component';

@Component({
    selector: 'app-play-area',
    templateUrl: './play-area.component.html',
    styleUrls: ['./play-area.component.scss'],
})
export class PlayAreaComponent implements OnInit {
    currentQuestion: any;
    // currentQuestionDuration : number;
    currentQuestionIndex: number = 0;
    score: number = 0;
    questions: unknown[] = [];
    quizDuration: number;
    @ViewChild(CountdownComponent) countdown: CountdownComponent;
    @ViewChild(ReponseComponent) reponse: ReponseComponent;

    constructor(
        public quizService: QuizService,
        private router: Router,
    ) {}

    ngOnInit() {
        // Chargez les questions depuis le service QuizService
        this.quizService.getQuizData().subscribe((data) => {
            this.questions = data.questions;
            this.quizDuration = data.duration;
            this.loadQuestion(this.currentQuestionIndex);
        });

        // Écoutez l'événement timeUp du composant Countdown
        // this.countdown.timeUp.subscribe(() => {
        // this.autoFinalizeChoices();
        // });
    }

    loadQuestion(index: number) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestion = this.questions[index];
            this.countdown.resetCountdown();
            this.countdown.startCountdown();

            this.reponse.selectedChoices = new Array(this.currentQuestion.choices.length).fill(false);
            this.reponse.isFinalized = false;
        }
    }

    checkAndIncreaseScore() {
        const allCorrectChoicesSelected = this.currentQuestion.choices.every((choice: any, index: number) => {
            return (choice.isCorrect && this.reponse.selectedChoices[index]) || (!choice.isCorrect && !this.reponse.selectedChoices[index]);
        });

        if (allCorrectChoicesSelected) {
            this.score += this.currentQuestion.points;
        }
    }

    moveToNextQuestion() {
        // Passez à la question suivante
        this.currentQuestionIndex++;
        // this.loadQuestion(this.currentQuestionIndex);
        setTimeout(() => {
            this.loadQuestion(this.currentQuestionIndex);
        }, 3000);
    }

    autoFinalizeChoices() {
        this.reponse.isFinalized = true;
        // this.checkAndIncreaseScore();
    }

    quitGame() {
        this.router.navigate(['/main']);
    }
}
