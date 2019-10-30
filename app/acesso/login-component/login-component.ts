import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from '../autenticacao.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponentComponent implements OnInit {
  
  //emissao de evento para controle da exibicao do painel
  
  //envio do componente
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    //controles
    'email' : new FormControl(null),
    'senha': new FormControl(null)
  })
  
  constructor(
    //atributos de login
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() { }

  //click = componente do link para cadastro
  exibirPainelCadastro():void{
    
    //exposicao do metodo para o componente pai (acesso)
    this.exibirPainel.emit('cadastro')//sera explorado no componente pai
  }

  //envio dos dados de email e senha para o servico de autenticacao
  public autenticar(): void{
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }
}