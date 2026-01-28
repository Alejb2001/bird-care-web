import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface CategoryInfo {
  title: string;
  description: string;
  icon: string;
  color: string;
  articles: { id: number; title: string; excerpt: string; image: string }[];
}

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categorySlug: string = '';

  categoryData: { [key: string]: CategoryInfo } = {
    alimentacion: {
      title: 'Alimentación',
      description: 'Aprende qué alimentos son seguros y nutritivos para tus aves. Encuentra guías sobre dietas balanceadas, suplementos y alimentos prohibidos.',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      color: 'from-green-400 to-green-600',
      articles: [
        {
          id: 1,
          title: '10 Alimentos Esenciales para tu Canario',
          excerpt: 'Descubre los mejores alimentos para mantener a tu canario saludable.',
          image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&q=80'
        }
      ]
    },
    habitat: {
      title: 'Hábitat',
      description: 'Crea el ambiente perfecto para que tu ave se sienta como en casa. Guías sobre jaulas, perchas, juguetes y la ubicación ideal.',
      icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      color: 'from-yellow-400 to-yellow-600',
      articles: [
        {
          id: 2,
          title: 'Cómo Crear el Hábitat Perfecto para Periquitos',
          excerpt: 'Guía completa para diseñar un espacio seguro y estimulante.',
          image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=500&q=80'
        }
      ]
    },
    salud: {
      title: 'Salud',
      description: 'Mantén a tu ave sana con cuidados preventivos y atención veterinaria. Aprende a identificar síntomas y cuándo visitar al veterinario.',
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14z',
      color: 'from-blue-400 to-blue-600',
      articles: [
        {
          id: 3,
          title: 'Señales de Enfermedad en Aves: Qué Observar',
          excerpt: 'Aprende a identificar los primeros síntomas de enfermedad.',
          image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80'
        }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.categorySlug = params['slug'] || 'alimentacion';
    });
  }

  get currentCategory(): CategoryInfo {
    return this.categoryData[this.categorySlug] || this.categoryData['alimentacion'];
  }
}
