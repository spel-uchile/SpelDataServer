import { Component, OnInit } from '@angular/core';
import { GraphPage } from '../graph-page';
import { GraphPageService} from "../graph-page.service";


@Component({
  selector: 'app-graph-pages',
  templateUrl: './graph-pages.component.html',
  styleUrls: ['./graph-pages.component.css']
})
export class GraphPagesComponent implements OnInit {
  graphs : GraphPage[];
  selectedGraph: GraphPage;
  current_index: 0;
  sub_graphs : GraphPage[];

  onSelect(graph: GraphPage): void {
    this.selectedGraph = graph;
    let c_index = this.graphs.findIndex(function equalGraph (element) {
      return element == graph;
    });
    this.createSubGraphs(c_index);
  }

  getGraphs(): void {
    this.graphService.getGraphs()
      .subscribe(
        graphs => {
          this.graphs = graphs;
          this.createSubGraphs(graphs.length-1);
        })
  }

  createSubGraphs(c_index): void {
    this.current_index = c_index;
    let n_obj = 8;
    let first_index = c_index - Math.floor(n_obj/2);
    let last_index = c_index + Math.floor(n_obj/2);

    if(first_index < 0 && n_obj <= this.graphs.length ) {
      first_index = 0;
      last_index = first_index + n_obj;
    } else if (last_index > this.graphs.length && n_obj <= this.graphs.length ){
      last_index = this.graphs.length;
      first_index =  last_index - n_obj
    } else if (n_obj > this.graphs.length) {
      first_index = 0;
      last_index = this.graphs.length
    }

    this.selectedGraph = this.graphs[this.current_index];
    this.sub_graphs = this.graphs.slice(first_index, last_index)

  }

  constructor(private graphService: GraphPageService) {}

  ngOnInit() {
    this.getGraphs();

  }

}
