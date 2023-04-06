import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) {

   }

   getPaises(){
      return this.http.get('https://restcountries.com/v3.1/all')
        .pipe(
          map( (resp:any[]) => {
            return resp.map( pais =>{
              return {
                nombre: pais.name.common,
                codigo: pais.altSpellings[0]
              }
            })
          })
        );
   }
}
