import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = 'assets/quiz-example.json'; // Chemin vers le fichier JSON local

  constructor(private http: HttpClient) { }

  getQuizData(): Observable<any> {
    return this.http.get<any>(this.quizUrl);
  }
}
