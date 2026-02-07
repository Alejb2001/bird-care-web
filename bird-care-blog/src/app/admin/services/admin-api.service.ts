import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface Article {
  id?: number;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time?: string;
  image_url?: string;
  image_public_id?: string;
  author?: string;
  published: boolean;
  tags?: string[];
  sources?: { name: string; url?: string }[];
}

export interface BirdSpecies {
  id: string;
  common_name: string;
  scientific_name: string;
  description: string;
  image_url?: string;
  published: boolean;
  characteristics?: any;
  care?: any;
  health?: any;
}

export interface Stats {
  articles: {
    total: number;
    published: number;
  };
  species: {
    total: number;
    published: number;
  };
  totalViews: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // ==================== STATS ====================
  getStats(): Observable<ApiResponse<Stats>> {
    return this.http.get<ApiResponse<Stats>>(`${this.apiUrl}/stats`);
  }

  // ==================== ARTICLES ====================
  getAllArticles(): Observable<ApiResponse<Article[]>> {
    return this.http.get<ApiResponse<Article[]>>(`${this.apiUrl}/articles`);
  }

  getArticleById(id: number): Observable<ApiResponse<Article>> {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/articles/${id}`);
  }

  createArticle(article: Article): Observable<ApiResponse<Article>> {
    return this.http.post<ApiResponse<Article>>(`${this.apiUrl}/articles`, article);
  }

  updateArticle(id: number, article: Partial<Article>): Observable<ApiResponse<Article>> {
    return this.http.put<ApiResponse<Article>>(`${this.apiUrl}/articles/${id}`, article);
  }

  deleteArticle(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/articles/${id}`);
  }

  toggleArticlePublish(id: number, published: boolean): Observable<ApiResponse<Article>> {
    return this.http.patch<ApiResponse<Article>>(`${this.apiUrl}/articles/${id}/publish`, {
      published
    });
  }

  // ==================== SPECIES ====================
  getAllSpecies(): Observable<ApiResponse<BirdSpecies[]>> {
    return this.http.get<ApiResponse<BirdSpecies[]>>(`${this.apiUrl}/species`);
  }

  getSpeciesById(id: string): Observable<ApiResponse<BirdSpecies>> {
    return this.http.get<ApiResponse<BirdSpecies>>(`${this.apiUrl}/species/${id}`);
  }

  createSpecies(species: BirdSpecies): Observable<ApiResponse<BirdSpecies>> {
    return this.http.post<ApiResponse<BirdSpecies>>(`${this.apiUrl}/species`, species);
  }

  updateSpecies(id: string, species: Partial<BirdSpecies>): Observable<ApiResponse<BirdSpecies>> {
    return this.http.put<ApiResponse<BirdSpecies>>(`${this.apiUrl}/species/${id}`, species);
  }

  deleteSpecies(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/species/${id}`);
  }

  // ==================== UPLOAD ====================
  uploadImage(file: File): Observable<ApiResponse<{ url: string; publicId: string }>> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ApiResponse<{ url: string; publicId: string }>>(
      `${this.apiUrl}/upload`,
      formData
    );
  }

  deleteImage(publicId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/upload/${publicId}`);
  }
}
