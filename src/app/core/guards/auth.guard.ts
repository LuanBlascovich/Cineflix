import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';

// Guarda para qualquer usuário logado
export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.isLoggedIn()) {
    return true;
  } else {
    alert('Você precisa estar logado para acessar esta página.');
    router.navigate(['/login']);
    return false;
  }
};

// Guarda para apenas admins
export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const user = usuarioService.getUsuarioLogado();
  if (user && user.tipo === 'admin') {
    return true;
  } else {
    alert('Você precisa ser administrador para acessar esta página.');
    router.navigate(['/login']);
    return false;
  }
};
