import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService, BirdSpecies } from '../../services/admin-api.service';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Especies</h2>
          <p class="mt-1 text-sm text-gray-600">Gestiona todas las especies de aves</p>
        </div>
        <a
          routerLink="/admin/species/new"
          class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Nueva Especie
        </a>
      </div>

      <div *ngIf="loading" class="flex justify-center items-center py-12">
        <svg class="animate-spin h-12 w-12 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div *ngIf="!loading && species.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
        <p class="text-gray-500 mb-6">No hay especies registradas</p>
        <a
          routerLink="/admin/species/new"
          class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Crear Primera Especie
        </a>
      </div>

      <div *ngIf="!loading && species.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let item of species" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img *ngIf="item.image_url" [src]="item.image_url" [alt]="item.common_name" class="w-full h-48 object-cover"/>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ item.common_name }}</h3>
            <p class="text-sm text-gray-500 italic">{{ item.scientific_name }}</p>
            <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ item.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span
                [class.bg-green-100]="item.published"
                [class.text-green-800]="item.published"
                [class.bg-gray-100]="!item.published"
                [class.text-gray-800]="!item.published"
                class="px-2 py-1 text-xs rounded-full"
              >
                {{ item.published ? 'Publicado' : 'Borrador' }}
              </span>
              <div class="flex space-x-2">
                <a [routerLink]="['/admin/species', item.id, 'edit']" class="text-purple-600 hover:text-purple-900">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </a>
                <button (click)="deleteSpecies(item)" class="text-red-600 hover:text-red-900">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  `]
})
export class SpeciesListComponent implements OnInit {
  species: BirdSpecies[] = [];
  loading = true;

  constructor(private apiService: AdminApiService) {}

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.loading = true;
    this.apiService.getAllSpecies().subscribe({
      next: (response) => {
        if (response.success) {
          this.species = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading species:', err);
        this.loading = false;
      }
    });
  }

  deleteSpecies(species: BirdSpecies): void {
    if (confirm(`¿Eliminar "${species.common_name}"?`)) {
      this.apiService.deleteSpecies(species.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.species = this.species.filter(s => s.id !== species.id);
          }
        },
        error: (err) => {
          console.error('Error deleting species:', err);
          alert('Error al eliminar la especie');
        }
      });
    }
  }
}
