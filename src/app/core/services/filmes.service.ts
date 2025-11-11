import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme.model';

@Injectable({
  providedIn: 'root',
})
export class FilmesService {
  private apiUrl = 'http://localhost:3000/filmes';

  constructor(private http: HttpClient) {}

  getFilmes(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiUrl);
  }

  getFilmePorId(id: number): Observable<Filme> {
    return this.http.get<Filme>(`${this.apiUrl}/${id}`);
  }

  adicionarFilme(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.apiUrl, filme);
  }

  atualizarFilme(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(`${this.apiUrl}/${filme.id}`, filme);
  }

  deletarFilme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
