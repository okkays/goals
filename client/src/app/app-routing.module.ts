import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EverestComponent } from './everest/everest.component';

const routes: Routes = [
  { path: 'club/:id/everest', component: EverestComponent },
  { path: '**', redirectTo: 'club/214176/everest' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
