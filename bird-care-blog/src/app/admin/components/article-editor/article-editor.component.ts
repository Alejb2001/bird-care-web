import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { AdminApiService, Article } from '../../services/admin-api.service';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorComponent],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode = false;
  articleId: number | null = null;
  loading = false;
  saving = false;
  uploadingImage = false;
  imagePreview: string | null = null;

  categories = [
    'Cuidados Generales',
    'Alimentación',
    'Salud',
    'Comportamiento',
    'Reproducción',
    'Especies',
    'Consejos',
    'Noticias'
  ];

  // TinyMCE Configuration
  tinymceInit: any = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 500,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image media | ' +
      'forecolor backcolor | removeformat | code fullscreen | help',
    toolbar_mode: 'sliding',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 16px; line-height: 1.6; }',
    branding: false,
    promotion: false
  };

  constructor(
    private fb: FormBuilder,
    private apiService: AdminApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      excerpt: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      author: ['Admin'],
      published: [false],
      image_url: [''],
      tags: this.fb.array([]),
      sources: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.articleId = parseInt(id);
      this.loadArticle(this.articleId);
    }
  }

  loadArticle(id: number): void {
    this.loading = true;
    this.apiService.getArticleById(id).subscribe({
      next: (response) => {
        if (response.success) {
          const article = response.data;
          this.articleForm.patchValue({
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            author: article.author || 'Admin',
            published: article.published,
            image_url: article.image_url
          });

          this.imagePreview = article.image_url || null;

          // Load tags
          if (article.tags && article.tags.length > 0) {
            article.tags.forEach(tag => this.addTag(tag));
          }

          // Load sources
          if (article.sources && article.sources.length > 0) {
            article.sources.forEach(source => this.addSource(source.name, source.url));
          }
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading article:', err);
        alert('Error al cargar el artículo');
        this.router.navigate(['/admin/articles']);
        this.loading = false;
      }
    });
  }

  // Tags management
  get tags(): FormArray {
    return this.articleForm.get('tags') as FormArray;
  }

  addTag(value: string = ''): void {
    this.tags.push(this.fb.control(value, Validators.required));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  // Sources management
  get sources(): FormArray {
    return this.articleForm.get('sources') as FormArray;
  }

  addSource(name: string = '', url: string = ''): void {
    this.sources.push(this.fb.group({
      name: [name, Validators.required],
      url: [url]
    }));
  }

  removeSource(index: number): void {
    this.sources.removeAt(index);
  }

  // Image upload
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar 5MB');
        return;
      }

      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    this.uploadingImage = true;
    this.apiService.uploadImage(file).subscribe({
      next: (response) => {
        if (response.success) {
          this.articleForm.patchValue({
            image_url: response.data.url
          });
          this.imagePreview = response.data.url;
        }
        this.uploadingImage = false;
      },
      error: (err) => {
        console.error('Error uploading image:', err);
        alert('Error al subir la imagen');
        this.uploadingImage = false;
      }
    });
  }

  removeImage(): void {
    this.articleForm.patchValue({ image_url: '' });
    this.imagePreview = null;
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      Object.keys(this.articleForm.controls).forEach(key => {
        this.articleForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.saving = true;
    const formData = this.articleForm.value;

    // Format data
    const articleData: Article = {
      ...formData,
      date: new Date().toISOString()
    };

    const request$ = this.isEditMode && this.articleId
      ? this.apiService.updateArticle(this.articleId, articleData)
      : this.apiService.createArticle(articleData);

    request$.subscribe({
      next: (response) => {
        if (response.success) {
          alert(this.isEditMode ? 'Artículo actualizado' : 'Artículo creado');
          this.router.navigate(['/admin/articles']);
        }
        this.saving = false;
      },
      error: (err) => {
        console.error('Error saving article:', err);
        alert('Error al guardar el artículo');
        this.saving = false;
      }
    });
  }

  cancel(): void {
    if (confirm('¿Descartar los cambios?')) {
      this.router.navigate(['/admin/articles']);
    }
  }
}
