import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  precios : string = "";

  constructor(
    public productoService: ProductoService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      descripcion:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      precio: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });

  }

  get f(){
    return this.form.controls;
  }


  submit(){
    console.log(this.form.value);
    this.productoService.create(this.form.value).subscribe(res => {
         console.log('Producto created successfully!');

         this.router.navigateByUrl('producto/index');
         let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    })
  }

  limpiar(){
    const nombres = document.getElementById("nombre");
//this.currentProject.reset();
    //this.precios = "";
    this.form.reset();
  }
}
