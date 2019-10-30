import { Injectable } from '@angular/core';
import { Usuario } from './usuario-model';
import * as firebase from 'firebase'//acesso aos recursos do SDK
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class Autenticacao {

  constructor(
    //injecao do modulo de roteamento do Angular
    private router: Router
  ) { }

  //string com o token de autenticação
  public token_id: string

  //servico de autenticacao
  public cadastrarUsuario(usuario: Usuario): Promise<any>{

    //disparo de acoes para o firebase

    //seleciona a dimensao de autentencicao do firebase
    return firebase.auth()
      .createUserWithEmailAndPassword(//pasando usuario e email do usuario
        usuario.email, usuario.senha
      ).then((resposta: any) =>{//tratativa da resposta da requisicao
        
        //remover a senha da gravação no banco, ja estara gravado na Autenticação
        delete usuario.senha
        
        //passagem da referencia do nó (path), atraves do metodo ref do SDK
        //btoa = converter a string para base64, evitando caracteres invalidos (atob = volta ao padrao alfanumerico)
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)//persistencia de dados
      })
      .catch((erro: Error) => {//tratativa de erro
        console.log(erro)
      })
  }
  
  public autenticar(email: string, senha: string): void{
    console.log('Email: ', email)
    console.log('Senha: ', senha)
    //autenticacao do firebase
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((resposta: any) => {//retorno do token de autenticacao
      //metodo para retornar uma promise e a partir do then, tomar uma ação
      firebase.auth().currentUser.getIdToken()//usuario atual autenticado
      .then((idToken: string) => {//recuperacao do token(JWT)
        this.token_id = idToken
        localStorage.setItem('idToken', idToken)//autenticacao gravada para nao quebrar em caso de refresh

        //a rota sera carrega apenas se tudo estiver correto
        this.router.navigate(['home'])
        //console.log(this.token_id)
      }) 
    })//retorno do erro de autenticacao
      .catch((erro: Error)=>console.log(erro))
    }

    public autenticado(): boolean {
        //recuperando a inforamacao de local storage
        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
          this.token_id = localStorage.getItem('idToken')
        }
        
        //levar o usuario para raiz em caso de logout ou inconsistencia na autencicao do token
        if(this.token_id === undefined){
          this.router.navigate(['/'])
        }

        return this.token_id !== undefined
    }

    //sair
    public sair(): void{
      firebase.auth()
        .signOut()
          .then(() => {
            localStorage.removeItem('idToken')
            this.token_id = undefined
            this.router.navigate(['/'])
      })
    }
}