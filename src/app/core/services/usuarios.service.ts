import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.usuarioLogadoSubject.next(JSON.parse(storedUser));
    }
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioLogadoSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.usuarioLogadoSubject.value;
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  editarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  buscarPorEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  getTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  excluirUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  login(usuario: Usuario): void {
    localStorage.setItem('user', JSON.stringify(usuario));
    this.usuarioLogadoSubject.next(usuario);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.usuarioLogadoSubject.next(null);
  }
}
