import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from 'src/app/imagem-model.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner-component.html',
  styleUrls: ['./banner-component.css'],
  animations: [ //trigger de animações
    trigger('banner', [//espera os parametros nome e as definicoes da animacao
      state('escondido', style({//nome do estado e estilos css
        opacity: 0//esconder um elemento html
      })),
      state('visivel', style({//exibir um elemento html
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))//mudanca de estado e qual animacao do processo (parametros de duracao)
    ])
  ]
})

export class BannerComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
    
    //timeout da rotacao das imagens
    setTimeout(() => this.logicaRotacao(), 2000 )
  }

  //indicar para trigger qual é o estado inicial do elemento, que futuramente sera animado
  public estado: string = 'visivel'

  //array de imagens
  public imagens: Imagem[]= [
    {estado: 'visivel',   url: 'assets/banner-acesso/img_1.png' },
    {estado: 'escondido', url: 'assets/banner-acesso/img_2.png' },
    {estado: 'escondido', url: 'assets/banner-acesso/img_3.png' },
    {estado: 'escondido', url: 'assets/banner-acesso/img_4.png' },
    {estado: 'escondido', url: 'assets/banner-acesso/img_5.png' },
  ]

  //logica da rotacao das imagens no banner
  public logicaRotacao():void{
    
    for(let i:number=0; i<=4; i++){
        if(this.imagens[i].estado === 'visivel'){
            this.imagens[i].estado = 'escondido'
    
            if(i+1 <= 4){
                this.imagens[i+1].estado = 'visivel'
            }else{
                this.imagens[0].estado = 'visivel'
            }
            break
        }
     }
        setTimeout(()=> this.logicaRotacao(), 2000)
    }
}