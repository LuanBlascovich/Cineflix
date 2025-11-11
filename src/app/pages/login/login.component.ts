import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  senha: string = '';
  erroLogin: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) {}
  
  ngOnInit(): void {
    if (this.usuarioService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  login(form: NgForm) {
    if (!form.valid) {
      this.erroLogin = 'Preencha todos os campos corretamente.';
      return;
    }
    this.usuarioService.buscarPorEmail(this.email).subscribe({
      next: (usuarios: Usuario[]) => {
        const user = usuarios.find((u) => u.senha === this.senha);
        if (user) {
          this.usuarioService.login(user);
          alert('Login bem-sucedido!');
          this.router.navigate(
            [user.tipo === 'admin' ? '/admin/dashboard' : '/home'],
            { replaceUrl: true }
          );
        } else {
          this.erroLogin = 'Email ou senha incorretos.';
        }
      },
      error: (err: any) => {
        console.error(err);
        this.erroLogin = 'Erro ao acessar o servidor. Tente novamente.';
      },
    });
  }
}
