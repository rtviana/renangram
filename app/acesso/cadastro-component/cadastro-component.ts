import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../usuario-model';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-component.html',
  styleUrls: ['./cadastro-component.css']
})
export class CadastroComponentComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  //atributos
  
  //controle dos campos de formulario
  public formulario: FormGroup = new FormGroup({
  'email': new FormControl(null),
  'nome_completo': new FormControl(null),
  'nome_usuario': new FormControl(null),
  'senha': new FormControl(null),
  })

  constructor(
    //servico injetado dentro do modulo
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() { }

  //exibir painel login  
  exibirPainelLogin():void{
    this.exibirPainel.emit('login')
  }

  //cadastrar usuario
  cadastrarUsuario(): void{
    //import do model de usuario
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
    this.autenticacao.cadastrarUsuario(usuario)
    //recebimento do retorno da promise do componente de autenticacao
    .then(() => this.exibirPainelLogin())//ao concluir cadastro, retorno pra tela de login
  }
}