import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: ''
  }

  paises: any[];

  constructor(private paisService: PaisService){  }

  ngOnInit(){
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;

        this.paises.unshift({
          nombre: "[seleccione un pais]",
          codigo: ""
        })
      })
  }

  guardar(forma: NgForm){
    console.log(forma)
    if( forma.invalid){
      //realizamos la validacion revisando si el input fue modificado(tocado), esto con el control (metodo markAsTouched) de cada input
      Object.values( forma.controls )
        .forEach( control => {
          control.markAsTouched();
        })
      return;
    }
  }
}
