import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso-component.html',
  styleUrls: ['./acesso-component.css'],
  animations:[
    trigger('animacao-banner', [
      state('criado', style({opacity: 1})),
        transition('void => criado', [
          style({ opacity: 0, transform: 'translate(-50px , -10px)'}),
              animate('500ms 1s ease-in-out')
      ])
    ]),

    trigger('animacao-painel', [
      state('criado', style({opacity: 1})),
        transition('void => criado', [style({
          opacity: 0, transform: 'translate(50px , 0px)'}),
            animate('1200ms 0s ease-in-out', keyframes([//array de estilos do keyframe
              //marca onde o keyframe ira atuar
              style({ offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
              style({ offset: 0.86, opacity: 1, transform: 'translateX(0)'}),
              style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
              style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
              style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
              style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
              style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
              style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)'}),
              style({ offset: 0.99, opacity: 1, transform: 'translateY(10px)'}),
              style({ offset: 1   , opacity: 1, transform: 'translateY(0)'})
          ]))
        ])
      ])
    ]
  })

export class AcessoComponent implements OnInit {

  //estado banner
  public estadoBanner: string = 'criado'

  //estado painel
  public estadoPainel: string = 'criado'

  //form login por padrão
  public cadastro: boolean= false

  //event string - parametro recebido no componente pai com @output em login
  public exibirPainel(event: string): void {

    //teste de controle do valor atribuido a this.cadastro
    this.cadastro = event === 'cadastro' ? true : false
  }
  
  constructor() { }

  ngOnInit() { }
}
