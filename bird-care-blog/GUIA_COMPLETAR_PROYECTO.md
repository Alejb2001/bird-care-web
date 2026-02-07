# Guía para Completar el Proyecto - Blog Entre Alas

**Estado Actual:** Backend 100% + Frontend Services Integrados + SSR Iniciado
**Fases Completadas:** 6.5 de 11
**Tiempo Estimado Restante:** 10-12 horas

---

## ✅ LO QUE YA ESTÁ HECHO

### Backend (100% Completo)
- ✅ API REST con 25+ endpoints
- ✅ Autenticación JWT
- ✅ Upload a Cloudinary
- ✅ PostgreSQL schema completo
- ✅ Modelos y controladores
- ✅ Middleware de seguridad

### Frontend (70% Completo)
- ✅ Services con HttpClient
- ✅ Environment configs
- ✅ Archivos SSR creados (parcial)
- ⏳ SSR pendiente configurar en angular.json
- ⏳ Admin panel pendiente
- ⏳ Deployment config pendiente

---

## 📋 PASOS PARA COMPLETAR

### PASO 1: Finalizar SSR Configuration (30 min)

#### 1.1 Actualizar angular.json

Agregar configuración de server build en `angular.json`:

```json
{
  "projects": {
    "bird-care-blog": {
      "architect": {
        "build": {
          // Configuración existente...
        },
        "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/bird-care-blog/server",
            "main": "src/main.server.ts",
            "tsConfig": "tsconfig.server.json"
          },
          "configurations": {
            "production": {
              "outputHashing": "media"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "sourceMap": true,
              "extractLicenses": false
            }
          },
          "defaultConfiguration": "production"
        },
        "serve-ssr": {
          "builder": "@angular-devkit/build-angular:ssr-dev-server",
          "configurations": {
            "development": {
              "browserTarget": "bird-care-blog:build:development",
              "serverTarget": "bird-care-blog:server:development"
            },
            "production": {
              "browserTarget": "bird-care-blog:build:production",
              "serverTarget": "bird-care-blog:server:production"
            }
          },
          "defaultConfiguration": "development"
        },
        "prerender": {
          "builder": "@angular-devkit/build-angular:prerender",
          "options": {
            "routes": [
              "/"
            ]
          },
          "configurations": {
            "production": {
              "browserTarget": "bird-care-blog:build:production",
              "serverTarget": "bird-care-blog:server:production"
            },
            "development": {
              "browserTarget": "bird-care-blog:build:development",
              "serverTarget": "bird-care-blog:server:development"
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  }
}
```

#### 1.2 Actualizar package.json

Agregar scripts SSR:

```json
{
  "scripts": {
    "dev:ssr": "ng run bird-care-blog:serve-ssr:development",
    "serve:ssr": "node dist/bird-care-blog/server/server.mjs",
    "build:ssr": "ng build && ng run bird-care-blog:server:production",
    "prerender": "ng run bird-care-blog:prerender:production"
  }
}
```

#### 1.3 Instalar dependencias SSR

```bash
npm install @angular/ssr @angular/platform-server express
npm install -D @types/express
```

#### 1.4 Probar SSR

```bash
npm run build:ssr
npm run serve:ssr
# Visitar http://localhost:4000
# Ver código fuente -> debe mostrar HTML completo
```

---

### PASO 2: Crear Admin Panel (6-8 horas)

#### 2.1 Estructura de carpetas

Crear en `src/app/admin/`:

```
admin/
├── components/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.css
│   ├── admin-layout/
│   │   ├── admin-layout.component.ts
│   │   ├── admin-layout.component.html
│   │   └── admin-layout.component.css
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.component.html
│   │   └── dashboard.component.css
│   ├── article-list/
│   │   ├── article-list.component.ts
│   │   ├── article-list.component.html
│   │   └── article-list.component.css
│   └── article-editor/
│       ├── article-editor.component.ts
│       ├── article-editor.component.html
│       └── article-editor.component.css
├── services/
│   ├── admin-auth.service.ts
│   └── admin-api.service.ts
├── guards/
│   └── auth.guard.ts
└── admin.routes.ts
```

#### 2.2 Crear AdminAuthService

`src/app/admin/services/admin-auth.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'admin_token';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.success) {
            localStorage.setItem(this.tokenKey, response.data.token);
            this.userSubject.next(response.data.user);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      // Decodificar JWT y cargar usuario
      // O hacer llamada a /auth/me
      this.http.get(`${this.apiUrl}/me`).subscribe({
        next: (response: any) => {
          this.userSubject.next(response.data);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }
}
```

#### 2.3 Crear Auth Guard

`src/app/admin/guards/auth.guard.ts`:

```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const authGuard = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};
```

#### 2.4 Crear HTTP Interceptor para JWT

`src/app/admin/interceptors/auth.interceptor.ts`:

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AdminAuthService);
  const token = authService.getToken();

  if (token && req.url.includes('/admin')) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
```

Agregar en `app.config.ts`:

```typescript
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './admin/interceptors/auth.interceptor';

providers: [
  provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  // ...
]
```

#### 2.5 Crear Login Component

`src/app/admin/components/login/login.component.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AdminAuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.error = 'Credenciales inválidas';
        this.loading = false;
      }
    });
  }
}
```

#### 2.6 Crear Article Editor con TinyMCE

```bash
npm install @tinymce/tinymce-angular
```

`src/app/admin/components/article-editor/article-editor.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  templateUrl: './article-editor.component.html'
})
export class ArticleEditorComponent implements OnInit {
  article: any = {
    title: '',
    excerpt: '',
    category: '',
    content: '',
    author: '',
    tags: [],
    sources: []
  };

  editorConfig = {
    height: 500,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
      'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
      'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat | help'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminApi: AdminApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(parseInt(id));
    }
  }

  loadArticle(id: number): void {
    this.adminApi.getArticle(id).subscribe(article => {
      this.article = article;
    });
  }

  save(): void {
    if (this.article.id) {
      this.adminApi.updateArticle(this.article.id, this.article).subscribe(() => {
        this.router.navigate(['/admin/articles']);
      });
    } else {
      this.adminApi.createArticle(this.article).subscribe(() => {
        this.router.navigate(['/admin/articles']);
      });
    }
  }
}
```

#### 2.7 Rutas Admin

`src/app/admin/admin.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'articles',
        loadComponent: () => import('./components/article-list/article-list.component').then(m => m.ArticleListComponent)
      },
      {
        path: 'articles/new',
        loadComponent: () => import('./components/article-editor/article-editor.component').then(m => m.ArticleEditorComponent)
      },
      {
        path: 'articles/:id',
        loadComponent: () => import('./components/article-editor/article-editor.component').then(m => m.ArticleEditorComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
```

Agregar en `app.routes.ts`:

```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
}
```

---

### PASO 3: Deployment Configuration (1 hora)

#### 3.1 Crear render.yaml

`render.yaml`:

```yaml
services:
  - type: web
    name: bird-care-blog
    env: node
    region: oregon
    plan: free
    buildCommand: npm install && cd backend && npm install && cd .. && npm run build:prod
    startCommand: npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: bird-care-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: CLOUDINARY_CLOUD_NAME
        sync: false
      - key: CLOUDINARY_API_KEY
        sync: false
      - key: CLOUDINARY_API_SECRET
        sync: false
      - key: ADMIN_EMAIL
        value: admin@entrealas.com
      - key: ADMIN_PASSWORD
        sync: false
    healthCheckPath: /api/health

databases:
  - name: bird-care-db
    databaseName: bird_care
    plan: free
```

#### 3.2 Actualizar package.json (root)

```json
{
  "scripts": {
    "build:prod": "npm run build:ssr && cd backend && npm run build",
    "start:prod": "node dist/bird-care-blog/server/server.mjs"
  }
}
```

#### 3.3 Integrar SSR con Backend API

Modificar `server.ts` para incluir rutas de API:

```typescript
import express from 'express';
// Importar rutas del backend
const apiRouter = require('./backend/src/routes');

export function app(): express.Express {
  const server = express();

  // API routes
  server.use('/api', apiRouter);

  // SSR routes
  // ... resto del código SSR

  return server;
}
```

---

### PASO 4: Deploy to Render (1-2 horas)

#### 4.1 Preparar Repositorio

```bash
git init
git add .
git commit -m "Complete blog implementation with backend and SSR"
git branch -M main
git remote add origin <tu-repo-url>
git push -u origin main
```

#### 4.2 Crear Servicios en Render

1. Ir a https://render.com
2. New → Blueprint
3. Conectar repositorio GitHub
4. Render detecta `render.yaml`
5. Configurar variables de entorno:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `ADMIN_PASSWORD`
6. Aprobar y deploy

#### 4.3 Post-Deploy

```bash
# Conectar a PostgreSQL desde Render shell
npm run migrate
node backend/migrations/004_create_admin_user.js
```

---

### PASO 5: Testing & Polish (2-3 horas)

#### 5.1 Testing Checklist

- [ ] Todos los endpoints API funcionan
- [ ] Login admin funciona
- [ ] Crear/editar/eliminar artículos
- [ ] Upload de imágenes
- [ ] SSR muestra HTML completo
- [ ] Meta tags dinámicos
- [ ] Mobile responsive
- [ ] Performance (Lighthouse > 90)

#### 5.2 SEO Optimization

Agregar meta tags en cada página:

```typescript
import { Meta, Title } from '@angular/platform-browser';

constructor(
  private meta: Meta,
  private title: Title
) {}

ngOnInit() {
  this.title.setTitle('Título del Artículo | Entre Alas');
  this.meta.updateTag({ name: 'description', content: 'Descripción' });
  this.meta.updateTag({ property: 'og:title', content: 'Título' });
  this.meta.updateTag({ property: 'og:image', content: 'URL imagen' });
}
```

---

## 🎯 RESUMEN DE COMANDOS

```bash
# Desarrollo local
npm run dev:backend  # Backend en puerto 3000
ng serve             # Frontend en puerto 4200

# Con SSR
npm run dev:ssr      # SSR dev server en puerto 4000

# Build producción
npm run build:ssr    # Build completo

# Deploy
git push origin main # Auto-deploy en Render
```

---

## 📚 RECURSOS ÚTILES

- **TinyMCE Docs:** https://www.tiny.cloud/docs/angular/
- **Angular SSR:** https://angular.dev/guide/ssr
- **Render Deploy:** https://render.com/docs
- **Cloudinary:** https://cloudinary.com/documentation

---

**Última actualización:** 7 de febrero de 2026
**Tiempo estimado para completar:** 10-12 horas
