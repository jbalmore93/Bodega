import { Component } from '@angular/core';
import { Categoria } from '../categoria';

import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  categorias: Categoria[] = [];

  constructor(public categoriaService: CategoriaService) { }


  ngOnInit(): void {
    this.categoriaService.getAll().subscribe((data: Categoria[])=>{
      this.categorias = data;
      console.log(this.categorias);
    })
  }

  deleteCategoria(id: any){
    this.categoriaService.delete(id).subscribe(res => {
         this.categorias = this.categorias.filter(item => item.id !== id);
         console.log('Person deleted successfully!');
    })
  }
}
