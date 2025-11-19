import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmesService } from '../../../core/services/filmes.service';
import { Filme } from '../../../core/models/filme.model';

@Component({
  selector: 'app-listagem-filme',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listagem-filme.component.html',
  styleUrls: ['./listagem-filme.component.css'],
})
export class ListagemFilmeComponent implements OnInit {
  filmes: Filme[] = [];

  constructor(private filmesService: FilmesService) {}

  ngOnInit(): void {
    this.carregarFilmes();
  }

  carregarFilmes(): void {
    this.filmesService.getFilmes().subscribe({
      next: (data) => (this.filmes = data),
      error: (err) => console.error('Erro ao carregar filmes:', err),
    });
  }

  excluirFilme(filme: Filme): void {
    const confirmacao = confirm(
      `Tem certeza que deseja excluir o filme "${filme.titulo}"?`
    );
    if (!confirmacao) return;

    this.filmesService.deletarFilme(filme.id).subscribe({
      next: () => {
        alert('Filme excluído com sucesso!');
        this.carregarFilmes(); // recarrega a lista
      },
      error: (err) => {
        console.error('Erro ao excluir filme:', err);
        alert('Erro ao excluir o filme.');
      },
    });
  }
}
