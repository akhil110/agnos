import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PairsPipe } from './pipes/pairs.pipe';
import { CombonamePipe } from './pipes/comboname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PairsPipe,
    CombonamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
