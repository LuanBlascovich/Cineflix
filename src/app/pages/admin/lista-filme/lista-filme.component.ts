import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-filme',
  templateUrl: './lista-filme.component.html',
  styleUrls: ['./lista-filme.component.css']
})
export class ListaFilmeComponent {
  termoBusca = '';
  filmes = [
    { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica'},
    { id: 2, titulo: 'O Poderoso Chefão', genero: 'Drama'},
    { id: 3, titulo: 'A Origem', genero: 'Ação'},
    { id: 4, titulo: 'Vingadores: Ultimato', genero: 'Aventura'},
  ];

  filmesFiltrados = [...this.filmes];

  constructor(private router: Router) {}

  filtrarFilmes() {
    const termo = this.termoBusca.toLowerCase();
    this.filmesFiltrados = this.filmes.filter(f =>
      f.titulo.toLowerCase().includes(termo)
    );
  }

  editarFilme(id: number) {
    this.router.navigate(['/admin/form-filme'], { queryParams: { id } });
  }
}
