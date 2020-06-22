import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { mainReducer } from './store/reducer';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(mainReducer),
    NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
