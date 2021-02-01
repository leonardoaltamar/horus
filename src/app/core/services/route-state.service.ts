import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RouteState } from '../models/route-state'

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {

  constructor(private router: Router) { }

  getCurrent(): RouteState {
    const routeStates = this.getFromStorage();
    return routeStates[routeStates.length - 1];
  }

  getAll(): RouteState[] {
    const routeStates = this.getFromStorage();
    return routeStates;
  }

  getUrl(): RouteState {
    const routeStates = this.getFromStorage();
    return routeStates[routeStates.length -1];
  }

  /**
   * add route data
   * @param title route name
   * @param path route path
   * @param data route data
   * @param isParent is parent route
   */
  add(title: string, path: string, data: any, isParent: boolean){
    if(isParent){
      this.removeAll();
    }

    var routeStates = this.getFromStorage();

    const routeState = new RouteState();
    routeState.title=title;
    routeState.path=path;
    routeState.data=data;

    routeStates.push(routeState)
    this.saveToStorage(routeStates);
    this.navigate(routeState.path);
  }

  loadPrevious(){
    const routeStates = this.getFromStorage();
    routeStates.pop();
    this.saveToStorage(routeStates);
    const CurrentViewState = this.getCurrent();
    this.navigate(CurrentViewState.path);
  }

  /**
   *
   * @param id load route route id
   */
  loadById(id: number) {
    var result = [];
    var isFound = false;
    var routeStates = this.getFromStorage();
    routeStates.forEach(route => {
        if (isFound) {
            return;
        }
        result.push(route);
        if (route.id === id) {
            isFound = true;
        }
    });
    routeStates = result;
    this.saveToStorage(routeStates);
    var currentViewState = this.getCurrent();
    this.navigate(currentViewState.path);
  }

  removeAll() {
    this.removeFromStorage();
  }

  private saveToStorage(routeStates: any) {
      localStorage.setItem("routeState", JSON.stringify(routeStates));
  }

  private getFromStorage() {
      var routeStates = JSON.parse(localStorage.getItem("routeState"));
      return (routeStates === undefined || routeStates === null) ? [] : routeStates;
  }

  private removeFromStorage() {
      localStorage.removeItem("routeState");
  }

  private navigate(path: string) {
      this.router.navigate([path]);
  }


}
