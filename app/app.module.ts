import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


//componentes e serviços criados
import { AppComponent } from './app.component';
import { AcessoComponent} from './acesso/acesso-component/acesso-component';
import { BannerComponentComponent } from './acesso/banner-component/banner-component';
import { LoginComponentComponent } from './acesso/login-component/login-component';
import { CadastroComponentComponent } from './acesso/cadastro-component/cadastro-component';
import { Autenticacao } from './acesso/autenticacao.service';
import { HomeComponent } from './home/home/home.component';
import { PublicacoesComponent } from './home/home/publicacoes/publicacoes.component';
import { RouterGuard } from './router-guard.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { ROUTES } from './app-routes.service';
import { Bd } from './bd-service.service';
import { Progresso } from './progresso-service';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponentComponent,
    LoginComponentComponent,
    CadastroComponentComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [Autenticacao,RouterGuard, Bd, Progresso],
  bootstrap: [AppComponent]
})
export class AppModule { }