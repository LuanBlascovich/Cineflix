import { Component, OnInit, HostListener } from '@angular/core';
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
  dropdownAtivo = false;

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


toggleDropdown() {
  this.dropdownAtivo = !this.dropdownAtivo;
}


  logout(): void {
    this.usuarioService.logout();
    this.usuarioLogado = null;
    this.dropdownAtivo = false;
    this.router.navigate(['/login']);
  }

  // 👇 Aqui está o HostListener separado corretamente
  @HostListener('document:click', ['$event'])
  fecharDropdownAoClicarFora(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) {
      this.dropdownAtivo = false;
    }
  }
}