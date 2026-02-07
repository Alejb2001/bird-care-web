import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ArticlesService, Article } from '../../services/articles.service';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  articleId: number = 1;
  private isBrowser: boolean;

  article: Article | null = null;
  relatedArticles: { id: number; title: string; category: string; image: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.articleId = idParam ? parseInt(idParam, 10) : 1;

    this.articlesService.getArticleById(this.articleId).subscribe(article => {
      this.article = article || null;
    });

    this.articlesService.getRelatedArticles(this.articleId, 2).subscribe(related => {
      this.relatedArticles = related.map(a => ({
      id: a.id,
      title: a.title,
      category: a.category,
      image: a.image
      }));
    });
  }

  shareOnFacebook() {
    if (!this.isBrowser || !this.article) return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  }

  shareOnTwitter() {
    if (!this.isBrowser || !this.article) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.article.title + ' - Entre Alas');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  }

  shareOnWhatsApp() {
    if (!this.isBrowser || !this.article) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.article.title + ' - Lee mas en: ');
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
  }
}
