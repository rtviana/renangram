import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from 'src/app/bd-service.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso-service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  //atributos do formulario
  public email: string //para receber o email do usuario
  private imagem: any //imagem

  public progressoPublicacao: string = 'pendente' //progresso
  public porcentagemUpload: number //porcentagem upload
  
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public formulario: FormGroup = new FormGroup({//controles do formulario
    'titulo': new FormControl(null)
  })

  constructor(//injecao do BD declarado no modulo principal
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {//capturando o email do usuario que foi fornecido no login no estado atual de autenticacao
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email//recuperando dados do usuario atraves da array capturada na promise do firebase
    })
  }

  //metodo publicar
  public publicar(): void {//recuperacao dos dados do usuario
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let continua = new Subject()

    let acompanhamentoUpload = interval(1500).pipe(takeUntil(continua))

    continua.next(true)
    
    acompanhamentoUpload
      .subscribe(() => {

        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)
        
        if(this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'
          
          //emissao para o componente home
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      })
  }
  
  //metodo para subir imagem
  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files//recuperar o atributo target, e entao o arquivo
  }
}