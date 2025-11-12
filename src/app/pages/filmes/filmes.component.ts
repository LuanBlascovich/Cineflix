import { Component, OnInit } from '@angular/core';
import { Filme } from '../../core/models/filme.model';
import { FilmesService } from '../../core/services/filmes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css',
})
export class FilmesComponent implements OnInit {
  filmes: Filme[] = [];

  constructor(private filmesService: FilmesService, private router: Router) {}

  ngOnInit(): void {
    this.filmesService.getFilmes().subscribe((filmes) => {
      this.filmes = filmes;
    });
  }

  verDetalhesFilme(id: number) {
    this.router.navigate(['/filme', id]);
  }
}
