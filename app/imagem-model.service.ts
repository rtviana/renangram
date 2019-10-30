import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Imagem {

  constructor(
    public estado: string,
    public url: string
  ) { }
}
