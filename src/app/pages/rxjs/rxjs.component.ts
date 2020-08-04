import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy  {

  intervalSubs: Subscription;

  constructor() {

    // this.retornaObserbable().pipe(retry()).subscribe(
    //   valor => console.log('valor: ', valor),
    //   error => console.warn('error: ', error),
    //   () => console.log('Observable terminado'));
    this.intervalSubs = this.retornoIntervalo().subscribe((valor) => console.log('valor: ', valor));
  }
  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

  retornoIntervalo(): Observable<number> {
    return interval(100)
    .pipe(
      map( valor => valor + 1),
      filter( valor => (valor % 2 === 0) ? true : false),
      take(10),
      );
  }

  retornaObserbable(): Observable<number> {
    let i = 0;
    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        observer.next(i);
        i++;
        if ( i > 4 ){
          clearInterval( intervalo );
          observer.complete();
        }
        if ( i === 2 ){
          console.log('error: ', i);
          observer.error('error');
        }
      }, 1000);
    } );
  }

}
