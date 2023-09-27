import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAreaComponent } from '@app/components/admin-area/admin-area.component';
import { CountdownComponent } from '@app/components/countdown/countdown.component';
import { GameAdministrationComponent } from '@app/components/game-line/game-line.component';
import { PlayAreaComponent } from '@app/components/play-area/play-area.component';
import { QuestionComponent } from '@app/components/question/question.component';
import { ReponseComponent } from '@app/components/reponse/reponse.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppMaterialModule } from '@app/modules/material.module';
import { AdminPageComponent } from '@app/pages/admin-page/admin-page.component';
import { AppComponent } from '@app/pages/app/app.component';
import { GamePageComponent } from '@app/pages/game-page/game-page.component';
import { MainPageComponent } from '@app/pages/main-page/main-page.component';
import { MaterialPageComponent } from '@app/pages/material-page/material-page.component';
import { PasswordPageComponent } from '@app/pages/password-page/password-page.component';
import { ZoneDeClavardageComponent } from '@app/pages/zone-de-clavardage/zone-de-clavardage.component';
import { QcmCreationPageComponent } from './pages/qcm-creation-page/qcm-creation-page.component';
/**
 * Main module that is used in main.ts.
 * All automatically generated components will appear in this module.
 * Please do not move this module in the module folder.
 * Otherwise Angular Cli will not know in which module to put new component
 */
@NgModule({
    declarations: [
        AppComponent,
        GamePageComponent,
        MainPageComponent,
        MaterialPageComponent,
        PlayAreaComponent,
        SidebarComponent,
        AdminPageComponent,
        AdminAreaComponent,
        GameAdministrationComponent,
        PasswordPageComponent,
        QuestionComponent,
        ReponseComponent,
        CountdownComponent,
        ZoneDeClavardageComponent,
        QcmCreationPageComponent,
    ],
    imports: [AppMaterialModule, AppRoutingModule, BrowserAnimationsModule, BrowserModule, FormsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
