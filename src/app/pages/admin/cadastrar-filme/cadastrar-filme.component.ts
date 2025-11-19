import { Component, OnInit } from '@angular/core';
import { Filme } from '../../../core/models/filme.model';
import { FilmesService } from '../../../core/services/filmes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GENEROS_DISPONIVEIS } from '../../../core/models/genero.model';

@Component({
  selector: 'app-cadastrar-filme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-filme.component.html',
  styleUrls: ['./cadastrar-filme.component.css'],
})
export class CadastrarFilmeComponent implements OnInit {
  filme: Filme = {
    id: 0,
    titulo: '',
    generos: [],
    descricao: '',
    capa: '',
    duracao: '',
    anoLancamento: new Date().getFullYear(),
  };

  generosDisponiveis = GENEROS_DISPONIVEIS;
  generosInvalid: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private filmesService: FilmesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.filmesService.getFilmePorId(+id).subscribe({
        next: (f) => {
          this.filme = f;
        },
        error: (err) => console.error('Erro ao carregar filme:', err),
      });
    }
  }

  toggleGenero(genero: string) {
    if (this.filme.generos.includes(genero)) {
      this.filme.generos = this.filme.generos.filter((g) => g !== genero);
    } else {
      this.filme.generos.push(genero);
    }
    this.generosInvalid = this.filme.generos.length === 0;
  }

  cadastrar(form: any): void {
    if (this.filme.generos.length === 0) {
      this.generosInvalid = true;
      return;
    }

    if (this.isEditMode) {
      this.filmesService.atualizarFilme(this.filme).subscribe({
        next: () => this.router.navigate(['/admin/filmes']),
        error: (err) => console.error('Erro ao atualizar filme:', err),
      });
    } else {
      this.filmesService.adicionarFilme(this.filme).subscribe({
        next: () => this.router.navigate(['/admin/filmes']),
        error: (err) => console.error('Erro ao cadastrar filme:', err),
      });
    }
  }
}
