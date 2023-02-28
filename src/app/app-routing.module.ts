import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/pages/form/form.component';
import { SuccessComponent } from './components/pages/success/success.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { LoaderComponent } from './components/pages/loader/loader.component';

const routes: Routes = [
  { path:'', component: FormComponent },
  { path:'success', component: SuccessComponent },
  { path:'error', component: ErrorComponent },
  { path:'loader', component: LoaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
