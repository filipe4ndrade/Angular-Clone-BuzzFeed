import { Component, OnInit } from '@angular/core';
import quizz_questions from '../assets/data/quizz.questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  //Dinâmica das Questões
  questions: any;
  questionSelected: any;

  //Dinâmica das Respostas
  answers: string[] = [];
  answerSelected: string = '';

  //Ponteiro que contabiliza as paginas
  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  //Só mostrará o conteúdo da resposta quando finished for true
  finished: boolean = false;

  constructor() {}

  ngOnInit() {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  //Faz com que os valores das respostas sejam adicionados em um vetor answers
  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  //Pular pergunta
  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
      //verificar opção ganhadora
    }
  }

  //verificar quem ganhou
  async checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }
}
