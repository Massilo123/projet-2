import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent {
  @Input() question: any; // La question en cours
  selectedChoices: boolean[] = []; // Tableau pour stocker les choix sélectionnés
  isFinalized: boolean = false; // Indique si la réponse est finalisée
  isTimeUp: boolean = false; // Indique si le temps est écoulé

  constructor() {
    //this.selectedChoices = new Array(this.question.choices.length).fill(false);
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    if (!this.isFinalized) {
      this.finalizeAnswer();
    }
  }

  handleChoiceKeyPress(event: KeyboardEvent, choiceIndex: number) {
    if (!this.isFinalized && event.key >= '1' && event.key <= '4') {
      const numericKey = Number(event.key);
      
      if (numericKey >= 1 && numericKey <= this.question.choices.length) {
        // Inversez l'état de sélection du choix correspondant à la touche
        this.selectedChoices[numericKey - 1] = !this.selectedChoices[numericKey - 1];
      }
    }
  }

  // Méthode pour finaliser la réponse
  finalizeAnswer() {
    this.isFinalized = true;
  }
}
