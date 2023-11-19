import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Producto } from '../producto';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  producto!: Producto;
  form!: FormGroup;

  constructor(
    public productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    public formulario: FormBuilder,

  ) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.productoService.find(this.id).subscribe((data: Producto)=>{
      this.producto = data;
    });

    this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      descripcion:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-Z0-9ÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      precio: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });


  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.productoService.update(this.id, this.form.value).subscribe(res => {
         console.log('Producto updated successfully!');
         this.router.navigateByUrl('producto/index');
    })
  }

}
