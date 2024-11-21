import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: FormComponent }, // Formulaire par défaut
  { path: 'home', component: HomeComponent }, // Page Home
];
