import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Seek } from '../../../core/models/Seek.model';
import { take, mergeMap } from 'rxjs/operators';
import { SeeksService } from 'src/app/modules/seeks/services/seeks.service';

@Injectable({
  providedIn: 'root'
})
export class SeekResolverService implements Resolve<Seek>{
  constructor(private seeksService: SeeksService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Seek> | Observable<never> {

    let id = route.paramMap.get('id');
    if (isNaN(+id)) {
      console.warn('seek id is NaN');
      return EMPTY;
    }

    return this.seeksService.getSeekById(+id).pipe(
      take(1),
      mergeMap((seek: Seek) => {
        if (seek) {
          return of(seek);
        } else { // id not found
          this.router.navigate(['/seeks']);
          return EMPTY;
        }
      })
    );
  }
}
