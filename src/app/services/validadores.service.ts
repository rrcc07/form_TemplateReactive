import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  // validaciones personalizadas =>(que no sea 'herrera')
  noHerrera( control: FormControl ): ErrorValidate{
    // 'value?' => si el valor existe pasalo a lowerCase
    if( control.value?.toLowerCase() == 'herrera'){
      return {
        noHerrera: true
      }
    }
    // retorn null porque no es 'herrera'
    return null;
  }

  passwordsIguales(pass1: string, pass2:string){
    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if(pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    //evitar que ya empieze a validar el form
    if( !control.value ){
      return Promise.resolve(null);
    }

    return new Promise( ( resolve, reject ) =>{
      //simulamos un retardo
      setTimeout(()=>{
        if( control.value === 'usuarioExiste') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    })
  }
}


//debemos inyectarlo en el component de form
