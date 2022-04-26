import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationParamService {
  NavData : any;
  constructor() { }

  setNavData(navObj){
      this.NavData = navObj;
  }

  getNavData(){
    if(this.NavData === null) return 0;
     return this.NavData;;
  }
}
