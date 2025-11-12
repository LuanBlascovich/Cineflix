import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-listagem-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.css'],
})
export class ListagemUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.getTodosUsuarios().subscribe({
      next: (usuarios) => (this.usuarios = usuarios),
      error: (err) => console.error('Erro ao carregar usuários:', err),
    });
  }

  excluirUsuario(usuario: Usuario): void {
    const confirmacao = confirm(
      `Tem certeza que deseja excluir o usuário "${usuario.nome}"?`
    );
    if (!confirmacao || !usuario.id) return;

    this.usuarioService.excluirUsuario(usuario.id).subscribe({
      next: () => {
        alert('Usuário excluído com sucesso!');
        this.carregarUsuarios();
      },
      error: (err) => {
        console.error('Erro ao excluir usuário:', err);
        alert('Erro ao excluir o usuário.');
      },
    });
  }
}
