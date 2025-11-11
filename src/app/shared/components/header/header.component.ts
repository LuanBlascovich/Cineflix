import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent implements OnInit {
  usuarioLogado: Usuario | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.usuarioLogado$.subscribe((usuario) => {
      this.usuarioLogado = usuario;
    });
  }

  get isLogged(): boolean {
    return this.usuarioService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.usuarioLogado?.tipo === 'admin';
  }

  get isUser(): boolean {
    return this.usuarioLogado?.tipo === 'usuario';
  }

  irParaLogin(): void {
    if (this.isLogged) {
      this.router.navigate([this.isAdmin ? '/admin/dashboard' : '/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.usuarioService.logout();
    this.usuarioLogado = null;
    this.router.navigate(['/login']);
  }
}
