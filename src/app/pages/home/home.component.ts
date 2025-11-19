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
  generos = ['Animação', 'Ação e Aventura', 'Ficção Científica', 'Fantasia'];
  filmesPorGenero: { [key: string]: Filme[] } = {};
  limite = 10;
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
