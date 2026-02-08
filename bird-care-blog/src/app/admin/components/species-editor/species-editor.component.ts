import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminApiService, BirdSpecies } from '../../services/admin-api.service';

@Component({
  selector: 'app-species-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">
          {{ isEditMode ? 'Editar Especie' : 'Nueva Especie' }}
        </h2>
      </div>

      <form [formGroup]="speciesForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Común *</label>
            <input
              type="text"
              formControlName="common_name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Ej: Canario"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Científico *</label>
            <input
              type="text"
              formControlName="scientific_name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Ej: Serinus canaria"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
            <textarea
              formControlName="description"
              rows="8"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Descripción detallada de la especie"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
            <input
              type="url"
              formControlName="image_url"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://..."
            />
          </div>

          <div class="flex items-center">
            <input
              id="published"
              type="checkbox"
              formControlName="published"
              class="h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
            <label for="published" class="ml-2 text-sm text-gray-700">Publicar especie</label>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            (click)="cancel()"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            [disabled]="speciesForm.invalid || saving"
            class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {{ saving ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear') }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class SpeciesEditorComponent implements OnInit {
  speciesForm: FormGroup;
  isEditMode = false;
  speciesId: string | null = null;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private apiService: AdminApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.speciesForm = this.fb.group({
      common_name: ['', Validators.required],
      scientific_name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      image_url: [''],
      published: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.speciesId = id;
      this.loadSpecies(id);
    }
  }

  loadSpecies(id: string): void {
    this.apiService.getSpeciesById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.speciesForm.patchValue(response.data);
        }
      },
      error: (err) => {
        console.error('Error loading species:', err);
        this.router.navigate(['/admin/species']);
      }
    });
  }

  onSubmit(): void {
    if (this.speciesForm.invalid) return;

    this.saving = true;
    const data = this.speciesForm.value;

    const request$ = this.isEditMode && this.speciesId
      ? this.apiService.updateSpecies(this.speciesId, data)
      : this.apiService.createSpecies(data);

    request$.subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/admin/species']);
        }
        this.saving = false;
      },
      error: (err) => {
        console.error('Error saving species:', err);
        alert('Error al guardar la especie');
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/species']);
  }
}
