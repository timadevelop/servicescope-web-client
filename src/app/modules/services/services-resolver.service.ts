import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Service } from '../../shared/models/Service.model';
import { take, mergeMap } from 'rxjs/operators';
import { ServicesService } from 'src/app/shared/services/services.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesResolverService implements Resolve<Service>{
  constructor(private servicesService: ServicesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Service> | Observable<never> {

    let id = route.paramMap.get('id');

    return this.servicesService.getServiceById(+id).pipe(
      take(1),
      mergeMap((service: Service) => {
        if (service) {
          return of(service);
        } else { // id not found
          this.router.navigate(['/services']);
          return EMPTY;
        }
      })
    );
  }
}
