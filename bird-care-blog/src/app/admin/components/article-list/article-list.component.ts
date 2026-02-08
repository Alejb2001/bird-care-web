import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService, Article } from '../../services/admin-api.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  loading = true;
  deletingId: number | null = null;

  constructor(private apiService: AdminApiService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.apiService.getAllArticles().subscribe({
      next: (response) => {
        if (response.success) {
          this.articles = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.loading = false;
      }
    });
  }

  togglePublish(article: Article): void {
    if (!article.id) return;

    const newStatus = !article.published;
    this.apiService.toggleArticlePublish(article.id, newStatus).subscribe({
      next: (response) => {
        if (response.success) {
          article.published = newStatus;
        }
      },
      error: (err) => {
        console.error('Error toggling publish:', err);
        alert('Error al cambiar el estado de publicación');
      }
    });
  }

  deleteArticle(article: Article): void {
    if (!article.id) return;

    const confirmed = confirm(
      `¿Estás seguro de eliminar el artículo "${article.title}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    this.deletingId = article.id;
    this.apiService.deleteArticle(article.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.articles = this.articles.filter(a => a.id !== article.id);
        }
        this.deletingId = null;
      },
      error: (err) => {
        console.error('Error deleting article:', err);
        alert('Error al eliminar el artículo');
        this.deletingId = null;
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  get publishedCount(): number {
    return this.articles.filter(a => a.published).length;
  }

  get draftCount(): number {
    return this.articles.filter(a => !a.published).length;
  }
}
