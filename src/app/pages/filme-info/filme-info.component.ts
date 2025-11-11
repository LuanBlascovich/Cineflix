import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from '../../core/services/filmes.service';
import { Filme } from '../../core/models/filme.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filme-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filme-info.component.html',
  styleUrls: ['./filme-info.component.css'],
})
export class FilmeInfoComponent implements OnInit {
  filme: Filme | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmesService: FilmesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.filmesService.getFilmePorId(id).subscribe({
        next: (filme) => (this.filme = filme),
        error: (err) => console.error(err),
      });
    }
  }
}
