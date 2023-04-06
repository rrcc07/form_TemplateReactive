import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

const ROUTES: Routes = [
  { path: 'template',
    component: TemplateComponent },
  { path: 'reactivo',
    component: ReactiveComponent },
  { path: '**',
    pathMatch: 'full',
    redirectTo: 'reactivo'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule{};

