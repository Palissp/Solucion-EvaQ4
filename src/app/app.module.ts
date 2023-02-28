import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/molecules/header/header.component';
import { FormComponent } from './components/pages/form/form.component';
import { SuccessComponent } from './components/pages/success/success.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FormTitleComponent } from './components/atoms/form-title/form-title.component';
import { LoaderComponent } from './components/pages/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    SuccessComponent,
    ErrorComponent,
    FormTitleComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
