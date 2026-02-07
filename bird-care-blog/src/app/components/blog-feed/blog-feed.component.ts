import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticlesService, Article } from '../../services/articles.service';

@Component({
  selector: 'app-blog-feed',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-feed.component.html',
  styleUrl: './blog-feed.component.css'
})
export class BlogFeedComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.getFeaturedArticles(6).subscribe(articles => {
      this.articles = articles;
    });
  }
}
