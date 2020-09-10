import { NgModule } from '@angular/core';
import { ImagenUrlPipe } from './imagen-url.pipe';



@NgModule({
  declarations: [
    ImagenUrlPipe
  ],
  exports: [
    ImagenUrlPipe
  ]
})

export class PipesModule { }
