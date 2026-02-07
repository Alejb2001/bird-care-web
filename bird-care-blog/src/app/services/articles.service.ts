import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageUrl?: string; // Para compatibilidad con API
  author: string;
  content: string;
  sources: { name: string; url?: string }[];
  tags: string[];
  slug?: string;
  published?: boolean;
  views?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los artículos
   */
  getAllArticles(): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(this.apiUrl).pipe(
      map(response => this.normalizeArticles(response.data)),
      catchError(error => {
        console.error('Error loading articles:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtener artículo por ID
   */
  getArticleById(id: number): Observable<Article | undefined> {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/${id}`).pipe(
      map(response => this.normalizeArticle(response.data)),
      catchError(error => {
        console.error('Error loading article:', error);
        return of(undefined);
      })
    );
  }

  /**
   * Obtener artículos por categoría
   */
  getArticlesByCategory(category: string): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(`${this.apiUrl}/category/${category}`).pipe(
      map(response => this.normalizeArticles(response.data)),
      catchError(error => {
        console.error('Error loading articles by category:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtener artículos destacados
   */
  getFeaturedArticles(count: number = 6): Observable<Article[]> {
    return this.getAllArticles().pipe(
      map(articles => articles.slice(0, count))
    );
  }

  /**
   * Obtener artículos relacionados
   */
  getRelatedArticles(currentId: number, count: number = 2): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(`${this.apiUrl}/${currentId}/related?limit=${count}`).pipe(
      map(response => this.normalizeArticles(response.data)),
      catchError(error => {
        console.error('Error loading related articles:', error);
        return of([]);
      })
    );
  }

  /**
   * Buscar artículos
   */
  searchArticles(query: string): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      map(response => this.normalizeArticles(response.data)),
      catchError(error => {
        console.error('Error searching articles:', error);
        return of([]);
      })
    );
  }

  /**
   * Normalizar artículo desde API
   * Convierte image_url a image para compatibilidad con componentes existentes
   */
  private normalizeArticle(article: any): Article {
    return {
      ...article,
      image: article.image_url || article.image,
      readTime: article.read_time || article.readTime
    };
  }

  /**
   * Normalizar array de artículos
   */
  private normalizeArticles(articles: any[]): Article[] {
    return articles.map(article => this.normalizeArticle(article));
  }
}
