import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

@Component({
  selector: 'app-blog-feed',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-feed.component.html',
  styleUrl: './blog-feed.component.css'
})
export class BlogFeedComponent {
  articles: Article[] = [
    {
      id: 1,
      title: '10 Alimentos Esenciales para tu Canario',
      excerpt: 'Descubre los mejores alimentos para mantener a tu canario saludable y con un plumaje brillante. Incluye frutas, verduras y semillas recomendadas.',
      category: 'Alimentación',
      date: '2026-01-20',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&q=80'
    },
    {
      id: 2,
      title: 'Cómo Crear el Hábitat Perfecto para Periquitos',
      excerpt: 'Guía completa para diseñar una jaula cómoda y segura. Aprende sobre el tamaño ideal, accesorios necesarios y ubicación óptima.',
      category: 'Hábitat',
      date: '2026-01-18',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=500&q=80'
    },
    {
      id: 3,
      title: 'Señales de Enfermedad en Aves: Qué Observar',
      excerpt: 'Aprende a identificar los primeros síntomas de enfermedad en tus aves para actuar rápidamente. Prevención y cuidados básicos.',
      category: 'Salud',
      date: '2026-01-15',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80'
    },
    {
      id: 4,
      title: 'Agapornis: El Poder del Vínculo de Pareja',
      excerpt: 'Todo sobre los inseparables: por qué necesitan compañía constante, cómo criar una pareja feliz y qué hacer si tienes uno solo.',
      category: 'Especies',
      date: '2026-01-22',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=500&q=80'
    },
    {
      id: 5,
      title: 'Entrenando a tu Ninfa: Trucos y Silbidos',
      excerpt: 'Las ninfas son aves inteligentes. Aprende técnicas de entrenamiento con refuerzo positivo y cómo enseñarles melodías.',
      category: 'Comportamiento',
      date: '2026-01-24',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1597318001819-c365bdfa6e91?w=500&q=80'
    },
    {
      id: 6,
      title: 'Periquitos: ¿Pueden Aprender a Hablar?',
      excerpt: 'Descubre el potencial vocal de los periquitos australianos. Técnicas efectivas para enseñarles palabras y sonidos.',
      category: 'Especies',
      date: '2026-01-26',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&q=80'
    }
  ];
}
