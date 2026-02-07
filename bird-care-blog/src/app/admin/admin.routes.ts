import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./components/article-list/article-list.component').then(m => m.ArticleListComponent)
      },
      {
        path: 'articles/new',
        loadComponent: () =>
          import('./components/article-editor/article-editor.component').then(m => m.ArticleEditorComponent)
      },
      {
        path: 'articles/:id/edit',
        loadComponent: () =>
          import('./components/article-editor/article-editor.component').then(m => m.ArticleEditorComponent)
      },
      {
        path: 'species',
        loadComponent: () =>
          import('./components/species-list/species-list.component').then(m => m.SpeciesListComponent)
      },
      {
        path: 'species/new',
        loadComponent: () =>
          import('./components/species-editor/species-editor.component').then(m => m.SpeciesEditorComponent)
      },
      {
        path: 'species/:id/edit',
        loadComponent: () =>
          import('./components/species-editor/species-editor.component').then(m => m.SpeciesEditorComponent)
      }
    ]
  }
];
