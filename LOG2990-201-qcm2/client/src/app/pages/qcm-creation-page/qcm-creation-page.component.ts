import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { TimeService } from '@app/services/time.service';
// TODO : Avoir un fichier séparé pour les constantes!
export const DEFAULT_WIDTH = 200;
export const DEFAULT_HEIGHT = 200;
export const DEFAULT_TEXT_LENGTH = 50;

// TODO : Déplacer ça dans un fichier séparé accessible par tous
export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2,
    Back = 3,
    Forward = 4,
}

export enum ChoiceStatus {
    Bon = 'Bon',
    Mauvais = 'Mauvais',
    SansStatus = 'Sans status',
}

@Component({
    selector: 'app-qcm-creation-page',
    templateUrl: './qcm-creation-page.component.html',
    styleUrls: ['./qcm-creation-page.component.scss'],
})
export class QcmCreationPageComponent {
    gameName: string = '';
    gameDescription: string = '';
    enEdition: number | null = null;
    buttonPressed = '';
    questionTime: string = '';
    pointQuestion: number = 10;
    reponse: number = 2;
    nouvelleQuestion = '';
    choix = '';
    elementSelectionne: number | null = null;
    tableauReponse: number[] = [];
    questions: {
        nouvelleQuestion: string;
        pointQuestion: number;
        choix: { texte: string; status: ChoiceStatus; confirmed: boolean }[]; // Utiliser un tableau d'objets pour chaque choix
    }[] = [];
    jeux: {
        gameName: string;
        gameDescription: string;
        questionTime: number;
    };
    editingChoiceIndex?: number;
    selectedChoiceStatus: ChoiceStatus = ChoiceStatus.Bon;
    private readonly timer = 5;

    constructor(
        private readonly timeService: TimeService,
        private readonly http: HttpClient,
    ) {}

    get time(): number {
        return this.timeService.time;
    }

    @HostListener('keydown', ['$event'])
    buttonDetect(event: KeyboardEvent) {
        this.buttonPressed = event.key;
    }

    // TODO : déplacer ceci dans un service de gestion de la souris!
    mouseHitDetect(event: MouseEvent) {
        if (event.button === MouseButton.Left) {
            this.timeService.startTimer(this.timer);
        }
    }

    ajouterQuestion() {
        if (this.nouvelleQuestion.trim() !== '') {
            const nouvelleQuestion = {
                nouvelleQuestion: this.nouvelleQuestion,
                pointQuestion: this.pointQuestion,
                choix: [],
                confirmed: [],
            };
            this.questions.push(nouvelleQuestion);
            this.nouvelleQuestion = '';
            this.pointQuestion = 10;
        }
    }

    supprimerQuestion(index: number) {
        this.questions.splice(index, 1);
    }

    toggleEdition(index: number) {
        this.enEdition = this.enEdition === index ? null : index;
    }

    appliquerModification() {
        this.enEdition = null;
    }

    annulerModification() {
        this.enEdition = null;
    }

    creerReponse() {
        this.tableauReponse = [];

        // Vérifie que nombreElements est un nombre positif
        if (this.reponse > 0) {
            // Remplit le tableau des indices avec des valeurs de 0 à nombreElements - 1
            for (let i = 0; i < this.reponse; i++) {
                this.tableauReponse.push(i);
            }
        }
    }
    getTruncatedText(texte: string): string {
        const longueurMax = DEFAULT_TEXT_LENGTH; // Vous pouvez ajuster cette valeur
        return texte.length > longueurMax ? texte.substring(0, longueurMax) + '...' : texte;
    }
    changerOrdre(indexCourant: number, nouvelIndex: number) {
        const question = this.questions.splice(indexCourant, 1)[0];
        this.questions.splice(nouvelIndex, 0, question);
    }
    ajouterChoix(indexQuestion: number) {
        const question = this.questions[indexQuestion];

        if (question.choix.length < 4) {
            question.choix.push({
                texte: '',
                status: ChoiceStatus.SansStatus,
                confirmed: false,
            });
        }
    }
    supprimerChoix(indexQuestion: number, indexChoix: number) {
        this.questions[indexQuestion].choix.splice(indexChoix, 1);
    }

    confirmChoice(questionIndex: number, choixIndex: number) {
        const choix = this.questions[questionIndex].choix[choixIndex];
        if (choix.texte.trim() !== '' && choix.status !== ChoiceStatus.SansStatus) {
            choix.confirmed = true;
            this.moveConfirmedChoices(questionIndex);
        }
    }
    moveChoice(questionIndex: number, choiceIndex: number, newIndex: number) {
        const question = this.questions[questionIndex];
        const choice = question.choix.splice(choiceIndex, 1)[0];
        question.choix.splice(newIndex, 0, choice);
    }
    moveConfirmedChoices(questionIndex: number) {
        const question = this.questions[questionIndex];
        const confirmedChoices = question.choix.filter((choix) => choix.confirmed);
        question.choix = question.choix.filter((choix) => !choix.confirmed).concat(confirmedChoices);
    }

    modifyChoice(questionIndex: number, choixIndex: number) {
        const choix = this.questions[questionIndex].choix[choixIndex];
        choix.confirmed = false;
        this.selectedChoiceStatus = choix.status;
    }


    enregistrer() {
        if (this.questions.length === 0) {
            alert('Ajoutez au moins une question pour enregistrer le jeu.');
            return;
        }

        let valid = true;
        for (const question of this.questions) {
            const hasBon = question.choix.some((choix) => choix.status === ChoiceStatus.Bon);
            const hasMauvais = question.choix.some((choix) => choix.status === ChoiceStatus.Mauvais);
            if (!hasBon || !hasMauvais) {
                valid = false;
                break;
            }
        }

        if (!valid) {
            alert('Chaque question doit avoir au moins un bon et un mauvais choix de réponse.');
            return;
        }

    

        const jeu = {
            gameName: this.gameName,
            gameDescription: this.gameDescription,
            questionTime: this.questionTime // Ajout du questionTime
        };
    
        this.http.post('/api/enregistrer-jeu', jeu)
    .subscribe(
        response => {
            console.log('Jeu enregistré avec succès', response);
            // Effacez les champs ou effectuez d'autres actions si nécessaire
        },
        error => {
            console.error('Erreur lors de l\'enregistrement du jeu', error);
        }
    );
            
        this.gameName = '';
        this.gameDescription = '';
        this.enEdition = null;
        this.buttonPressed = '';
        this.questionTime = '';
        this.pointQuestion = 0;
        this.reponse = 2;
        this.nouvelleQuestion = '';
        this.choix = '';
        this.elementSelectionne = null;
        this.tableauReponse = [];
        this.questions = [];
        this.editingChoiceIndex = undefined;
        this.selectedChoiceStatus = ChoiceStatus.SansStatus;
    }
}
