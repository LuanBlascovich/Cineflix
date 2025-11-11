import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
export class CadastrarComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmSenha: string = '';
  cpf: string = '';
  cpfInvalido: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  // Validação de CPF
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

    const novoUsuario: Usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      cpf: this.cpf,
      tipo: 'usuario',
    };

    this.usuarioService.cadastrar(novoUsuario).subscribe({
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
}
