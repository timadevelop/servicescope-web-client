import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<Component> {
  canDeactivate(
    component: Component,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    // Get the Crisis Center ID
    // TODO:
    // console.log(route.paramMap.get('id'));

    // Get the current URL
    // console.log(state.url);

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    // if (!component.business || component.business.name === component.editName) {
    //   return true;
    // }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    // return component.dialogService.confirm('Discard changes?');
    return true;
  }
}
