import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EmpService } from './services/emp.service';
import { HomeComponent } from './home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-toggle-switch';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      //useHash: false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [
    EmpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
