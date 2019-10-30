import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'//acesso aos recursos do SDK

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Renangram';

  ngOnInit(): void{
    
    //inicialização do Firebase com as chaves obtidas
    var config = {
      apiKey: "AIzaSyATsVJMaQ0Xe6hxZvOJ2I0azQCmanMXT4o",
      authDomain: "renangram.firebaseapp.com",
      databaseURL: "https://renangram.firebaseio.com",
      projectId: "renangram",
      storageBucket: "renangram.appspot.com",
      messagingSenderId: "743875304155",
      appId: "1:743875304155:web:d4a6a03cf7a25b60"
    };
    
    firebase.initializeApp(config)
  }
}