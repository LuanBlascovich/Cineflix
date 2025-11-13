import { Component, OnInit } from '@angular/core';
import { Filme } from '../../core/models/filme.model';
import { FilmesService } from '../../core/services/filmes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private filmesService: FilmesService, private router: Router) {}

  ngOnInit(): void {
    this.filmesService.getFilmes().subscribe((filmes) => {
      this.filmes = filmes;
    });
  }

  get filmesFiltrados(): Filme[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.filmes.filter((filme) =>
      filme.titulo.toLowerCase().includes(filtroLower)
    );
  }

  verDetalhesFilme(id: number) {
    this.router.navigate(['/filme', id]);
  }
}
