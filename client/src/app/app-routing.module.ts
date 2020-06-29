import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EverestComponent } from './everest/everest.component';

const routes: Routes = [
  { path: 'club/:clubId/everest', component: EverestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
