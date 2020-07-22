import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styleUrls: ['./accout-settings.component.css']
})
export class AccoutSettingsComponent implements OnInit {

  constructor(private ajustes: SettingsService) { }

  ngOnInit(): void {
  }

  cambiarColor( tema: string, link: any) {
    this.aplicarCheck(link);
    this.ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any) {

    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }



}
