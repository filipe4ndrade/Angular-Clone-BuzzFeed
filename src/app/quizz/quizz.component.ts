import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = "";

  //Dinâmica das Questões
  questions:any;
  questionSelected:any;

  //Dinâmica das Respostas
  answers:string[] =[];
  answerSelected:string ="";

  //Ponteiro que contabiliza as paginas
  questionIndex:number = 0;
  questionMaxIndex:number =0;

  //Só mostrará o conteúdo da resposta quando finished for true
  finished:boolean =false;

  constructor() { }

  ngOnInit() {
  }

}