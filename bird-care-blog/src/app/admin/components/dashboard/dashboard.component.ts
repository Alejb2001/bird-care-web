import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService, Stats } from '../../services/admin-api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: Stats = {
    articles: { total: 0, published: 0 },
    species: { total: 0, published: 0 },
    totalViews: 0
  };
  loading = true;

  constructor(private apiService: AdminApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.apiService.getStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.loading = false;
      }
    });
  }
}
