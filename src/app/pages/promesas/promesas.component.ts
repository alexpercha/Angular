import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });
    // tslint:disable-next-line: no-shadowed-variable
  //   const promesa = new Promise( ( resolve , reject ) => {
  //     if ( true ) {
  //       resolve('hola mundo');
  //     } else {
  //       reject('termino mal');
  //     }
  //   });

  //   promesa.then( (mensaje) => {
  //     console.log(mensaje);
  //   }).catch( error => console.log('error en mi promesa', error));
  //   console.log('termino');


  }

  getUsuarios() {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( ( resolve ) => {

      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve(body.data));
    });

  }

}
