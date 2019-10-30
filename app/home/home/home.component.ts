import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from 'src/app/acesso/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('publicacoes', {static: false}) publicacoes: any;

  constructor(
    //injecao no atributo
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() { }

  //metodo de saida
  public sair(): void{
    
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void{
    this.publicacoes.atualizarTimeLine()
  }
}