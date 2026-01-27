import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  articleId: string | null = null;

  // Datos de ejemplo del artículo
  article = {
    title: '10 Alimentos Esenciales para tu Canario',
    category: 'Alimentación',
    date: '2026-01-20',
    readTime: '5 min',
    author: 'Dr. María González',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80',
    content: `
      <h2>Introducción</h2>
      <p>La alimentación es uno de los aspectos más importantes en el cuidado de los canarios. Una dieta balanceada no solo mantiene a tu ave saludable, sino que también influye en el brillo de su plumaje y su capacidad de canto.</p>

      <h2>1. Semillas de Alpiste</h2>
      <p>El alpiste es la base de la alimentación de los canarios. Rico en carbohidratos y proteínas, debe constituir aproximadamente el 50% de su dieta diaria. Asegúrate de ofrecer semillas frescas y de buena calidad.</p>

      <h2>2. Verduras Frescas</h2>
      <p>Las verduras de hoja verde como la lechuga romana, espinaca y col rizada son excelentes fuentes de vitaminas. Lávalas bien antes de ofrecerlas y retira los restos después de unas horas para evitar que se descompongan.</p>

      <h2>3. Frutas</h2>
      <p>Manzanas, peras y melón son frutas seguras para los canarios. Córtalas en trozos pequeños y ofrécelas con moderación debido a su contenido de azúcar natural.</p>

      <h2>4. Huevo Cocido</h2>
      <p>El huevo cocido es una excelente fuente de proteínas, especialmente importante durante la época de cría. Ofrécelo 2-3 veces por semana en pequeñas porciones.</p>

      <h2>5. Agua Fresca</h2>
      <p>Aunque no es un alimento, el agua limpia y fresca es esencial. Cámbiala diariamente y asegúrate de que el recipiente esté limpio.</p>

      <h2>Conclusión</h2>
      <p>Una dieta variada y equilibrada es clave para mantener a tu canario saludable y feliz. Recuerda introducir nuevos alimentos gradualmente y observar la reacción de tu ave.</p>
    `
  };

  relatedArticles = [
    {
      id: 2,
      title: 'Cómo Crear el Hábitat Perfecto para Periquitos',
      category: 'Hábitat',
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400&q=80'
    },
    {
      id: 3,
      title: 'Señales de Enfermedad en Aves: Qué Observar',
      category: 'Salud',
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
    // En una aplicación real, aquí cargarías el artículo desde un servicio usando el ID
  }
}
