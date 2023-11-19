import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  productos: Producto[] = [];
  modal: boolean = true;
  constructor(public productoService: ProductoService) { }


  ngOnInit(): void {
    this.productoService.getAll().subscribe((data: Producto[])=>{
      this.productos = data;
      console.log(this.productos);
    })
  }

  deleteProducto(id: any){
    this.productoService.delete(id).subscribe(res => {
         this.productos = this.productos.filter(item => item.id !== id);
         console.log('Person deleted successfully!');
    })
  }

}
