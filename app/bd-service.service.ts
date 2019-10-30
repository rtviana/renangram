import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { Progresso } from './progresso-service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }//injecao de progresso

    public publicar(publicacao: any): void {

        console.log(publicacao)

        //caminho publicacoes com a informaçao de gravacao no banco recebendo o objeto titulo
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo } )//criacao do objeto literal
            .then((resposta: any) => {
                //ajustar o nome da imagem
                let nomeImagem = resposta.key//garantir que a imagem sera unica

                firebase.storage().ref()//recebendo a imagem do metodo de publicacao e enviado para o Firebase
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,//evento que sera usado para incremento da barra de progresso
                        //acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'//em progresso
                            this.progresso.estado = snapshot
                            //console.log('Snapshot capturado no on(): ', snapshot)
                        },
                        (error) => {
                            this.progresso.status = 'erro'//tratativa de erro
                            console.log(error)
                        },
                        () => {
                            //finalização do processo
                            this.progresso.status = 'concluido'
                            //console.log('upload completo')
                        }
                    )
            })
    }

    //metodo para consulta de publicacoes
    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            //consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)//passando a referencia que queremos consultar
            .orderByKey()//ordenacao
            .once('value')//assim que consulta publicacoes for consultado, ira recupera uma "foto" do documento
            .then((snapshot: any) => {
                //console.log(snapshot.val())

                let publicacoes: Array<any> = [];//array com os dados de publicacao

                snapshot.forEach((childSnapshot: any) => { //loop para recuperar cada um dos parametros necessarios

                    let publicacao = childSnapshot.val() //para cada documento do snapshot, cria-se a variavel abaixo
                    
                    //consultar a url da imagem (storage)
                    firebase.storage().ref()
                        .child(`imagens/${childSnapshot.key}`) //para cada um dos docs, recuperar a url da imagem
                        .getDownloadURL() //baixar url valida
                        .then((url: string) => { //recuperar download
                            
                            publicacao.url_imagem = url //montagem do indice

                            //consultar o nome do usuário
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                .once('value')//realizacao da consulta passando o valor
                                .then((snapshot: any) => {//recuperando
                                    
                                    publicacao.nome_usuario = snapshot.val().nome_usuario
                                    
                                    //recuperar publicaoes
                                    publicacoes.push(publicacao)
                                })
                        })
                })
                resolve(publicacoes)//retorna uma promise
            })
        })
    }
}