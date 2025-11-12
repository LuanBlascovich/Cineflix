import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { FormFilmeComponent } from './pages/admin/form-filme/form-filme.component';
import { FilmeInfoComponent } from './pages/filme-info/filme-info.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';
import { ListagemUsuarioComponent } from './pages/admin/listagem-usuario/listagem-usuario.component';
import { FilmesComponent } from './pages/filmes/filmes.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
    title: 'Cadastrar',
  },
  {
    path: 'cadastrar/:id',
    component: CadastrarComponent,
    title: 'Editar Usuário',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'filmes',
    component: FilmesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'categoria',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [authGuard],
  },
  {
    path: 'filme/:id',
    component: FilmeInfoComponent,
    canActivate: [authGuard],
    title: 'Detalhes do Filme',
  },
  {
    path: 'admin/usuarios',
    component: ListagemUsuarioComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/form-filme',
    component: FormFilmeComponent,
    canActivate: [adminGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
