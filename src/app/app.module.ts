import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphPagesComponent } from './graph-pages/graph-pages.component';
import { GraphDetailComponent } from "./graph-detail/graph-detail.component";
import {GraphPageService} from "./graph-page.service";
import {HttpClientModule} from "@angular/common/http";

import {Globals} from "./globals";


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    GraphPagesComponent,
    GraphDetailComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GraphPageService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
