import {GraphPage} from "../graph-page";
import { Component, OnInit, Input } from '@angular/core';
import {Globals} from "../globals";


@Component({
  selector: 'app-graph-detail',
  templateUrl: './graph-detail.component.html',
  styleUrls: ['./graph-detail.component.css']
})

export class GraphDetailComponent implements OnInit{
  @Input() graph: GraphPage;

  constructor(private globals: Globals) { }

  ngOnInit() {
  }
}


