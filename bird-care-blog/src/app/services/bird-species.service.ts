import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BirdSpecies } from '../models/bird-species.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BirdSpeciesService {
  private apiUrl = `${environment.apiUrl}/species`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las especies
   */
  getAllSpecies(): Observable<BirdSpecies[]> {
    return this.http.get<ApiResponse<BirdSpecies[]>>(this.apiUrl).pipe(
      map(response => this.normalizeSpecies(response.data)),
      catchError(error => {
        console.error('Error loading species:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtener especie por ID
   */
  getSpeciesById(id: string): Observable<BirdSpecies | undefined> {
    return this.http.get<ApiResponse<BirdSpecies>>(`${this.apiUrl}/${id}`).pipe(
      map(response => this.normalizeSpeciesItem(response.data)),
      catchError(error => {
        console.error('Error loading species:', error);
        return of(undefined);
      })
    );
  }

  /**
   * Obtener especie por nombre
   */
  getSpeciesByName(commonName: string): Observable<BirdSpecies | undefined> {
    return this.getAllSpecies().pipe(
      map(species => species.find(s =>
        s.commonName.toLowerCase() === commonName.toLowerCase()
      ))
    );
  }

  /**
   * Obtener especies destacadas
   */
  getFeaturedSpecies(): Observable<BirdSpecies[]> {
    return this.http.get<ApiResponse<BirdSpecies[]>>(`${this.apiUrl}/featured`).pipe(
      map(response => this.normalizeSpecies(response.data)),
      catchError(error => {
        console.error('Error loading featured species:', error);
        return of([]);
      })
    );
  }

  /**
   * Normalizar especie desde API
   * Convierte snake_case a camelCase para compatibilidad
   */
  private normalizeSpeciesItem(species: any): BirdSpecies {
    return {
      ...species,
      commonName: species.common_name || species.commonName,
      scientificName: species.scientific_name || species.scientificName,
      image: species.image_url || species.image
    };
  }

  /**
   * Normalizar array de especies
   */
  private normalizeSpecies(species: any[]): BirdSpecies[] {
    return species.map(s => this.normalizeSpeciesItem(s));
  }
}
