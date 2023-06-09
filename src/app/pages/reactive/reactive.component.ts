import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService){
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {

  }

  // un getter es solo optener una propiedad (esto para validar los campos)
  get nombreNoValido(){ return this.forma.get('nombre').invalid && this.forma.get('nombre').touched; }
  get apellidoNoValido(){ return this.forma.get('apellido').invalid && this.forma.get('apellido').touched; }
  get correoNoValido(){ return this.forma.get('correo').invalid && this.forma.get('correo').touched; }
  get usuarioNoValido(){ return this.forma.get('usuario').invalid && this.forma.get('usuario').touched; }
  get distritoNoValido(){ return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched; }
  get ciudadNoValido(){ return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched; }

  // solo para hacer referencia al array del form
  get pasatiempos(){ return this.forma.get('pasatiempos') as FormArray; }

  //validar passwords
  get pass1NoValido(){ return this.forma.get('pass1').invalid && this.forma.get('pass1').touched }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      //[valor, validadores sincronos, validadores asincronos]
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // validadores asincronos
      usuario: ['', , this.validadores.existeUsuario],

      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([ ])
    },{
      // otra forma de validar (validar los passwords)
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    })
  }

  cargarDataAlFormulario(){
    // cuando se utiliza el setValue se tiene que establecer todos los campos
    //this.forma.setValue({
    // pero el reset no es necesario (reestablece los campos)
    this.forma.reset({
      nombre: "nombre",
      apellido: "apellido",
      correo: "asd@as.co",
      usuario: "",
      pass1: "123",
      pass2: "123",
      direccion: {
        distrito: "nuevo",
        ciudad: "ciudad"
      }
    })
  }

  guardar(){
    console.log(this.forma)
    //validar los inputs al tocar el boton "guardar"
    if( this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control => {

        if( control instanceof FormGroup){
            Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    //reset del campo
    this.forma.reset({
      nombre: "Sin nombre"
    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control(''));
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  //Detectar cambios de valores, de estado
  crearListeners(){
    //this.forma.valueChanges.subscribe( console.log );
    //this.forma.statusChanges.subscribe( status => console.log({status}) );
    //un valor en particular
    this.forma.get('nombre').valueChanges.subscribe(nombre => console.log({nombre}));
  }
}
