import { Component, OnInit } from '@angular/core';
import { Filme } from '../../core/models/filme.model';
import { FilmesService } from '../../core/services/filmes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GENEROS_DISPONIVEIS } from '../../core/models/genero.model';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css',
})
export class FilmesComponent implements OnInit {
  filmes: Filme[] = [];
  filtro: string = '';
  generosDisponiveis = GENEROS_DISPONIVEIS;
  generosSelecionados: string[] = [];

  constructor(private filmesService: FilmesService, private router: Router) {}

  ngOnInit(): void {
    this.filmesService.getFilmes().subscribe((filmes) => {
      this.filmes = filmes;
    });
  }

  get filmesFiltrados(): Filme[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.filmes.filter((filme) => {
      const tituloMatch = filme.titulo.toLowerCase().includes(filtroLower);
      const generoMatch =
        this.generosSelecionados.length === 0 ||
        filme.generos.some((g) => this.generosSelecionados.includes(g));
      return tituloMatch && generoMatch;
    });
  }
  toggleGenero(genero: string, event: any) {
    if (event.target.checked) {
      // Adiciona
      this.generosSelecionados.push(genero);
    } else {
      // Remove
      this.generosSelecionados = this.generosSelecionados.filter(
        (g) => g !== genero
      );
    }
  }

  verDetalhesFilme(id: number) {
    this.router.navigate(['/filme', id]);
  }
}
