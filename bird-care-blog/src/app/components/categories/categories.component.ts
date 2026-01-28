import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Category {
  title: string;
  description: string;
  icon: string;
  color: string;
  link?: string;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      title: 'Alimentación',
      description: 'Aprende qué alimentos son seguros y nutritivos para tus aves',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      color: 'from-green-400 to-green-600',
      link: '/categoria/alimentacion'
    },
    {
      title: 'Hábitat',
      description: 'Crea el ambiente perfecto para que tu ave se sienta como en casa',
      icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      color: 'from-yellow-400 to-yellow-600',
      link: '/categoria/habitat'
    },
    {
      title: 'Salud',
      description: 'Mantén a tu ave sana con cuidados preventivos y atención veterinaria',
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14z',
      color: 'from-blue-400 to-blue-600',
      link: '/categoria/salud'
    },
    {
      title: 'Especies',
      description: 'Descubre las características únicas de diferentes especies de aves',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      color: 'from-purple-400 to-purple-600',
      link: '/especies'
    }
  ];
}
