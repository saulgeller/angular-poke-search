import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchComponent } from './search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchurl: string = "";

  constructor(private http: HttpClient) { }

  setSearch(name: string) {
    this.searchurl = name;
  }

  getSearch() {

    return this.http.get(this.searchurl);

  }
}
