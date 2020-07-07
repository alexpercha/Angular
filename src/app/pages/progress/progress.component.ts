import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  progresoAzul = 30;
  progresoVerde = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
