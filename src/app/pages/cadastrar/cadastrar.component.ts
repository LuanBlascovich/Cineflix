import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../core/models/usuario.model';
import { UsuarioService } from '../../core/services/usuarios.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmSenha: string = '';
  cpf: string = '';
  cpfInvalido: boolean = false;
  usuarioId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.usuarioId = Number(idParam);
        this.isEditMode = true;
        this.carregarUsuario(this.usuarioId);
      }
    });
  }

  carregarUsuario(id: number) {
    this.usuarioService.getTodosUsuarios().subscribe((usuarios) => {
      const usuario = usuarios.find((u) => u.id === id);
      if (usuario) {
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.cpf = usuario.cpf;
        this.senha = usuario.senha;
        this.confirmSenha = usuario.senha;
      }
    });
  }

  validarCPF(): boolean {
    const cpf = this.cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      this.cpfInvalido = true;
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[9])) {
      this.cpfInvalido = true;
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[10])) {
      this.cpfInvalido = true;
      return false;
    }

    this.cpfInvalido = false;
    return true;
  }

  cadastrar(form: NgForm) {
    if (!this.validarCPF()) {
      alert('CPF inválido!');
      return;
    }

    if (this.senha !== this.confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (!emailValido) {
      alert('Digite um email válido!');
      return;
    }

    if (!form.valid || this.cpfInvalido) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const usuario: Usuario = {
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      tipo: 'usuario',
      senha: this.senha,
    };

    this.usuarioService.verificarCpf(this.cpf).subscribe((usuarios) => {
      const cpfJaExiste = usuarios.some(
        (u) =>
          u.cpf === this.cpf && (!this.isEditMode || u.id !== this.usuarioId)
      );

      if (cpfJaExiste) {
        alert('Este CPF já está cadastrado!');
        return;
      }

      if (this.isEditMode && this.usuarioId) {
        this.usuarioService.editarUsuario(this.usuarioId, usuario).subscribe({
          next: () => {
            alert('Usuário editado com sucesso!');
            this.router.navigate(['/admin/usuarios']);
          },
          error: (err) => {
            console.error(err);
            alert('Ocorreu um erro ao editar. Tente novamente.');
          },
        });
      } else {
        this.usuarioService.cadastrar(usuario).subscribe({
          next: () => {
            alert('Cadastro realizado com sucesso!');
            form.resetForm();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error(err);
            alert('Ocorreu um erro ao cadastrar. Tente novamente.');
          },
        });
      }
    });
  }
}
