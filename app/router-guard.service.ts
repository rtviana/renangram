import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Autenticacao } from './acesso/autenticacao.service';

@Injectable()
export class RouterGuard implements CanActivate{

  constructor(
    //inferencia do tipo
    private autenticacao: Autenticacao
  ) { }
  
  canActivate(): boolean{
    return this.autenticacao.autenticado()    
  }
}