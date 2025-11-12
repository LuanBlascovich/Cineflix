import { Component, OnInit } from '@angular/core';
import { Filme } from '../../core/models/filme.model';
import { FilmesService } from '../../core/services/filmes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css'
})
export class FilmesComponent implements OnInit {

  filmes: Filme[] = [];

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.filmesService.getFilmes().subscribe((data) => {
      this.filmes = data;
    });
  }
}
