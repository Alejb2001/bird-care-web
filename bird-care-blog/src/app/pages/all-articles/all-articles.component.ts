import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-all-articles',
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent {
  articles = [
    {
      id: 1,
      title: '10 Alimentos Esenciales para tu Canario',
      excerpt: 'Descubre los mejores alimentos para mantener a tu canario saludable y con un plumaje brillante.',
      category: 'Alimentación',
      date: '20 Enero 2026',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80'
    },
    {
      id: 2,
      title: 'Cómo Crear el Hábitat Perfecto para Periquitos',
      excerpt: 'Guía completa para diseñar un espacio seguro y estimulante para tus periquitos.',
      category: 'Hábitat',
      date: '18 Enero 2026',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=800&q=80'
    },
    {
      id: 3,
      title: 'Señales de Enfermedad en Aves: Qué Observar',
      excerpt: 'Aprende a identificar los síntomas tempranos de enfermedad en tus aves mascota.',
      category: 'Salud',
      date: '15 Enero 2026',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80'
    },
    {
      id: 4,
      title: 'Entrenamiento Básico para Loros',
      excerpt: 'Técnicas efectivas para enseñar trucos y mejorar la comunicación con tu loro.',
      category: 'Entrenamiento',
      date: '12 Enero 2026',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1544923246-77307dd628b4?w=800&q=80'
    },
    {
      id: 5,
      title: 'La Importancia del Baño para las Aves',
      excerpt: 'Por qué el baño regular es esencial para la salud y bienestar de tus aves.',
      category: 'Cuidados',
      date: '10 Enero 2026',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&q=80'
    },
    {
      id: 6,
      title: 'Plantas Seguras e Inseguras para Aves',
      excerpt: 'Conoce qué plantas puedes tener en casa y cuáles evitar si tienes aves.',
      category: 'Seguridad',
      date: '8 Enero 2026',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=80'
    }
  ];

  categories = ['Todos', 'Alimentación', 'Hábitat', 'Salud', 'Entrenamiento', 'Cuidados', 'Seguridad'];
  selectedCategory = 'Todos';

  get filteredArticles() {
    if (this.selectedCategory === 'Todos') {
      return this.articles;
    }
    return this.articles.filter(article => article.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}