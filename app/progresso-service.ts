import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Progresso {

  constructor() { }

  public status: string
  public estado: any
}