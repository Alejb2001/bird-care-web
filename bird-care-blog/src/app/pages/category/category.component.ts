import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ArticlesService, Article } from '../../services/articles.service';

interface CategoryInfo {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tips: string[];
}

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categorySlug: string = '';
  articles: Article[] = [];

  categoryData: { [key: string]: CategoryInfo } = {
    alimentacion: {
      slug: 'alimentacion',
      title: 'Alimentacion',
      description: 'La nutricion adecuada es fundamental para la salud y bienestar de tus aves. Una dieta balanceada influye en su energia, plumaje, canto y longevidad. Aqui encontraras guias completas sobre que alimentar a cada especie, basadas en recomendaciones de veterinarios aviares.',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      color: 'from-green-400 to-green-600',
      tips: [
        'La base de la dieta debe ser semillas de calidad o pellets formulados segun la especie',
        'Las verduras frescas aportan vitaminas esenciales - ofrecer diariamente',
        'Las frutas son excelentes pero con moderacion por su contenido de azucar',
        'El agua limpia y fresca debe estar disponible siempre y cambiarse diariamente',
        'Nunca alimentes con: aguacate, chocolate, cebolla, ajo, sal excesiva, cafeina o alcohol'
      ]
    },
    habitat: {
      slug: 'habitat',
      title: 'Habitat',
      description: 'El entorno donde vive tu ave afecta directamente su bienestar fisico y emocional. Un habitat adecuado previene problemas de comportamiento y promueve una vida larga y saludable. Aprende sobre jaulas, ubicacion, temperatura, iluminacion y enriquecimiento ambiental.',
      icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      color: 'from-yellow-400 to-yellow-600',
      tips: [
        'La jaula debe ser lo mas grande posible - las aves necesitan espacio para volar',
        'Ubicacion ideal: area con actividad familiar, sin corrientes de aire ni sol directo',
        'Proporciona perchas de diferentes diametros y materiales para salud de las patas',
        'El enriquecimiento ambiental (juguetes, forrajeo) previene aburrimiento',
        'Mantener 10-12 horas de oscuridad para un descanso adecuado'
      ]
    },
    salud: {
      slug: 'salud',
      title: 'Salud',
      description: 'Las aves ocultan instintivamente los signos de enfermedad, por lo que la prevencion y deteccion temprana son cruciales. La observacion diaria y los chequeos veterinarios regulares pueden salvar la vida de tu ave. Encuentra informacion sobre sintomas, prevencion y primeros auxilios.',
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14z',
      color: 'from-blue-400 to-blue-600',
      tips: [
        'Observa diariamente el comportamiento, apetito y heces de tu ave',
        'Los cambios sutiles pueden indicar enfermedad - actua rapidamente',
        'Chequeos veterinarios anuales incluso si el ave parece sana',
        'Cuarentena de 30-45 dias para aves nuevas antes de introducirlas',
        'Ten siempre a mano el numero de un veterinario aviar de emergencia'
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categorySlug = params['slug'] || 'alimentacion';
      this.loadArticles();
    });
  }

  private loadArticles(): void {
    const categoryMap: { [key: string]: string } = {
      'alimentacion': 'Alimentacion',
      'habitat': 'Habitat',
      'salud': 'Salud'
    };
    const categoryName = categoryMap[this.categorySlug];
    if (categoryName) {
      this.articlesService.getArticlesByCategory(categoryName).subscribe(articles => {
        this.articles = articles;
      });
    }
  }

  get currentCategory(): CategoryInfo {
    return this.categoryData[this.categorySlug] || this.categoryData['alimentacion'];
  }
}
