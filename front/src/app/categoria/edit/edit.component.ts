import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id!: number;
  categoria!: Categoria;
  form!: FormGroup;

  constructor(
    public categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.categoriaService.find(this.id).subscribe((data: Categoria)=>{
      this.categoria = data;
    });

    this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      descripcion:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ])
    });


  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.categoriaService.update(this.id, this.form.value).subscribe(res => {
         console.log('Producto updated successfully!');
         this.router.navigateByUrl('categoria/index');
    })
  }

}
