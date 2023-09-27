import { Component } from '@angular/core';

@Component({
    selector: 'app-game-line',
    templateUrl: './game-line.component.html',
    styleUrls: ['./game-line.component.scss'],
})
export class GameAdministrationComponent {
    title = 'Game Title Here'; // Get the title
    lastModified = 'Last modified: ' + '28.09.2023'; // Add last modified date

    toggleVisibility() {
        // Logic to hide the game
    }

    export() {
        // Logic to export the game
    }

    modify() {
        // logic for modifying
    }
}
