import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FormFilmeComponent } from './pages/admin/form-filme/form-filme.component';
import { ListaFilmeComponent } from './pages/admin/lista-filme/lista-filme.component';
import { FilmeInfoComponent } from './pages/filme-info/filme-info.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'cadastrar', component: CadastrarComponent, title: 'Cadastrar' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'filmes', component: HomeComponent, canActivate: [authGuard] },
  { path: 'categoria', component: HomeComponent, canActivate: [authGuard] },
  { path: 'sobre', component: SobreComponent, canActivate: [authGuard] },
  {
    path: 'filme/:id',
    component: FilmeInfoComponent,
    canActivate: [authGuard],
    title: 'Detalhes do Filme',
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/form-filme',
    component: FormFilmeComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/lista-filme',
    component: ListaFilmeComponent,
    canActivate: [adminGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
