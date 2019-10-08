import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Plugins } from '@capacitor/core';

const { Geolocation, Toast } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  siteList: Observable<Site[]>;

  constructor(httpClient: HttpClient){
    this.siteList = httpClient.get<Site[]>("https://api.myjson.com/bins/9f88n")
  }


}

export interface Site{

  id: number;
  name: string;
  image: string;

}
