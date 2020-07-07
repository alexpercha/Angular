import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;
  @Output() cambioValor: EventEmitter<any> = new EventEmitter();

  constructor() {
   }

  ngOnInit(): void {
  }

  onChage( newValue: number) {

    // let elementoHTML: any = document.getElementsByName('progreso')[0];


    if (newValue > 100) {
      newValue = 100;
    }
    if (newValue < 0) {
      newValue = 0;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(newValue);
  }

  cambiarValor( valor: number ) {
    if ( this.progreso < 0 || this.progreso > 100) {
      return;
    }

    this.progreso = this.progreso + valor;

    if (this.progreso < 0 ) {
      this.progreso = 0;
    }
    if (this.progreso > 100 ) {
      this.progreso = 100;
    }
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }
}
