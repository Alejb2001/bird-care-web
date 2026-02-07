import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { SpeciesList } from './pages/species-list/species-list';
import { SpeciesDetail } from './pages/species-detail/species-detail';
import { Sources } from './pages/sources/sources';
import { AllArticlesComponent } from './pages/all-articles/all-articles.component';
import { SocialComponent } from './pages/social/social.component';
import { CategoryComponent } from './pages/category/category.component';

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
    path: 'articulos',
    component: AllArticlesComponent
  },
  {
    path: 'categoria/:slug',
    component: CategoryComponent
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
    path: 'fuentes',
    component: Sources
  },
  {
    path: 'social/:platform',
    component: SocialComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
