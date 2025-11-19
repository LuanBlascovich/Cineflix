import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { Filme } from '../../core/models/filme.model';
import { FilmesService } from '../../core/services/filmes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  generos = [
    'Ação e Aventura',
    'Animação',
    'Comédia',
    'Drama',
    'Família',
    'Fantasia',
    'Ficção Científica',
    'Romance',
  ];
  filmesPorGenero: { [key: string]: Filme[] } = {};
  constructor(private filmesService: FilmesService, private router: Router) {}
  ngOnInit(): void {
    this.filmesService.getFilmes().subscribe((filmes) => {
      this.generos.forEach((genero) => {
        this.filmesPorGenero[genero] = filmes.filter(
          (f) => f.generos && f.generos.includes(genero)
        );
      });
    });
  }
  verDetalhesFilme(id: number) {
    this.router.navigate(['/filme', id]);
  }
}
