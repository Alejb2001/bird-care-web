import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ArticlesService, Article } from '../../services/articles.service';

@Component({
  selector: 'app-all-articles',
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent implements OnInit {
  allArticles: Article[] = [];
  filteredArticles: Article[] = [];
  categories: string[] = [];
  selectedCategory: string = 'Todas';
  searchQuery: string = '';

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.getAllArticles().subscribe(articles => {
      this.allArticles = articles;
      this.filteredArticles = [...articles];

      // Extraer categorias unicas
      const uniqueCategories = new Set(articles.map(a => a.category));
      this.categories = ['Todas', ...Array.from(uniqueCategories)];
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let results = [...this.allArticles];

    // Filtrar por categoria
    if (this.selectedCategory !== 'Todas') {
      results = results.filter(a => a.category === this.selectedCategory);
    }

    // Filtrar por busqueda
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some(tag => tag.includes(query))
      );
    }

    this.filteredArticles = results;
  }
}
