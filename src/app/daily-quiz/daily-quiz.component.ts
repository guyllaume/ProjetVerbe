import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { VerbService } from '../services/verb.service';
import { Router } from '@angular/router';
import { Verb } from '../Models/verb.model';
import { Question } from '../Models/question.model';
import { VerbSimple } from '../Models/verbSimple.model';

@Component({
  selector: 'app-daily-quiz',
  templateUrl: './daily-quiz.component.html',
  styleUrl: './daily-quiz.component.scss'
})
export class DailyQuizComponent {

  public verb: Verb = {} as Verb;
  public Questions: Question[] = []; 
  public currentQuestionIndex = 0;
  public currentAnswerIndex = 0;
  public questionAnswered: boolean = false;
  public answerMessage: string = '';
  public selectedAnswer: string = '';
  public nbGoodAnswer: number = 0;
  public isFavorite: boolean = false;
  private verbUid: string = '';

  constructor(private userService: UserService, private verbService: VerbService, private router: Router) {
    verbService.getRandomVerbs(1, userService.getToken()).subscribe(
      (res) =>{
        verbService.getVerb(res.verbs[0], userService.getToken()).subscribe(
          (res) =>{
            //Gets verb
            this.verb = res;
            this.verbService.getAllFavorite(this.userService.getToken()).subscribe(
              (res) =>{
                let favoriteVerbs: VerbSimple[] = res.verbs;
                favoriteVerbs.forEach(verb => {
                  if(this.verb.verb == verb.verb){
                    this.isFavorite = true;
                    this.verbUid = verb.uid;
                  }
                });
              },
              (err) =>{
                console.log(err);
              }
            )
            
            //Insures that the questions are unique
            const uniqueNumbers = new Set<number>();

            //Generates 3 unique questions number
            while (uniqueNumbers.size < 3) {
                const randomNumber = Math.floor(Math.random() * 10) + 1;
                uniqueNumbers.add(randomNumber);
            }

            //Generates the 3 questions
            uniqueNumbers.forEach(number => {
                const question = new Question(number, this.verb);
                this.Questions.push(question);
            });

            //Shuffles the questions
            this.Questions = this.shuffleArray(this.Questions);

            //Shuffles the answers
            this.Questions.forEach(question => {
              question.possibleAnswers = this.shuffleArray(question.possibleAnswers);
            })
          },
          (err) =>{
            console.log(err);
          }
        )
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  
  private shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  public submitQuestion(){
    if(this.selectedAnswer === ''){
      this.answerMessage = "Veuillez sélectionner une reponse !";
      return;
    }
    this.questionAnswered = true;
    if(this.Questions[this.currentQuestionIndex].answer == this.selectedAnswer){
      this.answerMessage = "Wow! Bonne Réponse !";
      this.nbGoodAnswer++;
    }else{
      this.answerMessage = "Uh Oh... Mauvaise Réponse ! La réponse est : " + this.Questions[this.currentQuestionIndex].answer;
    }
    this.currentAnswerIndex++;
  }
  public nextQuestion(){
    this.questionAnswered = false;
    this.answerMessage = '';
    this.selectedAnswer = '';
    this.currentQuestionIndex++;
  }
  public goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  onAnswerClick(answer: string) {
    this.selectedAnswer = answer;
  }
  isAnswerSelected(answer: string): boolean {
    return this.selectedAnswer === answer;
  }
  addFavorite(){
    this.verbService.addFavorite(this.verb.verb, this.userService.getToken()).subscribe(
      (res) =>{
        this.isFavorite = true;
        this.verbUid = res.id;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  deleteFavorite(){
    this.verbService.deleteFavorite(this.verbUid, this.userService.getToken()).subscribe(
      (res) =>{
        this.isFavorite = false;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  getFinalMessage(): string {
    if(this.nbGoodAnswer >= 3){
      return "Bravo ! Vous avez toutes les réponses correctes !";
    }else if(this.nbGoodAnswer >= 1){
      return `Ouuh ! Vous avez ${this.nbGoodAnswer} réponses correctes !`;
    }else{
      return "Dommage ! Vous n'avez aucunes réponses correctes !";
    }
  }
  get progressValue(): number {
    return (this.currentAnswerIndex / this.Questions.length) * 100;
  }

}
