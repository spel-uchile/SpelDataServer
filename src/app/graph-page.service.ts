import { Injectable } from '@angular/core';
import { GraphPage } from "./graph-page";
import { GRAPHS } from "./mock-graphs-pages";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import {Globals} from "./globals";

@Injectable()
export class GraphPageService {

  getGraphs() : Observable<GraphPage[]> {
    // return of(GRAPHS);
    return this.http.get<GraphPage[]>(this.globals.backend_server + '/viz');
  }

  constructor(private http: HttpClient, private globals: Globals) { }


}
