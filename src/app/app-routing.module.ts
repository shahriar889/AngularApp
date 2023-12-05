import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddFormComponent } from './add-form/add-form.component';
import { LoadingComponent } from './loading/loading.component';
import { MoreInfoComponent } from './more-info/more-info.component';


const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent},
  { path: 'add', component: AddFormComponent},
  { path: 'loading', component: LoadingComponent},
  { path: 'more/:time', component: MoreInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
