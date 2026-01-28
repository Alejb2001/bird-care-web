import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { SpeciesList } from './pages/species-list/species-list';
import { SpeciesDetail } from './pages/species-detail/species-detail';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'article/:id',
    component: ArticleDetailComponent
  },
  {
    path: 'especies',
    component: SpeciesList
  },
  {
    path: 'especies/:id',
    component: SpeciesDetail
  },
  {
    path: '**',
    redirectTo: ''
  }
];
