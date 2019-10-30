import { Routes } from '@angular/router'
import { AcessoComponent } from './acesso/acesso-component/acesso-component';
import { HomeComponent } from './home/home/home.component';
import { RouterGuard } from './router-guard.service';

export const ROUTES: Routes = [
  {path: '', component: AcessoComponent},//rota padrao
  {path: 'home', component: HomeComponent, canActivate: [RouterGuard]},//rota para home
]